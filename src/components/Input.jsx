import StyleInputs from "../styles/inputs.module.css";

const Input = ({id, label, placeholder, type, name, value, onChange, error ,className,}) => {
  return (
    <div>
      <label htmlFor={id} className={StyleInputs.label}>{label}</label>
      <input
        id={id}
        className={`${StyleInputs.input} ${className || ""}`.trim() }
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p className={StyleInputs.error}>{error}</p>}
    </div>
  );
};

export default Input;
