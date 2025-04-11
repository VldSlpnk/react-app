import React from 'react'
import Button from '../button/Button'
import styles from './Pagination.module.scss'

const Pagination = ({
  filteredProducts,
  productsPerPage,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  return (
    <div className={styles.pagination}>
      <Button
        variant="primary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Попередня
      </Button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'active' : 'primary'}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        )
      )}
      <Button
        variant="primary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Наступна
      </Button>
    </div>
  )
}

export default Pagination
