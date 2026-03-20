import React, { useState } from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

const ARVLogo = () => (
  <div className={styles.logoGroup}>
    <img className={styles.ARVLogo} src='/Logo.png'/>
    <span className={styles.logoText}>ARV</span>
  </div>
)

export default function Navbar({ cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link to="/" className={styles.navLink}>Home</Link>

          <Link to="/" className={styles.navLink} >
            Catalog
          </Link>

          <Link to="/about" className={styles.navLink}>
            About
          </Link>

          <Link to="/ContactPage" className={styles.navLink}>
            Contact
          </Link>
        </div>

        <a href="#" className={styles.logoWrap}>
          <ARVLogo />
        </a>

        <div className={styles.right}>
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <Link to="/SignIn">
            <button className={styles.iconBtn} aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </Link>
       
          <button className={styles.iconBtn} aria-label="Cart" onClick={onCartOpen} style={{ position: 'relative' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
        </div>
      </nav>
    </header>
  )
}
