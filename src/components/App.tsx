import styles from './App.module.css';

import Header from './header/Header';
import Info from './info/Info';
import RifasForm from './rifasForm/RifasForm'
import {Footer} from "./footer/Footer";

export default function App() {
  const precioRifas = parseInt(process.env.NEXT_PUBLIC_PRECIO_RIFA!);

  return (
    <div>
      <Header/>
      <main className={styles.main}>
        <Info />
        <RifasForm />
      </main>
      <Footer/>
    </div>
  );
}
