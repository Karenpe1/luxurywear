import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginStyles from "../styles/Login.module.css";
import logo from '../Images/Logo.png';




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      {/* Comprobar funcion con endpoint */}
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
        setError("Credenciales incorrectas. Intente nuevamente.");
      }
    } catch (error) {
      setError("Hubo un problema al iniciar sesión.");
    }
  };

  return (
    <div className={loginStyles.loginWrapper}>
      <div className={loginStyles.leftSide}>
      <img src={logo} alt="Logo" className={loginStyles.logo} />
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
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className={loginStyles.errorMessage}>{error}</p>}
            <button type="submit" className={loginStyles.loginButton}>Iniciar sesión</button>
          </form>
          <p className={loginStyles.signupText}>
            ¿No tienes cuenta? Regístrate aquí 
          </p> {/* Falta el link a signup */}
        </div>
      </div>
    </div>
  );
}

export default Login;
