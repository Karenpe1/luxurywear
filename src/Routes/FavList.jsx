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
    const [reload,setReload]= useState(false);

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
            setFavorites(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (err) {
            setError("Error al obtener los favoritos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [currentPage,reload]);


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
                    <div
                        key={product.productId}
                        className={styles.productCard}
                        onClick={() => console.log(`Navigating to product ${product.productId}`)} // Aquí puedes agregar navegación
                    >
                        <HeartButton
                            className={styles.heart}
                            id={product.productId}
                            onToggle={() => setReload((prev) => !prev)}

                        />
                        <img
                            src={`http://localhost:8080${product.images[0].url}`}
                            alt={product.name}
                            className={styles.productImage}
                            onError={(e) => {
                                const fallback1 = `http://localhost:8080/${product.images[0].url}`; // First fallback image
                                const fallback2 = `http://localhost:8080/public${product.images[0].url}`; // Second fallback image
                                const fallback3 = "placeholder.svg"; // Second fallback image

                                if (e.target.src === `http://localhost:8080${product.images[0].url}`) {
                                    e.target.src = fallback1; // Switch to the first fallback
                                } else if (e.target.src === fallback1) {
                                    e.target.src = fallback2; // Switch to the second fallback
                                } else if (e.target.src === fallback2) {
                                    e.target.src = fallback3; // Switch to the third fallback
                                } else {
                                    e.target.onerror = null; // Prevent infinite fallback loop
                                }
                            }}
                        />
                        <div className={styles.contenedor}>
                            <h2>{product.name}</h2>
                            <p>Precio: ${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>


            <div className={styles.paginationContainer}>
                <Pagination
                    currentPage={currentPage}
                    totalPage={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default FavList;
