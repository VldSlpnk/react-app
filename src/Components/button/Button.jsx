import React from 'react'
import styles from './Button.module.scss'

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => (
  <button
    className={`${styles.button} ${styles[variant]}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
