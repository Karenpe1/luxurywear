import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener el detalle del producto
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className={styles.detailContainer}>
      <Link to="/" className={styles.backButton}>←</Link> {/* Flecha para volver atrás */}
      <h1>Detalles del Producto</h1>
      <h1 className={styles.title}>{product.name}</h1>
      <img src={product.images[0].url} alt={product.name} className={styles.productImage} />
      <p>{product.description}</p>
      <p>Material: {product.material}</p>
      <p>Color: {product.color}</p>
      <p>Diseñador: {product.designer}</p>
      <p>Precio de Alquiler: ${product.rental_price}</p>
    </div>
  );
};

export default Detail;
