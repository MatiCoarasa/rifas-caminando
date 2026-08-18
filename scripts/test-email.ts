import path from 'path';
import { sendEmail } from '../src/lib/services/mailService';

async function main() {
  const to = process.argv[2] ?? process.env.EMAIL;
  if (!to) {
    console.error('Uso: npm run test:email -- destino@ejemplo.com');
    process.exit(1);
  }

  const rifasFake = [{ numero: '001' }, { numero: '002' }];
  const rifasPlural = rifasFake.length > 1;
  const fechaSorteo = (process.env.NEXT_PUBLIC_FECHA_SORTEO ?? '').toLowerCase();
  const text = `¡Hola! Gracias por tu compra ❤️\n\n${rifasPlural ? `Tus números son: ` : `Tu número es: `}${rifasFake.map(rifa => rifa.numero).join(' - ')}\n\nSorteamos el ${fechaSorteo} a través de nuestro Instagram (https://www.instagram.com/caminando.juntosok/).\nMuchos éxitos ✨`;
  const html = `<p><strong>¡Hola! Gracias por tu compra ❤️</strong></p><p>${rifasPlural ? `Tus números son: ` : `Tu número es: `}${rifasFake.map(rifa => rifa.numero).join(' - ')}</p><p>Sorteamos el ${fechaSorteo} a través de nuestro <a href="https://www.instagram.com/caminando.juntosok/">Instagram</a>.<br/>Muchos éxitos ✨</p><div style="text-align:left;"><img src="cid:agradecimiento" alt="¡Gracias por tu compra!" width="540" style="width:540px;height:auto;" /></div>`;

  await sendEmail(
    to,
    'Rifas Caminando Juntos 2026 - Tu compra (prueba)',
    text,
    html,
    [{
      filename: 'agradecimiento.png',
      path: path.join(process.cwd(), 'public', 'agradecimiento.png'),
      cid: 'agradecimiento',
    }],
  );

  console.log(`Email de prueba enviado a ${to}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
