import styles from "../styles/CarouselUpdate.module.css";

const urlAPI = "http://localhost:8080";

const CarouselImageUpdate = ({ images, onDelete }) => {
  return (
    <ul className={styles.carousel}>
      {images.map((image, index) => (
        <li key={index} className={styles.carouselItem}>
          <img
            src={urlAPI + image.url}
            alt={`Imagen ${index + 1}`}
            className={styles.image}
          />
          <button
            className={styles.deleteButton}
            onClick={() => onDelete(index)}
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
