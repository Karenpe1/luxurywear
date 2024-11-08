import React from "react";
import StylePagination from "../styles/pagination.module.css";

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPage - 1) {
      onPageChange(currentPage + 1);
    }
  };
  const handleFirstPage = () => {
    onPageChange(0);
  };
  const handleLastPage = () => {
    onPageChange(totalPage - 1);
  };
  const renderNumeroPaginas = () => {
    const pages = [];
    for (let i = 0; i < totalPage; i++) {
      if (
        i === 0 ||
        i === totalPage - 1 ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={()=> handlePageClick(i)}
            className={`${StylePagination.pageButton} ${
              i === currentPage ? StylePagination.active: "" }`}
          >
            {i + 1}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<span key={i}>...</span>);
      }
    }
    return pages;
  };
  return (
    <div className={StylePagination.contenedor}>
      <button onClick={handleFirstPage} disabled={currentPage === 0}>
        «
      </button>
      <button onClick={handlePreviousPage} disabled={currentPage === 0}>
        ‹
      </button>
      {renderNumeroPaginas()}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPage - 1}
      >
        ›
      </button>
      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPage - 1}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
