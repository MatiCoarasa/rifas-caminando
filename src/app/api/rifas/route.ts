import {NextResponse} from "next/server";
import {MercadoPagoConfig, Preference} from "mercadopago";

import mongoRepository from "../../../lib/repositories/persistence/mongo.repository";
import {CompraRifa} from "../../../lib/models/compra-rifa.model";

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});
const preferenceClient = new Preference(mpClient);

export async function GET(request: Request) {
  return new NextResponse(request.url, {status: 405});
}


export async function POST(request: Request) {
  try {
    const {nombre, email, cantRifas} = await request.json();

    console.log(nombre, email, cantRifas);
    if (!nombre || !email || !cantRifas) {
      return new NextResponse(null, {status: 400});
    }

    const date = new Date();
    const timestamp = date.getTime().toString();
    const compraRifas: CompraRifa[] = [];
    for (let i = 0; i < cantRifas; i++) {
      compraRifas.push(new CompraRifa(date, nombre, email, timestamp));
    }

    let appUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
    if (!appUrl.startsWith("https://")) appUrl = `https://${appUrl}`;

    const preference = await preferenceClient.create({
      body: {
        external_reference: timestamp,
        items: [
          {
            title: `${cantRifas === 1 ? "Rifa" : "Rifas"} Caminando Juntos 2024`,
            unit_price: Number(process.env.NEXT_PUBLIC_PRECIO_RIFA),
            quantity: cantRifas,
            id: "rifas-24",
          }
        ],
        back_urls: {
          "success": `${appUrl}/result?status=success`,
          "failure": `${appUrl}/result?status=failure`,
        },
        payment_methods: {
          excluded_payment_types: [
            {id: 'credit_card'},
            {id: 'ticket'},
            {id: 'bank_transfer'},
            {id: 'atm'},
          ],
          installments: 1  // Permitir solo pagos en una cuota
        },
        auto_return: "approved",
        binary_mode: true,
      }
    });

    await mongoRepository.addRifas(compraRifas);

    return new NextResponse(JSON.stringify({url: preference.init_point!}));
  } catch (err) {
    console.error(err);
    return new NextResponse(null, {status: 500});
  }
}
