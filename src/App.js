import React from 'react'
import ProductList from './Components/productList/ProductList'
import { CartProvider } from './context/CartContext'

const App = () => (
  <CartProvider>
    <ProductList />
  </CartProvider>
)

export default App
