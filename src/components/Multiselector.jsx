import React, { useEffect, useState } from "react";
import styles from "../styles/multiselector.module.css"; // Archivo CSS

const MultiSelector = ({ options, placeholder, onChange , multiselector,error,label, preselected}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  // Prellenar valores iniciales en caso de editar
  useEffect   (() => {
    if (preselected) {
      if (multiselector) {
        setSelectedOptions(preselected); // Para múltiples selecciones
      } else {
        const selectedOption = options.find((opt) => opt.value === preselected.value);  
        setSelectedValue(selectedOption ? selectedOption.label : "");
        console.log("seleccionado previo", selectedValue)
      }
    }
  }, [preselected, options, multiselector]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (value) => {
    // Manejo de selección múltiple
    const updatedSelected = selectedOptions.includes(value)
      ? selectedOptions.filter((opt) => opt !== value)  //Si ya está seleccionado, lo elimina
      : [...selectedOptions, value]; // Si no está seleccionado, lo agrega

    setSelectedOptions(updatedSelected);
    onChange(updatedSelected); // Notifica al componente padre
  };
  const handleOptionClick = (option) => {
    // Manejo de selección única
    setSelectedValue(option.label);
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
          <span className={`${styles.interTitle} ${
              multiselector
                ? selectedOptions.length > 0
                  ? styles.hasValue
                  : styles.noValue
                : selectedValue
                ? styles.hasValue
                : styles.noValue
            }`}>
          {multiselector
              ? selectedOptions.length > 0
                ? selectedOptions.map(
                    (val) => options.find((opt) => opt.value === val)?.label
                  ).join(", ")
                : placeholder || "Selecciona una opción"
              : selectedValue || placeholder || "Selecciona una opción"}
           </span>
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