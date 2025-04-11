import React, { useState } from 'react'
import Button from '../button/Button'
import styles from './Filter.module.scss'

const Filter = ({ categories, products, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleFilterChange = (category) => {
    setSelectedCategory(category)
    const filteredProducts =
      category === 'all'
        ? products
        : products.filter((product) => product.category === category)
    onFilterChange(filteredProducts)
  }

  return (
    <div className={styles.filterButtons}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'active' : 'primary'}
          onClick={() => handleFilterChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

export default Filter
