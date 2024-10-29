import { useEffect, useState } from 'react';
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
        setProduct(data.data);
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
        <Link to="/" className={styles.backButton}>←</Link>
      </header>
      
      <div className={styles.content}>
        <img src={product.images[0].url} alt={product.name} className={styles.productImage} />
        <div className={styles.productInfo}>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>Alquiler: <span>${product.price}</span></p>
          <hr className={styles.divider} />
          <p><strong>Material:</strong> {product.material}</p>
          <p><strong>Diseñador:</strong> {product.designer}</p>
          <p><strong>Color:</strong> {product.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
