import React from 'react'
import { useContextGlobal } from "../context/globalContext"
import stylesHeart from "../styles/heart.module.css";
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';


const ModalGlobal = () => {
    const {state, dispatch}= useContextGlobal();
    const navigate= useNavigate();

    if(!state.modalData.isOpen){
        return null;
    }   

    const handleClose=()=>{
      if(state.modalData.onClose){
        state.modalData.onClose();
      }else{
        dispatch({type: "HIDE_MODAL_GLOBAL"})
      }   
    }
    
  return (
    <div className={stylesHeart.modalOverlay}>
        <Modal
        img={state.modalData.img}
        titulo={state.modalData.titulo}
        subtitulo={state.modalData.subtitulo}
        mensaje={state.modalData.mensaje}
        onClose={handleClose}
        />
  </div>
  )
}

export default ModalGlobal