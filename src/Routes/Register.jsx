import React, { useState } from "react";
import StyleRegistro from "../styles/registro.module.css";
import logo from "../Images/Logo.png";
import { useNavigate } from "react-router-dom";

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
  const navigate= useNavigate();
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
  const handdleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    if (!noNumbersRegex.test(user.nombre) || user.nombre.trim().length < 4) {
      errors.nombre = "El nombre debe ser válido y tener al menos 3 caracteres";
      formIsValid = false;
    }
    if (!noNumbersRegex.test(user.apellido) || user.apellido.trim().length < 4) {
      errors.apellido = "El apellido debe ser válido y tener al menos 3 caracteres";
      formIsValid = false;
    }
    if (!emailRegex.test(user.correo)) {
      errors.correo = "El correo debe ser válido";
      formIsValid = false;
    }
    if (user.contraseña.length < 6) {
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
  
      realizarRegister(settings);
      e.target.reset();
    }
  };

  function realizarRegister(settings) {
    fetch(url, settings)
      .then((respuesta) =>respuesta.json())
      .then((data) => {
        console.log(data);
        navigate("/")
        alert('Usuario creado con exito')
      })
      .catch((err) => console.log(err));
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
            <label className={StyleRegistro.label}>Nombre</label>
            <input
              className={StyleRegistro.input}
              placeholder="Ingresa tu nombre"
              type="text"
              value={user.nombre}
              onChange={handleNombre}
            />
            {error.nombre && <p className={StyleRegistro.error}>{error.nombre}</p>}


            <label className={StyleRegistro.label}>Apellido</label>
            <input
              className={StyleRegistro.input}
              placeholder="ingresa tus apellidos"
              type="text"
              value={user.apellido}
              onChange={handleApellido}
            />
            {error.apellido && <p className={StyleRegistro.error}>{error.apellido}</p>}

            
            <label className={StyleRegistro.label}>Correo Electronico</label>
            <input
              className={StyleRegistro.input}
              placeholder="ingresa tu correo electronico"
              type="email"
              value={user.correo}
              onChange={handleCorreo}
            />
            {error.correo && <p className={StyleRegistro.error}>{error.correo}</p>}


            
            <label className={StyleRegistro.label}>Contraseña</label>
            <input
              className={StyleRegistro.input}
              placeholder="ingresa tu contraseña"
              type="password"
              value={user.contraseña}
              onChange={handleContraseña}
            />
            {error.contraseña && <p className={StyleRegistro.error}>{error.contraseña}</p>}


            <label className={StyleRegistro.label}>Repetir contraseña</label>
            <input
              className={StyleRegistro.input}
              placeholder="ingresa nuevamente la contraseña"
              type="password"
              value={user.contraseñaRepetida}
              onChange={handleRepetida}
            />
            {error.contraseñaRepetida && <p className={StyleRegistro.error}>{error.contraseñaRepetida}</p>}


            <button className={StyleRegistro.botonRegistro}>Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
