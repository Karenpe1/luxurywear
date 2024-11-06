import { useState } from "react";
import StyleRegistro from "../styles/registro.module.css";
import logo from "../Images/Logo.png";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const Register = () => {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    contraseñaRepetida: "",
  });
  const [error, setError] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    contraseñaRepetida: "",
  });
  const navigate = useNavigate();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const noNumbersRegex = /^[^\d]*$/;
  const url = "http://localhost:8080/auth/register";

  const handleNombre = (e) => {
    setUser({ ...user, nombre: e.target.value });
    setError({ ...error, nombre: "" }); // Limpiar el error al cambiar el valor
  };
  const handleApellido = (e) => {
    setUser({ ...user, apellido: e.target.value });
    setError({ ...error, apellido: "" });
  };
  const handleCorreo = (e) => {
    setUser({ ...user, correo: e.target.value });
    setError({ ...error, correo: "" });
  };
  const handleContraseña = (e) => {
    setUser({ ...user, contraseña: e.target.value });
    setError({ ...error, contraseña: "" });
  };
  const handleRepetida = (e) => {
    setUser({ ...user, contraseñaRepetida: e.target.value });
    setError({ ...error, contraseñaRepetida: "" });
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    if (!noNumbersRegex.test(user.nombre) || user.nombre.trim().length < 4) {
      errors.nombre = "El nombre debe ser válido y tener al menos 3 caracteres";
      formIsValid = false;
    }
    if (
      !noNumbersRegex.test(user.apellido) ||
      user.apellido.trim().length < 4
    ) {
      errors.apellido =
        "El apellido debe ser válido y tener al menos 3 caracteres";
      formIsValid = false;
    }
    if (!emailRegex.test(user.correo)) {
      errors.correo = "El correo debe ser válido";
      formIsValid = false;
    }
    if (user.contraseña.length < 7) {
      errors.contraseña = "La contraseña debe tener más de 6 caracteres";
      formIsValid = false;
    }
    if (user.contraseñaRepetida !== user.contraseña) {
      errors.contraseñaRepetida = "Las contraseñas no coinciden";
      formIsValid = false;
    }
    setError(errors);

    if (formIsValid) {
      const body = {
        first_name: user.nombre.trim().toLowerCase(),
        last_name: user.apellido.trim().toLocaleLowerCase(),
        email: user.correo,
        password: user.contraseña,
      };

      const settings = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        await realizarRegister(settings);
        e.target.reset();
      } catch (err) {
        console.error("Error during form submission:", err);
      }
    }
  };

  async function realizarRegister(settings) {
    try {
      const response = await fetch(url, settings);
  
      // Handle non-201 status codes
      if (response.status !== 201) {
        const errorMessages = {
          409: "Ya hay un usuario creado con ese correo electrónico.",
          400: "Solicitud inválida. Por favor, verifica los datos ingresados.",
          500: "Error del servidor. Por favor, intenta más tarde.",
        };
  
        const message = errorMessages[response.status] || `Ocurrió un error inesperado (Código: ${response.status}).`;
  
        alert(message);
        console.error(`Error: ${message}`);
        return; // Stop further processing
      }
  
      // Parse the successful response
      const data = await response.json();
      console.log(data);
      alert("Usuario creado con éxito");
      navigate("/"); // todo to be changed to `/login`
    } catch (err) {
      // Handle network or other fetch errors
      console.error("Error al realizar el registro:", err);
      alert(
        "Hubo un problema al registrar el usuario. Por favor, verifica tu conexión e intenta nuevamente."
      );
    }
  }

  return (
    <div className={StyleRegistro.container}>
      <div className={StyleRegistro.containerFoto}>
        <div className={StyleRegistro.containerFiltro}>
          <img src={logo} alt="app logo" className={StyleRegistro.img} />
        </div>
      </div>
      <div className={StyleRegistro.contenedorForm}>
        <div className={StyleRegistro.formulario}>
          <h2>Registro de cuenta</h2>
          <form onSubmit={handdleSubmit} className={StyleRegistro.registro}>

            <Input
              label="Nombre"
              placeholder="Ingresa tu nombre"
              type="text"
              value={user.nombre}
              onChange={handleNombre}
              error={error.nombre}
            />


            <Input
              label="Apellido"
              placeholder="Ingresa tu Apellido"
              type="text"
              value={user.apellido}
              onChange={handleApellido}
              error={error.apellido}
            />


            <Input
              label="Correo Eléctronico"
              placeholder="Ingresa tu correo electronico"
              type="email"
              value={user.correo}
              onChange={handleCorreo}
              error={error.correo}
            />


            <Input
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              value={user.contraseña}
              onChange={handleContraseña}
              error={error.contraseña}
            />

            <Input
              label="Repetir Contraseña"
              placeholder="Ingresa nuevamente tu contraseña"
              type="password"
              value={user.contraseñaRepetida}
              onChange={handleRepetida}
              error={error.contraseñaRepetida}
            />

            <button className={StyleRegistro.botonRegistro}>Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
