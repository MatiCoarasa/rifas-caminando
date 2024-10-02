"use client";

import styles from './compraRifas.module.css';
import plus from '../../../public/plus.svg';
import minus from '../../../public/minus.svg';

import { useState } from "react";

import { CompraRifa } from "../../lib/models/compra-rifa.model";
import {useRouter} from 'next/navigation';

const MINIMO_RIFAS = 1;

export default function CompraRifas({ precioRifas }: { precioRifas: number }) {
  const [cantidadRifas, setCantidadRifas] = useState(MINIMO_RIFAS);
  const router = useRouter();

  function restar() {
    if (cantidadRifas > MINIMO_RIFAS) setCantidadRifas(cantidadRifas - 1);
  }

  async function comprar(nombre: string, email: string, cantRifas: number) {
    const fechaCompra = new Date();
    const rifas = [];

    for(let i = 0; i < cantRifas; i++) {
      rifas.push(new CompraRifa(fechaCompra, nombre, email));
    }
    let url;
    try {
      const response = await fetch('/api/rifas', {
        method: 'POST',
        body: JSON.stringify({ rifas }),
      });
      const responseJson = await response.json();
      url = responseJson.url;
    } catch (err) {
      console.log(err);
      alert('Ocurrió un error. Por favor, intentalo de nuevo. Si el problema persiste, contactanos a contacto@caminandojuntosok.com');
    }

    router.push(url);
  }

  return (
    <div>
      <div className={styles.rifasPregunta}>¿Cuántas rifas querés comprar?</div>
      <div className={styles.vendedorContainer}>
        <div className={cantidadRifas > MINIMO_RIFAS ? styles.modificadorContainer : styles.modificadorContainerDisabled}>
          <img
            src={minus.src}
            alt='minus'
            className={cantidadRifas > MINIMO_RIFAS ? styles.modificadorValor : styles.modificadorValorDisabled}
            onClick={restar}
            draggable={false}
          />
        </div>
        <div className={styles.valorContainer}>
          <span className={styles.valor}>{cantidadRifas}</span>
        </div>
        <div className={styles.modificadorContainer}>
          <img
            src={plus.src}
            alt='plus'
            className={styles.modificadorValor}
            onClick={() => setCantidadRifas(cantidadRifas + 1)}
            draggable={false}
          />
        </div>
          <span className={styles.precioTotal}><b>Total:</b> ${(cantidadRifas * precioRifas).toLocaleString('es-AR')}</span>
          <span className={styles.comprarButton} onClick={async () => await comprar("test@mail.com", "Test Coa", cantidadRifas)}>COMPRAR</span>
      </div>
    </div>
  );
}
