import StyleButton from "../styles/button.module.css";

const Button = (props) => {
    return <button className={StyleButton.botonRegistro}  onClick={props.onClick}>{props.children}</button>;
};

export default Button;
  
