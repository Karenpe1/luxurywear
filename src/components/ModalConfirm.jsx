import React from "react";
import styles from "../styles/NewAdmin.module.css";

const ModalConfirm = ({title,onClick, onClick2,label1, label2}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{title}</h3>
        <button onClick={onClick} className={styles.confirmButton}>
          {"Confirmar" || label1}
        </button>
        <button
          onClick={onClick2}
          className={styles.cancelButton}
        >
          {"Cancelar" || label2}
        </button>
      </div>
    </div>
  );
};

export default ModalConfirm;
