import React from "react";
import StyleText from "../styles/textArea.module.css";

const TextArea = ({ id, label, placeholder, value, onchange }) => {
  return (
    <>
      <label className={StyleText.label} For={id}>{label}</label>
      <textarea
      className={StyleText.area}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      ></textarea>
    </>
  );
};

export default TextArea;
