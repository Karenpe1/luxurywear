import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Card.module.css'; 

const Card = ({ id, name, image, price }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.cardImage} />
            <Link to={`/detail/${id}`} className={styles.cardLink}>
            <p className={styles.cardTitle}>{name}</p>
            </Link>
            <p className={styles.cardPrice}>Alquiler: ${price}</p>
        </div>
    );
};

export default Card;