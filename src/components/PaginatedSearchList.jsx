import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/PaginatedProductList.module.css";
import Pagination from "./Pagination";
import useAxios from "../Utils/axiosInstance";
import DetailHeader from "./DetailHeader";
import CardProduct from "./CardProduct.jsx";

const PaginatedSearchList = ({ pageSize = 6, searchTerm, startDate, endDate, searchToggle }) => {
  const { categoryName } = useParams(); // Get categoryName from URL
  const { state } = useLocation(); // Get state from navigation

  const categoryDescription = state?.categoryDescription || ""; // Get categoryDescription from state

  const [products, setProducts] = useState([]); // Stores product data
  const [currentPage, setCurrentPage] = useState(0); // Tracks current page
  const [totalPages, setTotalPages] = useState(0); // Tracks total pages
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [totalElements, setTotalElements] = useState(0);
  const [numElements, setNumElements] = useState(0);
  const axios = useAxios();

  // Fetch products for the current page
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error

      try {
        const response = await axios.get(`/api/v1/products/paginated`, {
          params: {
            page: currentPage,
            size: pageSize,
            category: categoryName || "",
            search: searchTerm,
            startDate: startDate.year + '-' + ('0' + (startDate.month + 1)).slice(-2) + '-' + ('0' + startDate.day).slice(-2),
            endDate: endDate.year + '-' + ('0' + (endDate.month + 1)).slice(-2) + '-' + ('0' + endDate.day).slice(-2)
          },
        });

        const data = response.data;
        setProducts(data.content); // Set product data
        setTotalPages(data.totalPages); // Set total pages from response
        setTotalElements(data.totalElements);
        setNumElements(data.numberOfElements);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Error fetching products"); // Set error if request fails
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, currentPage, searchToggle]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the range of products displayed
  const startRange = currentPage * pageSize + 1;
  const endRange = Math.min(startRange + numElements - 1, totalElements);

  return (
    <div className={styles.productListContainer}>
      {categoryName ? (
        <DetailHeader title={categoryName}/>
      ) : (
        <h2 className={styles.titulo}>{"Resultados de la búsqueda"}</h2>
      )}

      {categoryDescription && <h3>{categoryDescription}</h3>} {/* Show subtitle only if provided */}

      {/* Display total and current product count */}
      <p className={styles.paginationInfo}>
        Mostrando {startRange}-{endRange} de {totalElements} productos {categoryName && "con categoría " + categoryName} (Página {currentPage + 1} de {totalPages})
      </p>

      {products.length === 0 &&
        <div style={{textAlign: 'center'}}>
          <img src="/ohNo2.png" alt={"Cero resultados"} style={{width: '300px'}}/>
          <h2>No hay resultados para tu búsqueda.</h2>
        </div>}

      {/* Loading and Error states */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Display Products */}
      <CardProduct products={products}/>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatedSearchList;
