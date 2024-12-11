import styles from '../styles/Card.module.css';
import ProductImage from "./ProductImage.jsx";

const Card = ({ name, image }) => {
    return (
        <div className={styles.card}>
          <ProductImage
            src={`${image}`}
            alt={name}
            className={styles.cardImage}
          />
        </div>
    );
};

export default Card;