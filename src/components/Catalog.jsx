import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { products } from '../data/products'
import styles from './Catalog.module.css'

const TABS = ['Men', 'Women', 'Extras']

export default function Catalog({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('Men')

  const currentProducts = products[activeTab.toLowerCase()] || []

  return (
    <main className={styles.catalog}>
      <div className={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {currentProducts.map((product, i) => (
          <div
            key={product.id}
            className={styles.cardWrap}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </main>
  )
}
