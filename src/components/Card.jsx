import styles from '../styles/Card.module.css'; 

const Card = ({ name, image }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.cardImage} />            
        </div>
    );
};

export default Card;