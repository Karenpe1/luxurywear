import { useState, useContext } from "react";
import styles from "../styles/Header.module.css";
import logo from "../Images/Logo.png";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  const currentPath = location.pathname;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="App Logo" className={styles.logo} />
        </Link>
      </div>

      {/* Right Section */}
      <div className={`${styles.rightSection} ${isMenuOpen ? styles.showMenu : ""}`}>
        {user ? (
          <>
            {( user.role === "ADMIN" && currentPath !== "/admin" ) && (
              <Link to="/admin" className={styles.navButton}>
                <i className="fas fa-user-shield"></i> Panel Administrador
              </Link>
            )}
            {/* Aqui deberia ir el avatar */}
            <button onClick={logoutUser} className={styles.navButton}>
              <i className="fas fa-sign-out-alt"></i> Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className={styles.navButton}>
              <i className="fas fa-user-plus"></i> Crear cuenta
            </Link>
            <Link to="/login" className={styles.navButton}>
              <i className="fas fa-sign-in-alt"></i> Iniciar sesión
            </Link>
          </>
        )}
      </div>

      {/* Hamburger Menu */}
      <div className={styles.hamburgerMenu} onClick={toggleMenu}>
        {isMenuOpen ? (
          <span className={styles.closeIcon}>✕</span>
        ) : (
          <>
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
