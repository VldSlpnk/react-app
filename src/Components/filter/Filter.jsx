import React, { useState } from 'react'
import styles from './Filter.module.css'

const Filter = ({ categories, products, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleFilterChange = (category) => {
    setSelectedCategory(category)

    let filteredProducts
    if (category === 'all') {
      filteredProducts = products
    } else {
      filteredProducts = products.filter(
        (product) => product.category === category
      )
    }

    onFilterChange(filteredProducts)
  }

  return (
    <div className={styles.filterButtons}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.filterButton} ${
            selectedCategory === category ? styles.active : ''
          }`}
          onClick={() => handleFilterChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default Filter
