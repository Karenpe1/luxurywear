import StyleInputs from "../styles/inputs.module.css";

const Input = ({id, label, placeholder, type, name, value, onChange, error, minlength }) => {
  return (
    <>
      <label for={id} className={StyleInputs.label}>{label}</label>
      <input
        id={id}
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
