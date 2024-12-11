import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/PaginatedReservationList.module.css";
import Pagination from "./Pagination";
import useAxios from "../Utils/axiosInstance";
import DetailHeader from "./DetailHeader";
import ProductImage from "./ProductImage.jsx";

const PaginatedReservationList = ({ pageSize = 6, searchToggle }) => {
  const { categoryName } = useParams(); // Get categoryName from URL

  const navigate = useNavigate();

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
        const response = await axios.get(`/api/v1/reservations/user-reservations`, {
          params: {
            page: currentPage,
            size: pageSize,
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

  const handleCardClick = (productId) => {
    navigate(`/reservation-detail`, {state: {productId}}); // Navigate to the detail page with productId
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the range of products displayed
  const startRange = currentPage * pageSize + 1;
  const endRange = Math.min(startRange + numElements - 1, totalElements);

  return (
    <div className={styles.reservationListContainer}>
      <DetailHeader title={"Tus reservas"}/>

      <h3 className={styles.subTitle}>{"Esta es la lista completa de tus reservas; puedes consultar del detalle de cada una."}</h3>

      {/* Display total and current product count */}
      <p className={styles.paginationInfo}>
        Mostrando {startRange}-{endRange} de {totalElements} productos {categoryName && "con categoría " + categoryName} (Página {currentPage + 1} de {totalPages})
      </p>

      {/* Loading and Error states */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Display Products */}
      <div className={styles.reservations}>
        {products.map((reservation) => (
          <div key={reservation.id} className={styles.reservationCard}>
            <div className={styles.cardHeader}>{reservation.productName}</div>
            <div className={styles.cardBody}>
              <div className={styles.cardDetails}>
                <p className={styles.bold}>Número de orden:</p>
                <p>{reservation.reservationCode}</p>
                <p className={styles.bold}>Fecha de entrega:</p>
                <p>{reservation.startDate}</p>
                <p className={styles.bold}>Fecha de devolución:</p>
                <p>{reservation.endDate}</p>
                <p className={styles.bold}>Método de entrega:</p>
                <p>{reservation.shippingMethod}</p>
              </div>
              <div className={styles.cardImageContainer}>
                <ProductImage
                  src={`${reservation.productImageUrl}`}
                  alt={reservation.productName}
                  className={styles.cardImage}
                />
              </div>
            </div>
            <button className={styles.cardButton} onClick={() => handleCardClick(reservation.id)}>
              Ver detalle
            </button>
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

export default PaginatedReservationList;
