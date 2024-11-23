import React, { useState } from "react";
import StyleFile from "../styles/filePicker.module.css";

const FilePicker = ({ label, type, accept, onChange, error, archivos }) => {
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState(
    "No se ha seleccionado ningun archivo "
  );

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (archivos === 1) {
      if (files.length < 1) {
        setFileError("Por favor selecciona al menos un archivo.");
      } else if (files.length > 1) {
        setFileError("No puedes seleccionar más de un archivo.");
      } else {
        setFileError("");
        setFileName(files[0].name); //nombre de archivo seleccionado
        onChange(e); // Pasa los archivos si están en el rango permitido
      }
    } else {
      if (files.length < 1) {
        setFileError("Por favor selecciona al menos un archivo.");
      } else if (files.length > 5) {
        setFileError("No puedes seleccionar más de cinco archivos.");
      } else {
        setFileName(`${files.length} archivo(s) seleccionado(s)`); //nombre de archivo seleccionado
        setFileError("");
        onChange(e); // Pasa los archivos si están en el rango permitido
      }
    }
  };
  return (
    <div className={StyleFile.filePickerContainer}>
      <label className={StyleFile.labelFile}>{label}</label>
      <div className={StyleFile.filePikerWrapper}>
        <label className={StyleFile.customButton}>
          Cargar Imágenes
          <input
            className={StyleFile.hiddenInput}
            type={type}
            multiple
            accept={accept}
            onChange={handleFileChange}
          />
        </label>
        <span className={StyleFile.fileName}>{fileName}</span>
      </div>
      {(fileError || error) && (
        <div className={StyleFile.error}>{fileError || error}</div>
      )}
    </div>
  );
};

export default FilePicker;
