import React from 'react'
import styles from './Card.module.scss'

const Card = ({ product, onAddToCart }) => {
  const { image, title, price, category } = product

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>
        <p className={styles.category}>{category}</p>
        <p className={styles.price}>${price.toFixed(2)}</p>
        <button className={styles.button} onClick={() => onAddToCart(product)}>
          Додати до кошика
        </button>
      </div>
    </div>
  )
}

export default Card
