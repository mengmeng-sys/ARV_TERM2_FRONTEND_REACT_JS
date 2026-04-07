import React from 'react'
import styles from './Cart.module.css'

export default function Cart({ items, onClose, onRemove, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.cart}>
        <div className={styles.header}>
          <span className={styles.title}>Cart ({items.length})</span>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>Your cart is empty.</div>
        ) : (
          <>
            <ul className={styles.items}>
              {items.map(item => (
                <li key={item.id} className={styles.item}>
                  {item.img
                    ? <img src={item.img} alt={item.name} className={styles.itemImage} />
                    : <div className={styles.swatch} style={{ background: item.color }} />
                  }
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>${item.price} × {item.qty}</span>
                  </div>
                  <button className={styles.remove} onClick={() => onRemove(item.id)}>✕</button>
                </li>
              ))}
            </ul>
            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className={styles.checkout} onClick={onCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}