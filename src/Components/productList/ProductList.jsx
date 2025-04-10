import React, { useEffect, useState } from 'react'
import styles from './ProductList.module.css'
import Card from '../card/Card'
import Pagination from '../pagination/Pagination'
import Filter from '../filter/Filter'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [productsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setFilteredProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Помилка при завантаженні товарів:', err)
        setLoading(false)
        setError('Помилка при завантаженні товарів')
      })
  }, [])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(['all', ...data]))
      .catch((err) => console.error('Помилка при завантаженні категорій:', err))
  }, [])

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts)
    setCurrentPage(1)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <h1>Список товарів</h1>

      <Filter
        categories={categories}
        products={products}
        onFilterChange={handleFilterChange}
      />

      {loading && <div className={styles.loader}>Завантаження...</div>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.productsGrid}>
        {filteredProducts
          .slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
          )
          .map((product) => (
            <Card key={product.id} product={product} />
          ))}
      </div>

      <Pagination
        filteredProducts={filteredProducts}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default ProductList
