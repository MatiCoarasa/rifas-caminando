import { NextResponse } from "next/server";
import crypto from 'crypto';
import path from 'path';
import {MercadoPagoConfig, Payment} from 'mercadopago'
import mongoRepository from "../../../lib/repositories/persistence/mongo.repository";
import {sendEmail} from "../../../lib/services/mailService";

// hook payload example
// {
//   "action": "payment.updated",
//   "api_version": "v1",
//   "data": {
//     "id": "123456"
//   },
//   "date_created": "2021-11-01T02:02:02Z",
//   "id": "123456",
//   "live_mode": false,
//   "type": "payment",
//   "user_id": 461898669
// }

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});
const paymentClient = new Payment(mpClient);

function validateSignature(request: Request) {
  const xSignature = request.headers.get('x-signature');
  const xRequestId = request.headers.get('x-request-id');

  if (!xSignature || !xRequestId) {
    console.log("Missing x-signature or x-request-id");
    return new NextResponse(null, { status: 400 });
  }

// Obtain Query params related to the request URL
  const url = new URL(request.url); // Create a URL object from the request URL
  const queryParams = new URLSearchParams(url.search); // Access query params
  const dataID = queryParams.get('data.id');

// Separating the x-signature into parts
  const parts = xSignature.split(',');

// Initializing variables to store ts and hash
  let ts: string = '';
  let hash: string = '';

// Iterate over the values to obtain ts and v1
  parts.forEach(part => {
    // Split each part into key and value
    const [key, value] = part.split('=');
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === 'ts') {
        ts = trimmedValue;
      } else if (trimmedKey === 'v1') {
        hash = trimmedValue;
      }
    }
  });

// Obtain the secret key for the user/application from Mercadopago developers site
  const secret = process.env.HOOKS_SECRET!;

// Generate the manifest string
  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

// Create an HMAC signature
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(manifest);

// Obtain the hash result as a hexadecimal string
  const sha = hmac.digest('hex');

  if (sha !== hash) {
    return new NextResponse(null, { status: 400 });
  }
}

export async function POST(request: Request) {
  const validationInvalidResponse = validateSignature(request);
  if(validationInvalidResponse) {
    return validationInvalidResponse;
  }

  if(!request.body) {
    return new NextResponse(null, { status: 400 });
  }

  const { data, action } = await request.json();
  if (action !== 'payment.created') {
    return new NextResponse(null, { status: 201 });
  }

  const { id } = data;

  const { status, external_reference: purchaseId } = await paymentClient.get({ id });
  if (status !== 'approved') {


    return new NextResponse(null, { status: 201 });
  }

  const rifas = await mongoRepository.setRifasAsPaid(purchaseId!);
  console.log(rifas);

  const rifasPlural = rifas.length > 1;
  const fechaSorteo = (process.env.NEXT_PUBLIC_FECHA_SORTEO ?? '').toLowerCase();
  const text = `¡Hola! Gracias por tu compra ❤️\n\n${rifasPlural ? `Tus números son: ` : `Tu número es: `}${rifas.map(rifa => rifa.numero).join(' - ')}\n\nSorteamos el ${fechaSorteo} a través de nuestro Instagram (https://www.instagram.com/caminando.juntosok/).\nMuchos éxitos ✨`;
  const html = `<p><strong>¡Hola! Gracias por tu compra ❤️</strong></p><p>${rifasPlural ? `Tus números son: ` : `Tu número es: `}${rifas.map(rifa => rifa.numero).join(' - ')}</p><p>Sorteamos el ${fechaSorteo} a través de nuestro <a href="https://www.instagram.com/caminando.juntosok/">Instagram</a>.<br/>Muchos éxitos ✨</p><div style="text-align:left;"><img src="cid:agradecimiento" alt="¡Gracias por tu compra!" width="540" style="width:540px;height:auto;" /></div>`;
  await sendEmail(
    rifas[0].compradorEmail,
    "Rifas Caminando Juntos 2026 - Tu compra",
    text,
    html,
    [{
      filename: 'agradecimiento.png',
      path: path.join(process.cwd(), 'public', 'agradecimiento.png'),
      cid: 'agradecimiento',
    }],
  );

  return new NextResponse(null, { status: 200 });
}
