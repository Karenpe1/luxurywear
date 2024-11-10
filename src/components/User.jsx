import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import styles from "../styles/User.module.css";
import axiosInstance from "../Utils/axiosInstance";

const User = () => {

    const [userInfo, setUserInfo] = useState({});
    const { user, logoutUser } = useContext(AuthContext);
    const axios = axiosInstance();

    const getUserInfo = async() => {
        const response = await axios.post('/api/v1/users/email', {email: user.email});
        const userInfo = response.data;
        setUserInfo(userInfo);
    }

    useEffect(() => {
        getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.greeting}>
                <span>¡Hola,</span>
                <span>{console.log(userInfo)}!</span>
            </div>
            <div>

            </div>
        </div>
    )
}

export default User;