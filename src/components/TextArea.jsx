import React from "react";
import StyleText from "../styles/textArea.module.css";

const TextArea = ({ name, id, label, placeholder, value, onchange }) => {
  return (
    <>
      <label className={StyleText.label} For={id}>{label}</label>
      <textarea
      className={StyleText.area}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e)=> onchange(e)}
      ></textarea>
    </>
  );
};

export default TextArea;
