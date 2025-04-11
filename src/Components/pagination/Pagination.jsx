import React from 'react'
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
      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Попередня
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ''
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Наступна
      </button>
    </div>
  )
}

export default Pagination
