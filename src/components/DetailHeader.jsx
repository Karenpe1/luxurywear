import { Link } from 'react-router-dom';
import styles from '../styles//DetailHeader.module.css';
import backButton from "../Images/backArrow.png";

const DetailHeader = ({ title }) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <Link to="/" className={styles.backButton}>
                <img src={backButton} alt="Back" />
            </Link>
        </header>
    );
};

export default DetailHeader;
