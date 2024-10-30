import footerStyles from '../styles/Footer.module.css';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.leftSection}>
        <p>&copy; {currentYear} Luxury Wear. Todos los derechos reservados.</p>
      </div>
      <div className={footerStyles.socialSection}>
        <FaFacebookSquare className={footerStyles.icon} />
        <FaInstagram className={footerStyles.icon} />
      </div>
      <div className={footerStyles.contactSection}>
        <p><strong>Correo electrónico:</strong> contacto@luxurywear.com</p>
        <p><strong>Teléfono:</strong> +52 123 456 7890</p>
      </div>
    </footer>
  );
};

export default Footer;