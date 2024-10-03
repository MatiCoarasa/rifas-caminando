import styles from './RifasForm.module.css';
import {useState} from "react";

export default function RifasForm() {
  const [rifas, setRifas] = useState(1);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  function setRifasValue(newRifasValue: number) {
    setRifas(Math.max(1, newRifasValue));
  }

  return (
    <form className={styles.container}>
      <div>
        <h3>COMPLETÁ TUS DATOS</h3>
        <div className={styles.datosContainer}>
          <input className={styles.input} placeholder="Tu nombre completo*"></input>
          <input type="email" className={styles.input} placeholder="Tu dirección de email*"></input>
        </div>
      </div>
      <div>
        <h3>SELECCIONÁ LA CANTIDAD DE RIFAS</h3>
        <div className={styles.compraContainer}>

          <button
            onClick={(e) => {
              e.preventDefault();
              setRifasValue(rifas - 1)
            }}>-
          </button>
          <span>{rifas}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setRifasValue(rifas + 1)
            }}>+
          </button>
        </div>
      </div>
    </form>
  )
}