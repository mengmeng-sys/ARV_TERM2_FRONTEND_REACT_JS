import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'
import styles from '../Style/Contact.module.css'

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5-8 business days. Express (2-3 days) is available at checkout.' },
  { q: 'Do you ship internationally?', a: 'Yes — we ship to most countries. International orders typically arrive within 10-15 business days.' },
  { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unworn and in original condition.' },
  { q: 'How do I find my size?', a: 'Check our Size Guide in the Catalog. ARV pieces run true to size with a relaxed fit.' },
  { q: 'Can I change or cancel my order?', a: 'Contact us within 2 hours of placing your order and we\'ll do our best to accommodate changes.' },
]

export default function Contact() {
  const { cartCount, openCart } = useCart()
  const [open, setOpen] = useState(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className={styles.page}>
      <Navbar cartCount={cartCount} onCartOpen={openCart} />

      <section className={styles.hero}>
        <span className={styles.eyebrow}>Get in touch</span>
        <h1 className={styles.heroTitle}>We're real people.<br />Talk to us.</h1>
        <p className={styles.heroSub}>Questions, feedback, sizing help — we're here for all of it.</p>
      </section>

      <section className={styles.contactGrid}>

        <div className={styles.formWrap}>
          <h2 className={styles.colTitle}>Send a message</h2>
          {sent ? (
            <div className={styles.successMsg}>
              <span className={styles.successIcon}>✓</span>
              <p>Message received. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Name</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Subject</label>
                <select
                  className={styles.input}
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  required
                >
                  <option value="">Select a topic</option>
                  <option>Order inquiry</option>
                  <option>Return / Exchange</option>
                  <option>Sizing help</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Message</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button className={styles.submitBtn} type="submit">Send Message</button>
            </form>
          )}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.infoBlock}>
            <h2 className={styles.colTitle}>Contact info</h2>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <a href="mailto:support@arvstudios.com" className={styles.infoValue}>support@arvstudios.com</a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Response time</span>
              <span className={styles.infoValue}>Within 24 hours</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Hours</span>
              <span className={styles.infoValue}>Mon-Fri, 9AM-6PM</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Social</span>
              <div className={styles.socialRow}>
                <a href="#" className={styles.socialBtn}><img src="/instagram.png" alt="Instagram" /></a>
                <a href="#" className={styles.socialBtn}><img src="/facebook-app-symbol.png" alt="Facebook" /></a>
                <a href="#" className={styles.socialBtn}><img src="/telegram.png" alt="Telegram" /></a>
              </div>
            </div>
          </div>

          <div className={styles.imageBlock}>
            <img src="/Home/ClothingRack.png" alt="ARV Studio" className={styles.sideImage} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
        <div className={styles.faqList}>
          {faqs.map((item, i) => (
            <div className={styles.faqItem} key={i}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{item.q}</span>
                <span className={`${styles.faqArrow} ${open === i ? styles.open : ''}`}>↓</span>
              </button>
              {open === i && (
                <p className={styles.faqAnswer}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
