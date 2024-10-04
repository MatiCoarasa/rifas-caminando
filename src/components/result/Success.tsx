import styles from './Result.module.css';

export default function Success() {
  return (
    <div className={styles.resultContainer}>
      <h1 className={styles.header}>¡Gracias por participar!</h1>
      <p>Vas a recibir un email con tus números de rifas.</p>
      <h3>MUCHOS ÉXITOS</h3>
    </div>
  )
}
