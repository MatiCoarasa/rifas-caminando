import React from 'react';
import styles from './calendar.module.css';

type CalendarImageProps = {
  date: Date;
};

export default function CalendarImage({ date }: CalendarImageProps) {
  const month = date.toLocaleString('es-ES', {month : 'short'}).toUpperCase();
  const day = date.getUTCDate()

  return (
    <div className={styles.calendario}>
      <div className={styles.mesDiv}>
        <div className={styles.mesTexto}>{month}</div>
      </div>
      <div className={styles.diaDiv}>
        <div className={styles.diaTexto}>{day}</div>
      </div>
    </div>
  );
}