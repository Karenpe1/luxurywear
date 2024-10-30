import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/PaginatedProductList.module.css";
import { formatCurrency } from '../Utils/currencyFormatter';

const baseUrl = "http://localhost:8080"; // Define the base URL

const PaginatedProductList = () => {
    const [products, setProducts] = useState([]); // Stores product data
    const [currentPage, setCurrentPage] = useState(0); // Tracks current page
    const [totalPages, setTotalPages] = useState(0); // Tracks total pages
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const navigate = useNavigate();

    // Fetch products for the current page
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset error

            try {
                const response = await fetch(`${baseUrl}/api/v1/products/page/${currentPage}`);
                const data = await response.json();

                setProducts(data.content); // Set product data
                setTotalPages(data.totalPages); // Set total pages from response
            } catch (err) {
                setError("Error fetching products"); // Set error if request fails
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handleCardClick = (productId) => {
        navigate(`/detail/${productId}`); // Navigate to the detail page with productId
    };

    // Handle pagination
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div className={styles.productListContainer}>
            <h2 className={styles.titulo} >Productos</h2>
            
            {/* Loading and Error states */}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {/* Display Products */}
            <div className={styles.products}>
                {products.map(product => (
                    <div
                        key={product.productId}
                        className={styles.productCard}
                        onClick={() => handleCardClick(product.productId)}
                    >
                        <img
                            src={`/${product.images[0].url}`}
                            alt={product.name}
                            className={styles.productImage}
                        />
                        <h2>{product.name}</h2>
                        <p><strong>Alquiler: </strong>{formatCurrency(product.price, 'es-CO', 'COP')}</p>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className={styles.pagination}>
                <button className={styles.boton} onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Anterior
                </button>
                <span>Página {currentPage + 1} de {totalPages}</span>
                <button className={styles.boton} onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default PaginatedProductList;