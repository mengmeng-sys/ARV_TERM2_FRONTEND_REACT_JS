import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems]     = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = useCallback((product) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const clearCart  = useCallback(() => { setItems([]); setCartOpen(false) }, [])
  const openCart   = useCallback(() => setCartOpen(true), [])
  const closeCart  = useCallback(() => setCartOpen(false), [])
  const cartCount  = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, cartCount, addToCart, removeFromCart, clearCart, cartOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside <CartProvider>')
  return ctx
}
