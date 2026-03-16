import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Catalog from '../components/Catalog'
import Cart from '../components/Cart'
import Footer from '../components/Footer'


export default function CatalogPage() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Catalog onAddToCart={handleAddToCart} />
      <Footer />
      {cartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={handleRemove}
        />
      )}
    </>
  )
}
