import React from "react";
import styles from "./fechaSorteo.module.css";


type fechaSorteoProps = {
  date: Date;
}

export default function FechaSorteo({ date }: fechaSorteoProps) {
  return (
    <div className={styles.frameFechaSorteo}>
      <div className={styles.preguntaSorteo}>¿Cuándo sorteamos?</div>
      <div className={styles.textoFechaSorteo}>Sábado, 26 de octubre | 13.00hs</div>
    </div>
  );
}
