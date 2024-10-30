import footerStyles from '../styles/Footer.module.css';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.leftSection}>
        <p>&copy; {currentYear} Luxury Wear. Todos los derechos reservados.</p>
      </div>
      <div className={footerStyles.socialSection}>
        <FaFacebookSquare className={footerStyles.icon} aria-label='facebook-icon'/>
        <Link a to={"/admin"}>
          <FaInstagram className={footerStyles.icon} aria-label='instagram-icon'/>
        </Link>
      </div>
      <div className={footerStyles.contactSection}>
        <p><strong>Correo electrónico:</strong> contacto@luxurywear.com</p>
        <p><strong>Teléfono:</strong> +52 123 456 7890</p>
      </div>
    </footer>
  );
};

export default Footer;