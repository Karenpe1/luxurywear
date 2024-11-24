import React from "react";
import styles from "../styles/NewAdmin.module.css";

const ModalConfirm = ({title,onClick, onClick2,label1, label2}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{title}</h3>
        <button onClick={onClick} className={styles.confirmButton}>
          Confirmar
        </button>
        <button
          onClick={onClick2}
          className={styles.cancelButton}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalConfirm;
