import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../Utils/axiosInstance"; // Custom Axios instance
import HeartButton from "../components/HeartButton";
import Pagination from "../components/Pagination";
import styles from "../styles/FavList.module.css";

const FavList = ({ pageSize = 6 }) => {
  const [favorites, setFavorites] = useState([]); // Favoritos
  const [currentPage, setCurrentPage] = useState(0); // Paginación
  const [totalPages, setTotalPages] = useState(0); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const axios = useAxios();

  // Fetch user's favorite products
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/v1/favorites", {
          params: { page: currentPage, size: pageSize },
        });
        const data = response.data;
        setFavorites(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Error fetching favorites.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [currentPage]);

  const handleRemoveFavorite = async (productId) => {
    try {
      await axios.delete(`/api/v1/favorites/${productId}`);
      setFavorites(favorites.filter((product) => product.id !== productId)); // Remove product from UI
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <div className={styles.favListContainer}>
      <h2 className={styles.title}>Mis Favoritos</h2>

      {loading && <p>Cargando favoritos...</p>}
      {error && <p>{error}</p>}

      {!loading && !favorites.length && (
        <p className={styles.noFavorites}>No tienes productos favoritos.</p>
      )}

      <div className={styles.products}>
        {favorites.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleCardClick(product.id)}
          >
            <HeartButton
              className={styles.heart}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFavorite(product.id);
              }}
            />
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.details}>
              <h3>{product.name}</h3>
              <p>{`Precio: ${product.price} COP`}</p>
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
