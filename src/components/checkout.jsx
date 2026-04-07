import { useState } from 'react'
import { addOrder, getCurrentUser } from '../data/store.js'
import styles from '../Style/Checkout.module.css'

const STEPS = ['Shipping', 'Payment', 'Confirm']

const empty = (fields) => fields.reduce((o, k) => ({ ...o, [k]: '' }), {})

export default function Checkout({ items, onClose, onSuccess }) {
  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState(empty(['firstName','lastName','address','city','zip']))
  const [payment,  setPayment]  = useState(empty(['cardNumber','expiry','cvc','nameOnCard']))
  const [placed,   setPlaced]   = useState(false)

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  const updShip = e => setShipping(p => ({ ...p, [e.target.name]: e.target.value }))
  const updPay  = e => setPayment(p  => ({ ...p, [e.target.name]: e.target.value }))

  const handlePlaceOrder = () => {
    const user = getCurrentUser()
    addOrder(items, user?.id || 'guest')
    setPlaced(true)
    setTimeout(onSuccess, 2200)
  }

  if (placed) return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.drawer}>
        <div className={styles.success}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Order placed!</h2>
          <p className={styles.successSub}>We'll send you a confirmation shortly.</p>
        </div>
      </aside>
    </>
  )

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.drawer}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.title}>Checkout</span>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        {/* Step bar */}
        <div className={styles.stepBar}>
          {STEPS.map((label, i) => (
            <div key={label} className={styles.stepGroup}>
              <div className={`${styles.step} ${i < step ? styles.done : i === step ? styles.active : styles.idle}`}>
                <span className={styles.stepNum}>{i < step ? '✓' : i + 1}</span>
                <span className={styles.stepLabel}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className={styles.body}>

          {/* ── Step 0: Shipping ── */}
          {step === 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Shipping address</h3>
              <div className={styles.row2}>
                <Field label="First name" name="firstName" value={shipping.firstName} onChange={updShip} placeholder="Jane" />
                <Field label="Last name"  name="lastName"  value={shipping.lastName}  onChange={updShip} placeholder="Smith" />
              </div>
              <Field label="Address" name="address" value={shipping.address} onChange={updShip} placeholder="123 Main St" />
              <div className={styles.row2}>
                <Field label="City" name="city" value={shipping.city} onChange={updShip} placeholder="Brooklyn" />
                <Field label="ZIP"  name="zip"  value={shipping.zip}  onChange={updShip} placeholder="11201" />
              </div>
              <div className={styles.actions}>
                <button className={styles.btnSec} onClick={onClose}>Cancel</button>
                <button className={styles.btnPri} onClick={() => setStep(1)}>Continue to payment →</button>
              </div>
            </div>
          )}

          {/* ── Step 1: Payment ── */}
          {step === 1 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Payment</h3>
              <Field label="Card number" name="cardNumber" value={payment.cardNumber} onChange={updPay} placeholder="1234 5678 9012 3456" />
              <div className={styles.row2}>
                <Field label="Expiry" name="expiry" value={payment.expiry} onChange={updPay} placeholder="MM / YY" />
                <Field label="CVC"    name="cvc"    value={payment.cvc}    onChange={updPay} placeholder="123" />
              </div>
              <Field label="Name on card" name="nameOnCard" value={payment.nameOnCard} onChange={updPay} placeholder="Jane Smith" />
              <div className={styles.actions}>
                <button className={styles.btnSec} onClick={() => setStep(0)}>← Back</button>
                <button className={styles.btnPri} onClick={() => setStep(2)}>Review order →</button>
              </div>
            </div>
          )}

          {/* ── Step 2: Confirm ── */}
          {step === 2 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Order summary</h3>
              <ul className={styles.summaryList}>
                {items.map(item => (
                  <li key={item.id} className={styles.summaryRow}>
                    <span>{item.name} <span className={styles.qty}>× {item.qty}</span></span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </li>
                ))}
                <li className={styles.summaryRow}>
                  <span>Shipping</span><span className={styles.free}>Free</span>
                </li>
                <li className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </li>
              </ul>

              <div className={styles.shipPreview}>
                <span className={styles.shipLabel}>Delivering to</span>
                <p className={styles.shipAddr}>
                  {shipping.firstName} {shipping.lastName}<br />
                  {shipping.address}<br />
                  {shipping.city}, {shipping.zip}
                </p>
              </div>

              <div className={styles.actions}>
                <button className={styles.btnSec} onClick={() => setStep(1)}>← Back</button>
                <button className={styles.btnPri} onClick={handlePlaceOrder}>Place order</button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

function Field({ label, name, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>
        {label}
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            padding: '9px 12px',
            border: '1px solid #ddd',
            borderRadius: 8,
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            color: '#111',
            background: '#fff',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = '#111'}
          onBlur={e => e.target.style.borderColor = '#ddd'}
        />
      </label>
    </div>
  )
}