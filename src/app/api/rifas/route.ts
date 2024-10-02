import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

import mongoRepository from "../../../lib/repositories/persistence/mongo.repository";
import { CompraRifa } from "../../../lib/models/compra-rifa.model";

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});
const preferenceClient = new Preference(mpClient);


// todo: guardar intento de compra de rifas en la base de datos y redirigir a MP
export async function POST(request: Request) {
  const { rifas } = await request.json();

  const rifasObj = CompraRifa.fromList(rifas);
  for (const rifa of rifasObj) {
    await mongoRepository.addRifa(rifa);
  }

  const preference = await preferenceClient.create({
    body: {
      items: [
        {
          title: `${rifasObj.length === 1 ? "Rifa" : "Rifas"} Caminando Juntos 2024`,
          unit_price: Number(process.env.NEXT_PUBLIC_PRECIO_RIFA),
          quantity: rifasObj.length,
          id: "abc",
        }
      ],
      back_urls: {
        "success": `${process.env.APP_URL}/success`,
        "failure": `${process.env.APP_URL}/failure`,
      },
      auto_return: "approved",
    }});

  return new NextResponse(JSON.stringify({ url: preference.init_point! }));
}
