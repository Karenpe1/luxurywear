import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/Detail.module.css';
import backButton from '../Images/backArrow.png';
import { formatCurrency } from '../Utils/currencyFormatter';


const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(''); // Estado para la imagen principal

  useEffect(() => {
    // Llamada a la API para obtener el detalle del producto
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]?.url ?? 'placeholder.svg'); // Establece la primera imagen como principal
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className={styles.detailContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>{product.name}</h1>
        <Link to="/" className={styles.backButton}> <img src={backButton} alt="Back" /></Link>
      </header>

      <div className={styles.content}>
        {/* Imagen principal */}
        <img src={`/${mainImage}`} alt={product.name} className={styles.productImage} />
        <div className={styles.gallery}>
          {/* Galería de miniaturas */}
          {product.images.map((img, index) => (
            <img
              key={index}
              src={`/${img.url}`}
              alt={`${product.name} thumbnail ${index + 1}`}
              className={styles.thumbnail}
              onClick={() => setMainImage(img.url)} // Cambia la imagen principal
            />
          ))}
        </div>
        <div className={styles.productInfo}>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>Alquiler: <span>{formatCurrency(product.price, 'es-CO', 'COP')}</span></p>
          <hr className={styles.divider} />
          <div className={styles.productDetails}>
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Diseñador:</strong> {product.designer}</p>
            <p><strong>Color:</strong> {product.color}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
