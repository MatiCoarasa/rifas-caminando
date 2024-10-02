import styles from "./sidebar.module.css";

import nenes from "../../../public/nenes.png"

import FechaSorteo from "./FechaSorteo/FechaSorteo";
import CalendarImage from "./Calendar/Calendar";
import Detalle from "./Detalle/Detalle";

export default function Sidebar() {
  const date = new Date(2024, 1, 24);
  return (
    <div className={styles.sidebar}>
      <img src={nenes.src} alt="nenes" className={styles.img}/>
      <div className={styles.fecha}>
        <CalendarImage date={date}/>
        <FechaSorteo date={date}/>
      </div>
        <Detalle titulo="Formato del sorteo" detalle="Online (anunciaremos a las personas ganadoras a través de nuestro Instagram)" />
        <Detalle titulo="Organizado por" detalle="Asociación Civil Caminando Juntos" />
    </div>
  );
}
