import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Card.module.css'; 

const Card = ({ id, name, imageUrl }) => {
    return (
        <div className={styles.card}>
            <img src={imageUrl} alt={name} className={styles.cardImage} />
            <Link to={`/detail/${id}`}>
                <p>Id: {id}</p>
                <p>{name}</p>
            </Link>
        </div>
    );
};

export default Card;