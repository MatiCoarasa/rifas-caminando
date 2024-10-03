import styles from './Info.module.css';

export default function Info() {
  return (
    <div className={styles.root}>
      <div>
        <h1 className={styles.titulo}>RIFA SOLIDARIA</h1>
        <p className={styles.bajada}>Formá parte de nuestro evento para ayudar a las familias de Misiones. <span className={styles.bold}>¡Participás por increíbles premios!</span></p>
      </div>
      <img className={styles.divisor} src='divisor.svg' alt='Divisor re piola' />
      <div className={styles.preguntasContainer}>
        <div>
          <h3>¿CUÁNDO SORTEAMOS?</h3>
          <p>Sábado, 26 de Octubre a las 13hs</p>
        </div>
        <div>
          <h3>¿DÓNDE SORTEAMOS?</h3>
          <p>A través de nuestro Instagram <a href="https://www.instagram.com/caminando.juntosok/">@caminandojuntosok</a></p>
        </div>
      </div>
    </div>
  )
}