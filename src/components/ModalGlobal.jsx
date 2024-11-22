import React from 'react'
import { useContextGlobal } from "../context/globalContext"
import stylesHeart from "../styles/heart.module.css";
import Modal from './Modal';


const ModalGlobal = () => {
    const {state, dispatch}= useContextGlobal();

    if(!state.modalData.isOpen){
        return null;
    }
    
    
  return (
    <div className={stylesHeart.modalOverlay}>
        <Modal
        img={state.modalData.img}
        titulo={state.modalData.titulo}
        subtitulo={state.modalData.subtitulo}
        mensaje={state.modalData.mensaje}
        onClose={()=>dispatch({type: "HIDE_MODAL"})}
        />
  </div>
  )
}

export default ModalGlobal