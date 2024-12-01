import React from 'react'
import styles from "../styles/wappButton.module.css"

const WappButton = () => {
 
  return (
    <div className={styles.whatsappFloating}>
      <a
        href="https://wa.me/521234567890" // Reemplazar numero
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/public/whastapp.png" 
          alt="WhatsApp"
        />
      </a>
    </div>
  );
};

export default WappButton
