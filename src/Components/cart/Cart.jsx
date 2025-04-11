import React from 'react'
import styles from './Cart.module.scss'

const Cart = ({ isOpen, cartItems = [], setCartItems, onClose }) => {
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const total = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0

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
                <button onClick={() => removeFromCart(item.id)}>
                  Видалити
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.cartTotal}>Загалом: ${total.toFixed(2)}</div>
          <button className={styles.clearBtn} onClick={clearCart}>
            Очистити кошик
          </button>
        </>
      )}
    </div>
  )
}

export default Cart
