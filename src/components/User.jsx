import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import styles from "../styles/User.module.css";
import axiosInstance from "../Utils/axiosInstance";

const User = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [userInfo, setUserInfo] = useState({first_name: 'User', last_name: 'User'});
    const { logoutUser } = useContext(AuthContext);
    const axios = axiosInstance();

    const getUserInfo = async() => {
        const response = await axios.get('/api/v1/users/user-info');
        const userInfo = response.data;
        setUserInfo(userInfo);
    }

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.greeting}>
                <span>¡Hola,</span>
                <span>{userInfo?.first_name[0].toUpperCase() + userInfo.first_name.slice(1)}!</span>
            </div>
            <div className={styles.avatar}>
                {userInfo?.first_name[0].toUpperCase()}
                {userInfo?.last_name[0].toUpperCase()}
            </div>
            <img src="/downArrow.svg" onClick={handleShowMenu}/>
                {showMenu && 
                    <div className={styles.dropdownContainer} onClick={handleShowMenu}>
                        <div className={styles.dropdown}>
                            <img src="/arrowMenu.svg" className={styles.arrowMenu}/>
                            <span className={styles.option}><img src="/misPedidos.png"/>Mis pedidos</span>
                            <span className={styles.option}><img src="/usuario.png"/>Mi cuenta</span>
                            <span className={styles.option} onClick={logoutUser}>Cerrar sesión</span>
                        </div>
                    </div>
                }
        </div>
    )
}

export default User;