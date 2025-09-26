import styles from './Header.module.css';

export default function Header() {
  return (
    <a href='/'>
      <header className={styles.header}>
        <img className={styles.headerLogo} src="logo-cjs.png" alt="Logo Caminando Juntos"/>
      </header>
    </a>
  )
}