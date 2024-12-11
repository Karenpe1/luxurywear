import styles from "../styles/CarouselUpdate.module.css";
import ProductImage from "./ProductImage.jsx";

const CarouselImageUpdate = ({ images, onDelete }) => {
  return (
    <ul className={styles.carousel}>
      {images.map((image, index) => (
        <li key={index} className={styles.carouselItem}>
          <ProductImage
            src={image.url ? `${image.url}` : "../../public/loading.gif"}
            alt={`Imagen ${image.imageId || index + 1}`}
            className={styles.image}
          />
          <button
            type="button"
            className={styles.deleteButton}
            onClick={(e) => {e.stopPropagation(); onDelete(image.imageId)}}
            aria-label={`Eliminar imagen ${index + 1}`}
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CarouselImageUpdate;

