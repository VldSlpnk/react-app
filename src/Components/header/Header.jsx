import React from 'react'
import Button from '../button/Button'
import styles from './Header.module.scss'

const Header = ({ onToggleCart, isCartOpen }) => (
  <header className={styles.header}>
    <h1>Список товарів</h1>
    <Button onClick={onToggleCart}>
      {isCartOpen ? 'Закрити кошик' : 'Відкрити кошик'}
    </Button>
  </header>
)

export default Header
