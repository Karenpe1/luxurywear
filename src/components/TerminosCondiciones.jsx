import React from "react";
import styles from "../styles/Politicas.module.css";
import Button from "./Button";

const TerminosCondiciones = ({ onAccept}) => {

  return (
        <div className={styles.contenedor}>
          <div className={styles.politicasContainer}>
            <h2 className={styles.title}>Politicas y Condiciones</h2>
            <div className={styles.politica}>
              <strong>Depósito:</strong>
              <li>
                El cliente debe pagar un depósito para apartar el vestido y
                garantizar su devolución en buen estado.
              </li>
            </div>
            <div className={styles.politica}>
              <strong>Entrega:</strong>
              <li>
                El cliente debe entregar el vestido en la fecha y lugar
                acordados. Si se retrasa, se le puede descontar del depósito.
              </li>
            </div>
            <div className={styles.politica}>
              <strong>Condiciones del vestido:</strong>
              <li>
                El cliente debe entregar el vestido en las mismas condiciones en
                que lo recibió, sin modificaciones, desperfectos o lavados.
              </li>
            </div>
            <div className={styles.politica}>
              <strong>Notificación de daños:</strong>
              <li>
                El cliente debe notificar cualquier daño o pérdida del vestido
                de manera oportuna.
              </li>
            </div>
            <div className={styles.politica}>
              <strong>Arreglos:</strong>
              <li>
                El cliente no puede realizar arreglos, ajustes o modificaciones
                en el vestido. Si lo hace, la empresa puede cobrarle el costo de
                reposición.
              </li>
            </div>
            <div className={styles.politica}>
              <strong>Limpieza:</strong>
              <li>
                La empresa se encarga de la limpieza del vestido, por lo que el
                cliente no debe lavarlo.
              </li>
            </div>
            <div className={styles.politica}>
              <strong>Recomendaciones de tiempo: </strong>
              <li>
                Se recomienda realizar el alquiler con al menos una semana de
                anticipación.
              </li>
            </div>
            <Button onClick={onAccept}>Acepto</Button>
          </div>
        </div>
  );
};

export default TerminosCondiciones;
