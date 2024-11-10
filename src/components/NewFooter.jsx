import footerStyles from '../styles/NewFooter.module.css';
import twitterIcon from '/twitter.png'
import facebookIcon from '/facebook.png'
import instagramIcon from '/instagram.png'

const NewFooter = () => {

  const currentYear = new Date().getFullYear();
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.containerInfo}>
          <span className={footerStyles.spanNosotros}><strong>Nosotros</strong></span>
          <span className={footerStyles.span}><strong>Contactenos</strong></span>
          <span className={footerStyles.span}><strong>Sostenibilidad</strong></span>
        </div>
        <div className={footerStyles.containerSocialDatos}>
          <div className={footerStyles.social}>
            <img className={footerStyles.socialDos} src={twitterIcon} alt="twitter" />
            <img className={footerStyles.socialDos} src={facebookIcon} alt="facebook" />
            <img className={footerStyles.socialDos} src={instagramIcon} alt="instagram" />
          </div>
          <div className={footerStyles.containerDatos}>
            <span><strong>Correo electrónico:</strong> contacto@luxurywear.com</span>
            <span><strong>Teléfono:</strong> +52 123 456 7890</span>
          </div>
        </div>
      </div>
      <div className={footerStyles.year}>
        <span>&copy; {currentYear} Luxury Wear. Todos los derechos reservados.</span>
      </div>
    </footer>
  )
}

export default NewFooter;