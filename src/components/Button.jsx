import StyleButton from "../styles/button.module.css";

const Button = (props) => {
  return (
    <button
      className={StyleButton.botonRegistro}
      onClick={props.disabled ? undefined : props.onClick} // Prevent click when disabled
    >
      {props.children}
    </button>
  );
};

export default Button;
