import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginStyles from "../styles/Login.module.css";
import logo from '../Images/Logo.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const navigate = useNavigate();
  
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    // Validación de correo
    if (!emailRegex.test(email)) {
      errors.email = "Ingresa un correo válido.";
      formIsValid = false;
    }

    // Validación de contraseña
    if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
      formIsValid = false;
    }

    setError(errors);

    if (formIsValid) {
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/"); // Redirige al inicio después de iniciar sesión
        } else {
          setError({ ...errors, general: "Credenciales incorrectas. Intente nuevamente." });
        }
      } catch (error) {
        setError({ ...errors, general: "Hubo un problema al iniciar sesión." });
      }
    }
  };

  return (
    <div className={loginStyles.loginWrapper}>
      <div className={loginStyles.leftSide}>
        <a href="/" ><img src={logo} alt="Logo" className={loginStyles.logo} /></a>
      </div>
      <div className={loginStyles.rightSide}>
        <div className={loginStyles.loginContainer}>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <label>
              Correo electrónico
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {error.email && <p className={loginStyles.errorMessage}>{error.email}</p>}
            
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error.password && <p className={loginStyles.errorMessage}>{error.password}</p>}
            
            {error.general && <p className={loginStyles.errorMessage}>{error.general}</p>}
            <button type="submit" className={loginStyles.loginButton}>Iniciar sesión</button>
          </form>
          <p className={loginStyles.signupText}>
            ¿No tienes cuenta? <a href="/register" className={loginStyles.signupLink}>Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

