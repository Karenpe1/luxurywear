import StyleInputs from "../styles/inputs.module.css";

const Input = ({ label, placeholder, type, name, value, onChange, error }) => {
  return (
    <>
      <label className={StyleInputs.label}>{label}</label>
      <input
        className={StyleInputs.input}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p className={StyleInputs.error}>{error}</p>}
    </>
  );
};

export default Input;
