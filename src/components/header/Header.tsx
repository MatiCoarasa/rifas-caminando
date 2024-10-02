import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="logo-cjs.png" alt="Logo Caminando Juntos"/>
    </header>
  )
}