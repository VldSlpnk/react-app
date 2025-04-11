import React from 'react'
import Card from '../card/Card'
import styles from './ProductGrid.module.scss'

const ProductGrid = ({ products, onAddToCart }) => (
  <div className={styles.grid}>
    {products.map((product) => (
      <Card key={product.id} product={product} onAddToCart={onAddToCart} />
    ))}
  </div>
)

export default ProductGrid
