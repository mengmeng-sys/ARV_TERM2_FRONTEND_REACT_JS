import React, { useState } from 'react'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrap}>
          {product.img ? (<img src={product.img} alt={product.name} className={styles.productImage}/>
          ):(
          <div className={styles.swatch} style={{ background: product.color }} />)}
        <button
          className={`${styles.addBtn} ${hovered ? styles.addBtnVisible : ''} ${added ? styles.addBtnDone : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ Added' : '+ Add to Cart'}
        </button>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.price}>{product.price}$</span>
      </div>
    </div>
  )
}
