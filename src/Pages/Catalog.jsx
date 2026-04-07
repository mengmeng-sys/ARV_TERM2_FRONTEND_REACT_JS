import React from 'react'
import Navbar from '../components/Navbar'
import Catalog from '../components/Catalog'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

export default function CatalogPage() {
  const { addToCart, cartCount, openCart } = useCart()
  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={openCart} />
      <Catalog onAddToCart={addToCart} />
      <Footer />
    </>
  )
}
