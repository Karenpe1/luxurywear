import React, { useState, useEffect } from "react";
import useAxios from "../Utils/axiosInstance"; // Custom Axios instance
import HeartButton from "../components/HeartButton";
import Pagination from "../components/Pagination";
import styles from "../styles/FavList.module.css";

const FavList = ({ pageSize = 6 }) => {
  const axios = useAxios();
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch favorite products
  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/favorites`,
        { params: { page: currentPage, size: pageSize } }
      );
      const data = response.data;
      setFavorites(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Error al obtener los favoritos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [currentPage]);

  // Toggle favorite status
  const handleToggleFavorite = async (productId) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/users/toggle-favorites`, {
        productId,
      });
      await fetchFavorites(); // Refetch favorites after toggling
    } catch {
      setError("No se pudo actualizar el estado del favorito.");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.favListContainer}>
      <h2 className={styles.title}>Tus Productos Favoritos</h2>

      {/* Loading and Error states */}
      {loading && <p>Cargando favoritos...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && favorites.length === 0 && (
        <p className={styles.noFavorites}>No tienes productos favoritos.</p>
      )}

      <div className={styles.products}>
        {favorites.map((product) => (
          <div key={product.productId} className={styles.productCard}>
            <HeartButton
              className={styles.heart}
              productId={product.productId}
              onToggle={() => handleToggleFavorite(product.productId)}
            />
            <img
              src={product.images[0]?.url || "placeholder.jpg"}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p>Precio: {product.price}</p>
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

export default FavList;
