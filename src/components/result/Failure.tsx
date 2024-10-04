import styles from "./Result.module.css";

export default function Failure() {
  return (
    <div className={styles.resultContainer}>
      <h1 className={styles.header}>Algo salió mal</h1>
      <p>Volvelo a intentar, por favor.<br/>Si el problema persiste enviá un email a <b>contacto@caminandojuntosok.com</b></p>
    </div>
  )
}
