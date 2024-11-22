import styles from '../styles/Card.module.css'; 

const Card = ({ name, image }) => {
    return (
        <div className={styles.card}>
            <img
              src={`http://localhost:8080${image}`}
              alt={name}
              className={styles.cardImage}
              onError={(e) => {
                const fallback1 = `http://localhost:8080/${image}`; // First fallback image
                const fallback2 = `http://localhost:8080/public${image}`; // Second fallback image
                const fallback3 = "placeholder.svg"; // Third fallback image

                if (e.target.src === `http://localhost:8080${image}`) {
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
        </div>
    );
};

export default Card;