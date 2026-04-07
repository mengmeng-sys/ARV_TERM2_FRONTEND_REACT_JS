import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'
import styles from '../Style/About.module.css'

const team = [
  { initials: 'HS', name: 'Heang Sovanntheara', role: 'Founder & Creative Director', bio: '' },
  { initials: 'SM', name: 'Seng Mengseang', role: 'Head of Design', bio: '' },
  { initials: 'KS', name: 'Keo Seavpav', role: 'Head of Sourcing', bio: '' },
]

const values = [
  { label: 'No compromise', desc: 'Every decision — fabric, cut, finish — is made with both comfort and aesthetics in mind. One without the other is not ARV.' },
  { label: 'Built to last', desc: 'We reject fast fashion. Our pieces are made to be worn for years, not seasons. Quality over quantity, always.' },
  { label: 'Earned simplicity', desc: 'Simple looks easy. It isn\'t. Every minimal detail is the result of dozens of iterations until it\'s exactly right.' },
  { label: 'Community first', desc: 'ARV exists because of the people who wear it. We listen, we adapt, we build together.' },
]

export default function About() {
  const { cartCount, openCart } = useCart()
  return (
    <div className={styles.page}>
      <Navbar cartCount={cartCount} onCartOpen={openCart} />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Est. 2025</span>
          <h1 className={styles.heroTitle}>We refused to choose<br />between comfort<br />and style.</h1>
          <p className={styles.heroSub}>So we built ARV to prove you never had to.</p>
        </div>
        <div className={styles.heroImageWrap}>
          <img src="/Home/HoodBig.png" alt="ARV Hoodie" className={styles.heroImage} />
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyLabel}>Our Story</div>
        <div className={styles.storyText}>
          <p>ARV Studios was born out of frustration. We kept finding clothes that looked incredible but felt like cardboard, or were impossibly comfortable but looked like you gave up.</p>
          <p>In 2025, we decided to stop waiting for someone else to fix it. We built ARV from the ground up — sourcing premium fabrics, working with technical pattern makers, and obsessing over every detail until each piece met a simple standard: you shouldn't have to sacrifice anything.</p>
          <p>Every drop is small. Every piece is considered. This is not fast fashion. This is clothing built to be worn for years.</p>
        </div>
      </section>

      <section className={styles.stats}>
        {[['2025', 'Founded'], ['100%', 'Premium fabrics'], ['< 500', 'Units per drop'], ['0', 'Compromises']].map(([n, l]) => (
          <div className={styles.statItem} key={l}>
            <span className={styles.statNum}>{n}</span>
            <span className={styles.statLabel}>{l}</span>
          </div>
        ))}
      </section>


      <section className={styles.values}>
        <h2 className={styles.sectionTitle}>What we stand for</h2>
        <div className={styles.valuesGrid}>
          {values.map((v) => (
            <div className={styles.valueCard} key={v.label}>
              <h3 className={styles.valueLabel}>{v.label}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>The people behind it</h2>
        <div className={styles.teamGrid}>
          {team.map((m) => (
            <div className={styles.teamCard} key={m.name}>
              <div className={styles.avatar}>{m.initials}</div>
              <h3 className={styles.teamName}>{m.name}</h3>
              <p className={styles.teamRole}>{m.role}</p>
              <p className={styles.teamBio}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaImage}>
          <img src="/Home/left.png" alt="ARV" />
        </div>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Arrive in style.</h2>
          <p className={styles.ctaText}>Explore the full collection and find your new everyday uniform.</p>
          <button className={styles.ctaBtn}>Shop Now</button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
