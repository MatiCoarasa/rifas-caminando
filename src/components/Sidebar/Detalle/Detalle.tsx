import styles from "./detalle.module.css";

type detalleProps = {
  titulo: string;
  detalle: string;
}

export default function Detalle({ titulo, detalle }: detalleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.titulo}>{titulo}</div>
      <div className={styles.divisor}/>
      <div className={styles.detalle}>{detalle}</div>
    </div>
  );
};