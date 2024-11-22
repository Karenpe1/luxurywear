import React from 'react'
import Button from './Button'
import StyleModal from "../styles/modal.module.css";

const Modal = ({titulo, subtitulo, mensaje,img,onClose}) => {
  
  return (
    <div className={StyleModal.contenedor}>
        <img src={img} alt={""}/>
        <h2 className={StyleModal.titulo}>{titulo}</h2>
        <h2 className={StyleModal.subtitulo}>{subtitulo}</h2>
        <p className={StyleModal.mensaje}>{mensaje}</p>
        <Button onClick={(e) => {
            e.stopPropagation(); // Detiene la propagación del clic hacia el fondo
            onClose();}}>Continuar</Button>
    </div>
  )
}

export default Modal