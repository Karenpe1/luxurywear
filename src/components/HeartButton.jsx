import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import stylesHeart from "../styles/heart.module.css";
import useAxios from "../Utils/axiosInstance";
import { useContextGlobal } from "../context/globalContext";

const HeartButton = ({id }) => {
  const [liked, setLiked] = useState(false);
  const {user}=useContext(AuthContext);
  const{dispatch}= useContextGlobal();
  const axios = useAxios() 

  const toggleLike = async (e) => {
    e.stopPropagation();
    if (!user) {     
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          img: "./ohNo.png",
          titulo: "Error",
          subtitulo: "Hubo un problema.",
          mensaje: "Por favor, inicia sesión para añadir este producto a tu lista de favoritos.",
        },
      });
      return;
    }
    // Alternar estado de "Like" solo después de una solicitud exitosa
    try {

      // Realiza el POST a la API con el ID de la tarjeta
      const response = await axios.post(
        `http://localhost:8080/api/v1/users/toggle-favorites?page=0&size=6&productId=${id}`,null,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Opcional: manejar la respuesta
      setLiked(!liked); // Cambia el estado de "Like"
    } catch (error) {
      console.error("Error al hacer toggle de favoritos:", error);
    }
  };

  return (
    <>
        <button
        onClick={toggleLike}
        className={stylesHeart.heart}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {liked ? (
          <i
            className="fas fa-heart"
            style={{ color: "red", fontSize: "22px" }}
          ></i>
        ) : (
          <i
            className="far fa-heart"
            style={{ color: "black", fontSize: "22px" }}
          ></i>
        )}
      </button>
    </>
  );
};

export default HeartButton;
