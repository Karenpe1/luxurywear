import styles from "../styles/NewHeader.module.css";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NewHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  const currentPath = location.pathname;

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.menuHeader}>
            <img className={styles.logo} src="logo.png" alt="App Logo" />
            <img src="cerrar.png" alt="Close Menu" onClick={handleHamburger} />
          </div>
        </div>
      )}
      <img className={styles.logo} src="logo.png" alt="App Logo" />

      <div className={styles.links}>
        <span>Nosotros</span>
        <span>Sostenibilidad</span>
        <span>Contacto</span>
      </div>

      <div className={styles.buttons}>
        {user ? (
          <>
            {user.role === "ADMIN" && currentPath !== "/admin" && (
              <Link to="/admin">
                <button className={styles.button}>Panel Administrador</button>
              </Link>
            )}
            <button className={styles.button} onClick={logoutUser}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className={styles.button}>Crear Cuenta</button>
            </Link>
            <Link to="/login">
              <button className={styles.button}>Iniciar Sesión</button>
            </Link>
          </>
        )}
      </div>

      <img
        className={styles.hamburger}
        src="menu.png"
        alt="Menu"
        onClick={handleHamburger}
      />
    </div>
  );
};

export default NewHeader;
