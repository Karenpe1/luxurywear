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

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetail = async () => {
      try {
        const responseReservation = await axios.get(
          urlAPI + `/api/v1/reservations/${id}`
        );
        const dataReservation = await responseReservation.data;
        setReservation(dataReservation);

        const responseImages = await fetch(
          urlAPI + `/api/v1/products/by-name/${dataReservation.productName}`
        );
        const data = await responseImages.json();
        setProduct(data);
        setMainImage(data.images[0]?.url ?? "placeholder.svg");
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    fetchProductDetail();
  }, [id, axios]);

  return (
    <div>
      Detalle de orden
    </div>
  );
}
export default DetailReservation;
