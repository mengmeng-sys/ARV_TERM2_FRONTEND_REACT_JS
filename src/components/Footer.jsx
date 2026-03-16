import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <img className={styles.ARVLogo} src='../../public/Logo.png'/>
            <span className={styles.logoText}>ARV</span>
          </div>
          <p className={styles.tagline}>Arrive in Style</p>
          <p className={styles.desc}>
            Why can't comfort look this good? ARV was built to bridge the gap between effortless style and uncompromising quality.
          </p>
          <div className={styles.social}>
            {['../../public/facebook-app-symbol.png', '../../public/instagram.png', '../../public/telegram.png'].map((imgSrc, index) => (
              <a key={index} href="#" className={styles.socialLink}>
                <img src={imgSrc} alt={`Social ${index + 1}`} />
              </a>))}
        </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          {['Profile', 'Catalog', 'Cart', 'About Us', 'Contact'].map(l => (
            <a key={l} href="#" className={styles.link}>{l}</a>
          ))}
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Customer Service</h4>
          {['Contact Us', 'FAQs', 'Size Guide'].map(l => (
            <a key={l} href="#" className={styles.link}>{l}</a>
          ))}
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Stay Connected</h4>
          <p className={styles.desc}>Subscribe to our newsletter for exclusive deals and offers</p>
          <div className={styles.emailRow}>
            <input className={styles.emailInput} type="email" placeholder="Enter your email" />
            <button className={styles.emailBtn}>→</button>
          </div>
          <a href="mailto:support@arvstudios.com" className={styles.emailLink}>
            support@arvstudios.com
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 ARV Studios. All rights reserved</span>
        <div className={styles.legal}>
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
