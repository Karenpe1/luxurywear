import React, { useState } from "react";
import styles from "../styles/multiselector.module.css"; // Archivo CSS

const MultiSelector = ({ options, placeholder, onChange , multiselector,error,label}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selected, setSelected] = useState("");


  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (value) => {
    const updatedSelected = selectedOptions.includes(value)
      ? selectedOptions.filter((opt) => opt !== value)  //Si ya está seleccionado, lo elimina
      : [...selectedOptions, value]; // Si no está seleccionado, lo agrega

    setSelectedOptions(updatedSelected);
    onChange(updatedSelected); // Notifica al componente padre
  };
  const handleOptionClick = (option) => {
    setSelected(option.label);
    setIsOpen(false);
    if (onChange) onChange({value:option.value});
  };

  return (
    <div>
       <h4 className={styles.title}>{label}</h4>
       <div className={`${multiselector? styles.containerMulti : styles.container}`}>
        <div
          className={styles.dropdownHeader}
          onClick={handleToggleDropdown}
          tabIndex={0}
        >
          <span className={styles.interTitle}>{selected || placeholder || "Selecciona una opción"}</span>
          <span className={`${styles.icon} ${isOpen ? styles.open : ""}`} />
        </div>
        {isOpen && (
          multiselector? (
            <div className={styles.dropdownBody}>
              {options.map((opt) => (
                <label key={opt.value} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(opt.value)}
                    onChange={() => handleOptionChange(opt.value)}
                  />
                  {opt.icon && <span className={styles.icon}>{opt.icon}</span>}
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          ):(<ul className={styles.dropdownBody}>
            {options.map((option, index) => (
              <li
                key={index}
                className={styles.option}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>)
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default MultiSelector;