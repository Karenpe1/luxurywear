import React from 'react'
import Button from './Button'
import StyleModal from "../styles/modal.module.css";

const Modal = ({titulo, subtitulo, mensaje,img,onClose,boton2,onClose2,label}) => {
  
  return (
    <div className={StyleModal.contenedor}>
        <img src={img} alt={""}/>
        <h2 className={StyleModal.titulo}>{titulo}</h2>
        <h2 className={StyleModal.subtitulo}>{subtitulo}</h2>
        <p className={StyleModal.mensaje}>{mensaje}</p>
        {label &&(
          <Button onClick={(e) => {
              e.stopPropagation(); // Detiene la propagación del clic hacia el fondo
              onClose();}}>{label}</Button>
        )}
        {boton2 && (
          <Button onClick={(e)=>{
            e.stopPropagation();
            onClose2();}}> {boton2} </Button>
        )}
    </div>
  )
}

export default Modal