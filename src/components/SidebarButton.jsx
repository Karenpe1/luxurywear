import styles from "../styles/SidebarButton.module.css";

const SidebarButton = ({icon, title}) => {
  return (
    <div className={styles.container}>
        <img src={icon} className={styles.icon}/>
        <span>{title}</span>
        <img src="chevronUp.svg" className={styles.chevronUp}/>
    </div>
  )
}

export default SidebarButton;