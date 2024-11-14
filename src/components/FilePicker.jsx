import React, { useState } from "react";
import StyleFile from "../styles/filePicker.module.css";

const FilePicker = ({ label, type, accept, onChange, error, archivos}) => {
    const [fileError, setFileError] =useState("")
    const handleFileChange=(e)=>{
        const files= e.target.files;
        if(archivos === 1){
            if (files.length < 1) {
                setFileError("Por favor selecciona al menos un archivo.");
              } else if (files.length > 1) {
                setFileError("No puedes seleccionar más de un archivo.");
              } else {
                setFileError("");
                onChange(files); // Pasa los archivos si están en el rango permitido
              }
        }else{
            if (files.length < 1) {
                setFileError("Por favor selecciona al menos un archivo.");
              } else if (files.length > 5) {
                setFileError("No puedes seleccionar más de cinco archivos.");
              } else {
                setFileError("");
                onChange(files); // Pasa los archivos si están en el rango permitido
              }
        }
    }
  return (
    <>
      <label className={StyleFile.label}>{label}</label>
      <input className={StyleFile.archivo} type={type} multiple accept={accept} onChange={handleFileChange} />
      {(fileError || error) && (
        <span className={StyleFile.error}>{fileError || error }</span>
      )}
    </>
  );
};

export default FilePicker;
