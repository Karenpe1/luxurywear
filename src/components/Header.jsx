import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import logo from "../Images/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <a href="/" className={styles.logoLink}>
          <img src={logo} alt="App Logo" className={styles.logo} />
        </a>
      </div>
      <div
        className={`${styles.rightSection} ${
          isMenuOpen ? styles.showMenu : ""
        }`}
      >
        {isMobile ? (
          <>
            <a href="/register" className={styles.navButton}>
              <i className="fas fa-user-plus"></i> Crear cuenta{" "}
              <span className={styles.arrow}>&gt;</span>
            </a>
            <a href="/login" className={styles.navButton}>
              <i className="fas fa-sign-in-alt"></i> Iniciar sesión{" "}
              <span className={styles.arrow}>&gt;</span>
            </a>
          </>
        ) : (
          <>
            <Link to={"/register"} style={{textDecoration:"none"}}>
              <button className={styles.navButton}>
                <i className="fas fa-user-plus"></i> Crear cuenta
              </button>
            </Link>
            <button className={styles.navButton}>
              <i className="fas fa-sign-in-alt"></i> Iniciar sesión
            </button>
          </>
        )}
      </div>
      <div className={styles.hamburgerMenu} onClick={toggleMenu}>
        {}
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
