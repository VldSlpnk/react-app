import React, { useEffect, useState } from 'react'
import styles from './ProductList.module.scss'
import Card from '../card/Card'
import Pagination from '../pagination/Pagination'
import Filter from '../filter/Filter'
import Loader from '../loader/Loader'
import Cart from '../cart/Cart'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [productsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        console.error('Помилка при завантаженні товарів:', err)
        setError('Помилка при завантаженні товарів')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const data = await res.json()
        setCategories(['all', ...data])
      } catch (err) {
        console.error('Помилка при завантаженні категорій:', err)
      }
    }

    fetchCategories()
  }, [])

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts)
    setCurrentPage(1)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
    setIsCartOpen(true)
  }

  const handleCloseCart = () => {
    setIsCartOpen(false)
  }

  return (
    <div>
      <h1>Список товарів</h1>
      <button
        className={styles.cartOpen}
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        {isCartOpen ? 'Закрити кошик' : 'Відкрити кошик'}
      </button>

      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <Filter
            categories={categories}
            products={products}
            onFilterChange={handleFilterChange}
          />

          {filteredProducts.length === 0 && (
            <p className={styles.empty}>Товарів не знайдено</p>
          )}

          <div className={styles.productsGrid}>
            {filteredProducts
              .slice(
                (currentPage - 1) * productsPerPage,
                currentPage * productsPerPage
              )
              .map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>

          <Pagination
            filteredProducts={filteredProducts}
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          <Cart
            isOpen={isCartOpen}
            cartItems={cartItems}
            setCartItems={setCartItems}
            onClose={handleCloseCart}
          />
        </>
      )}
    </div>
  )
}

export default ProductList
