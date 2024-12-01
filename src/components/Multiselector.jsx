import { useEffect, useRef, useState } from "react";
import styles from "../styles/multiselector.module.css"; // Archivo CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTag} from "@fortawesome/free-solid-svg-icons";

const MultiSelector = ({ options, placeholder, onChange , multiselector,error,label, preselected, value}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef(null);

  // Prellenar valores iniciales en caso de editar
  useEffect   (() => {
    if (preselected) {
      if (multiselector) {
        setSelectedOptions(preselected); // Para múltiples selecciones
      } else {
        const selectedOption = options.find((opt) => opt.value === preselected.value);  
        setSelectedValue(selectedOption ? selectedOption.label : "");
        if(selectedOption){
          onChange({value: selectedOption.value})
        }
      }
    }
  }, [preselected, options, multiselector]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Sincronizar con la prop "value"
  useEffect(() => {
    if (value !== undefined) {
      if (multiselector) {
        setSelectedOptions(value); // Actualizar para selección múltiple
      } else {
        const selectedOption = options.find((opt) => opt.value === value);
        setSelectedValue(selectedOption ? selectedOption.label : "");
      }
    }
  }, [value, options, multiselector]);

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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Cierra el dropdown si se hace clic fuera
    }
  };

   // Escuchar eventos globales de clic
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
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
              > {label== "Categorías" && <FontAwesomeIcon icon={faTag} style={{color:"#C3B2FB"}} />}
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