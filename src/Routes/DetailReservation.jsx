import { formatCurrency } from "../Utils/currencyFormatter";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/Detail.module.css";
import styleReservation from "../styles/DetailReservation.module.css";
import backButton from "../Images/backArrow.png";
import ModalGlobal from "../components/ModalGlobal";
import useAxios from "../Utils/axiosInstance";

function DetailReservation() {
  const urlAPI = "http://localhost:8080";
  const axios = useAxios();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [mainImage, setMainImage] = useState("");


  return (
    <div>
      Detalle de orden
    </div>
  );
}
export default DetailReservation;
