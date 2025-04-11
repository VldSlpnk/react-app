import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import Button from '../button/Button'
import styles from './Cart.module.scss'

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext)

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
    0
  )

  const handleCartClick = (e) => {
    if (e.target.classList.contains(styles.cartDrawer)) {
      onClose()
    }
  }

  return (
    <div
      className={`${styles.cartDrawer} ${isOpen ? styles.open : ''}`}
      onClick={handleCartClick}
    >
      <h2>Кошик</h2>
      {cartItems.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <span>{item.title}</span>
                <span>× {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Видалити
                </Button>
              </li>
            ))}
          </ul>
          <div className={styles.cartTotal}>Загалом: ${total.toFixed(2)}</div>
          <Button variant="secondary" onClick={clearCart}>
            Очистити кошик
          </Button>
        </>
      )}
    </div>
  )
}

export default Cart
