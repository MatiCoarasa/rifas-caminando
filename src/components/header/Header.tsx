import styles from './Header.module.css';

export default function Header() {
  return (
      <header className={styles.header}>
        <a href='/'>
          <img className={styles.headerLogo} src="logo-cjs.png" alt="Logo Caminando Juntos"/>
        </a>
      </header>
  )
}