import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import Header from '../header/Header'
import ProductGrid from '../productGrid/ProductGrid'
import Filter from '../filter/Filter'
import Pagination from '../pagination/Pagination'
import Cart from '../cart/Cart'
import Loader from '../loader/Loader'
import styles from './ProductList.module.scss'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const productsPerPage = 10

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        setError('Помилка при завантаженні товарів')
      } finally {
        setLoading(false)
      }
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const data = await res.json()
        setCategories(['all', ...data])
      } catch (err) {
        console.error('Помилка при завантаженні категорій:', err)
      }
    }

    fetchProducts()
    fetchCategories()
  }, [])

  const handleFilterChange = (filtered) => {
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    setIsCartOpen(true)
  }

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  return (
    <div className={styles.container}>
      <Header onToggleCart={handleToggleCart} isCartOpen={isCartOpen} />
      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <>
          <Filter
            categories={categories}
            products={products}
            onFilterChange={handleFilterChange}
          />
          {filteredProducts.length === 0 ? (
            <p className={styles.empty}>Товарів не знайдено</p>
          ) : (
            <>
              <ProductGrid
                products={paginatedProducts}
                onAddToCart={handleAddToCart}
              />
              <Pagination
                filteredProducts={filteredProducts}
                productsPerPage={productsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
      )}
    </div>
  )
}

export default ProductList
