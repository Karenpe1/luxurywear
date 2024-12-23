import styles from "../styles/PaginatedProductList.module.css";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HeartButton from "./HeartButton";
import { formatCurrency } from "../Utils/currencyFormatter";
import ProductImage from "./ProductImage.jsx";

const CardProduct = React.memo(({ products, onToggle }) => {
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (productId) => {
      navigate(`/detail/${productId}`);
    },
    [navigate] // Navigate to the detail page with productId
  );

  return (
    <div className={styles.products}>
      {products.map((product) => (
        <div
          key={product.productId}
          className={styles.productCard}
          onClick={() => handleCardClick(product.productId)}
        >
          <HeartButton id={product.productId} onToggle={onToggle} />
          <ProductImage
            src={`${product.images[0].url}`}
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
  );
});

export default CardProduct;
