import Cart from './Cart'
import { useCart } from '../context/CartContext'

export default function CartRoot() {
  const { items, cartOpen, closeCart, removeFromCart, clearCart } = useCart()
  if (!cartOpen) return null
  return (
    <Cart
      items={items}
      onClose={closeCart}
      onRemove={removeFromCart}
      onCheckout={clearCart}
    />
  )
}
