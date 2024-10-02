import { CompraRifa } from "../models/compra-rifa.model";

export async function comprar(nombre: string, email: string, cantRifas: number) {
  const fechaCompra = new Date();
  const rifas = Array.from(
    { length: cantRifas },
    () => new CompraRifa(fechaCompra, nombre, email)
  );

  const response = await fetch('/api/rifas', {
    method: 'POST',
    body: JSON.stringify({ rifas }),
  });

  const { url } = await response.json();
  return url;
}

