import styles from "../styles/CarouselUpdate.module.css";

const urlAPI = "http://localhost:8080";

const CarouselImageUpdate = ({ images, onDelete }) => {
  return (
    <ul className={styles.carousel}>
      {images.map((image, index) => (
        <li key={index} className={styles.carouselItem}>
          <img
            src={image.url ? urlAPI + image.url : "../../public/loading.gif"}
            alt={`Imagen ${image.imageId || index + 1}`}
            className={styles.image}
          />
          <button
            className={styles.deleteButton}
            onClick={(e) => {e.stopPropagation(); 
              onDelete(image.imageId)}}
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
