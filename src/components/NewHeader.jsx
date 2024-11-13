import styles from "../styles/NewHeader.module.css";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import User from "./User";

const NewHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  const currentPath = location.pathname;

  const handleHamburger = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.menuHeader}>
            <a href="/"><img className={styles.logo} src="/logo.png" alt="App Logo" /></a>
            <img src="/cerrar.png" alt="Close Menu" onClick={handleHamburger} />
          </div>
          <div className={`${styles.rightSection} ${isOpen ? styles.showMenu : ""}`}>
            {user ? (
              <>
                {( user.role === "ADMIN" && currentPath !== "/admin" ) && (
                  <Link to="/admin" className={styles.navButton} onClick={handleHamburger}>
                    <i className="fas fa-user-shield"></i> Panel Administrador
                  </Link>
                )}
                {/* Aqui deberia ir el avatar */}
                <div onClick={() => {logoutUser(); handleHamburger();}} className={styles.navButton}>
                  <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                </div>
              </>
            ) : (
              <>
                <Link to="/register" className={styles.navButton} onClick={handleHamburger}>
                  <i className="fas fa-user-plus"></i> Crear cuenta
                </Link>
                <Link to="/login" className={styles.navButton} onClick={handleHamburger}>
                  <i className="fas fa-sign-in-alt"></i> Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <a href="/" onClick={handleHamburger}><img className={styles.logo} src="/logo.png" alt="App Logo" /></a>

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
            <User/>
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
        src="/menu.png"
        alt="Menu"
        onClick={() => setIsOpen(true)}
      />
    </div>
  );
};

export default NewHeader;
