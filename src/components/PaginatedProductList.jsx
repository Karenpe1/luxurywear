import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/PaginatedProductList.module.css";
import { formatCurrency } from "../Utils/currencyFormatter";
import HeartButton from "./HeartButton";
import Pagination from "./Pagination";
import useAxios from "../Utils/axiosInstance";

const PaginatedProductList = ({ pageSize = 6 }) => {
  const { categoryName } = useParams(); // Get categoryName from URL
  const { state } = useLocation(); // Get state from navigation
  
  const navigate = useNavigate();

  const categoryDescription = state?.categoryDescription || ""; // Get categoryDescription from state

  const [products, setProducts] = useState([]); // Stores product data
  const [currentPage, setCurrentPage] = useState(0); // Tracks current page
  const [totalPages, setTotalPages] = useState(0); // Tracks total pages
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
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
          },
        });

        const data = response.data;
        setProducts(data.content); // Set product data
        setTotalPages(data.totalPages); // Set total pages from response
      } catch (err) {
        setError("Error fetching products"); // Set error if request fails
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProducts();
  }, [categoryName, currentPage]);

  const handleCardClick = (productId) => {
    navigate(`/detail/${productId}`); // Navigate to the detail page with productId
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.productListContainer}>
      <h2 className={styles.titulo} style={categoryName ? { paddingTop: 'calc(100px + 20px)' } : {}}>{categoryName || "Nuestros Productos"}</h2>
      {categoryDescription && <h3>{categoryDescription}</h3>} {/* Show subtitle only if provided */}

      {/* Loading and Error states */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Display Products */}
      <div className={styles.products}>
        {products.map((product) => (
          <div
            key={product.productId}
            className={styles.productCard}
            onClick={() => handleCardClick(product.productId)}
          >
            <HeartButton className={styles.heart} />
            <img
              src={`/${product.images[0].url}`}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.contenedor}>
              <h2>{product.name}</h2>
              <p>Alquiler: {formatCurrency(product.price, "es-CO", "COP")}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatedProductList;
