import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/Detail.module.css";
import backButton from "../Images/backArrow.png";
import { formatCurrency } from "../Utils/currencyFormatter";
import Calendar from "../components/Calendar";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(""); // Estado para la imagen principal
  const [caracteristicas, setCaracteristicas] = useState(false);
  const [startDate, setStartDate] = useState({day: null, month: null, year: null});
  const [endDate, setEndDate] = useState({day: null, month: null, year: null});
  const [isOpen, setIsOpen] = useState(false);
  const [closedDates, setClosedDates] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Llamada a la API para obtener el detalle del producto
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/products/${id}`
        );
        const data = await response.json();
        console.log(data);
        setProduct(data);
        setMainImage(data.images[0]?.url ?? "placeholder.svg"); // Establece la primera imagen como principal
        const response2 = await fetch(
          `http://localhost:8080/api/v1/products/${id}/availability`
        );
        const data2 = await response2.json();
        setClosedDates(data2.unavailableDates.map((date) => {
          let arr = date.split('-');
          return {day: parseInt(arr[2]), month: parseInt(arr[1]) - 1, year: parseInt(arr[0])}}));
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  const toggleCaracteristicas = () => {
    setCaracteristicas(!caracteristicas);
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div className={styles.detailContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>{product.name}</h1>
        <Link to="/" className={styles.backButton}>
          {" "}
          <img src={backButton} alt="Back" />
        </Link>
      </header>

      <div className={styles.content}>
        {/* Imagen principal */}
        <img
          src={`/${mainImage}`}
          alt={product.name}
          className={styles.productImage}
        />
        <div className={styles.gallery}>
          {/* Galería de miniaturas */}
          {product.images.map((img, index) => (
            <img
              key={index}
              src={`/${img.url}`}
              alt={`${product.name} thumbnail ${index + 1}`}
              className={styles.thumbnail}
              onClick={() => setMainImage(img.url)} // Cambia la imagen principal
            />
          ))}
        </div>
        <div className={styles.productInfo}>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>
            Alquiler:{" "}
            <span>{formatCurrency(product.price, "es-CO", "COP")}</span>
          </p>

          <div className={styles.dateSelector}>
            <div className={styles.dateOuterContainer} onClick={() => setIsOpen(true)}>
              <div className={styles.dateContainer}>
                <span>Alquila</span>
                <span className={styles.date}>{startDate.day == null ? 'Desde' : startDate.day + '/' + (startDate.month + 1) + '/' + startDate.year}</span>
              </div>
              <span onClick={() => {setStartDate({day: null, month: null, year: null}); setEndDate({day: null, month: null, year: null});}}>{startDate.day != null ? 'x' : ''}</span>
            </div>
            <span className={styles.separator}>|</span>
            <div className={styles.dateOuterContainer} onClick={() => setIsOpen(true)}>
              <div className={styles.dateContainer}>
                <span>Devuelve</span>
                <span className={styles.date}>{endDate.day == null ? 'Hasta' : endDate.day + '/' + (endDate.month + 1) + '/' + endDate.year}</span>
              </div>
              <span onClick={() => setEndDate({day: null, month: null, year: null})}>{endDate.day != null ? 'x' : ''}</span>
            </div>
          </div>
          {isOpen && <div className={styles.calendarContainer} onClick={() => setIsOpen(false)}>
                <div className={styles.calendar} onClick={(e) => e.stopPropagation()}>
                  <Calendar setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} closedDates={closedDates}/>
                </div>
              </div>}

          <div className={styles.caract}>
            <div className={styles.encabezado} onClick={toggleCaracteristicas}>
              <p className={styles.titleHeader}>Caracteristicas</p>
              <span
                className={`${styles.arrow} ${
                  caracteristicas ? "" : styles.open 
                }`}
              >
                <img src="/Right.svg" alt="" />
              </span>
            </div>

            {/* tabla caracteristicas  */}
            <div
              className={`${styles.tabla} ${
                caracteristicas ? styles.visible : ""
              }`}
            >
              <div className={styles.table} >
                <tbody>
                  <tr>
                    <td style={{ background: "#F9F9F9" }}>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/4038/1265/6b121213518e0c92d228059b27433f1a?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LXQJH5LyT2wO~PwQ-8MCbd9ddqei8SBcePR1hHxeE3aXPJwlkntHX8uqIwE5GcHZAMFBqkbMYK5JFojiZK5X864a5y1odJqDnYO7r09RMp3VmnfTTfRnNbh7Xyr4-QPLOTutdWEhRTfYvPOt~W~eJZQL0CJsBFbkcPJIZ5rVr7SuqkTc5fs1o-ojlZRJ8s53~dt~j3AUidiWai1qj1av3kHajD1QeDfRLyhpj0V530KMY3xSV0-PQ7-2RGsYCZOVjCMzBRdj9YVDnxHoZsaJiA33t7slvQpL0xzK-dhX3G-IoFyD58OpdXODkFWSJ1Phme4Q8uklOWgWbdEJkUyyNg__"
                        alt=""
                      />
                      Referencia
                    </td>
                    <td style={{ background: "#F9F9F9" }}>
                      {product.reference}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/fc3d/23f2/1a3e56bac28b1d67709ff260c2d329be?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JoWMutXmfsValFsB~i~6SCeymNwjTmBKM3GZI7Z5wX4s~bS~pua0xSzj~pLppNUdFh6oOCyuhNrTw2fScAkH5OYxE-PIPIjeJ9i40seZknSPfJy8~XsY4A5MlDlaZA8i6x~i53vxjUBajlpjlO6KHyh2pW~hwCGeR-n8csx9zAoFUfAnx9X6LXH6FjAbdPotZgPAorxOO8teg0yV22g3hgrm0dGTNpVKRCdRKN~HV7Xb9qUuT04d-NEnpdvYoNZFiOa8W5LfhLnGG7Xu2aREYi3MvKICsidnDbu5~3fvsKTd20SjrWN5Fk52xtWWWTXsimYT8R0DTYpJzQRAhi4K3A__"
                        alt=""
                      />
                      Modelo
                    </td>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <td style={{ background: "#F9F9F9" }}>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/9575/3b78/1540abb1fd7ac3ac1e85d6298d13f750?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D8Q5EQglgvcOXX8iz2z54ezmG8DZ1Wev-x7gURqV7jpLPA6c1aX1yMs8-pvwpOmuHuJ2CLfoium66humJJwLOBKZujZeHrZF11q2As47lKS9jAABt4h-nbUizLA57-nwT0GSJmJWZHW7MKCB40OmzBWHGD-0JPp5JPjyz9CR4sGEgU3E005pFLigORi3u8Oc0aR51cwLCBr3RIbt4wqrDe-jTflJxlnU2cORmhg~QVTy2rO3PiY4oQShEFXyUSSKqJs4AQacBe6dJ~mbbGDBzCF4XLw73TVinUEgFqpJ0~RGa4S3pya9xWiQgsa4lnZCRh6bX7AcIBJGnB6aW00KDQ__"
                        alt=""
                      />
                      Diseñador
                    </td>
                    <td style={{ background: "#F9F9F9" }}>
                      {product.designer}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/0ffc/dff2/026bb7afc20791e84f73e250163ba636?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TGty4JAono5iddXgZUbQr00ie9f9cJUypWhR9RjlhlVhjH7cXrsVdJBYQ5p3zENQ3eVkZ4-iDHUg32vSRHBdPH4N-QcMHN7~kv88VhoRJ~YX-XD~JHLseRO-cgVYlTWqe78BxcDdcmvi300ZZFQl5NyEtUq8WHIB4R0Y39a5nDOAnhYwKS6ik9xZ53CCn3FO-SFnHDZk0cw7UfDh-aUbM~W9YScCapm6UAJUadNXPzWbobBW3qMENaftc-nJyYUji5MQxKrAYWM0HuKw6AtcBdZGAg5Z8~SempN1c2XOb-Cteyzi38RO0T2mS9mZgGU6lcS-5yafYrJGqoVUQ521CQ__"
                        alt=""
                      />
                      Material
                    </td>
                    <td>{product.material}</td>
                  </tr>
                  <tr>
                    <td style={{ background: "#F9F9F9" }}>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/04de/fa4b/b3464f829fa8a96df1b0c6c60d1203ba?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HyCuuTHCDAeb9WTMz6OCmMApKlsGWoa3e3lRZV~24DsCgCDqCPzwKWZT0OF48xUPrOCrtPJzljlPXmF6TFGNpNI3~dymcYunKigKnldhvTV-IHlJKuP8gg6GGLCH3BmkroANyEFwVrxD6t4S9t4cKJ5R4Lc7wjrXGAi4lFJFlPMlDbtv1IrFvZick6at1swP6YW7oC0P6sTmXh-St5CNwz5g~9IRuvqPchNt15ELBXovLlAN2d7m8ZEc37-IFPwlaEe9cw3kdWPp4lA1SR6OnHSW0O88fhwOQNKbSHupuUQ-2n6SifBRvj9VxIgi6QvDcgRbJqTgvyYYnqCJPIEf4A__"
                        alt=""
                      />
                      Tipo
                    </td>
                    <td style={{ background: "#F9F9F9" }}>
                      {product.category.name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/299c/6dc8/26377be67d726468de10be2eb5acf622?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YSSYZG-KCVz3MAPkRgT7by01jrJbkoqImDBqIFMJJ2duq73txl7MXCck4sf1vC6PLD5KtSVQhfqUsSAoVVI5piIRD2K849tQIrSgeNFwrayTLKWu0t0usIkZ9QYv6VsapN0kYMJ1qMqn7yrjXFHK5fofzR4V~9tDtFMiMRIJgUqSOgg3jagf3rtIzs9uVklpZP~-qTxVpR-4IRMpD-b71VubAO3coxsKJvjkWUxQPXWmWK9vWeJeBJ77SzoohUSCtee2gUBuq12BuF0HW~rkX8e1O2UouWzyXrL~shbV-wQDf2YVmB65NywFGeOf3Lq4ap4XwBWvxuUOMGh50caxTQ__"
                        alt=""
                      />
                      Tallas disponibles
                    </td>
                    <td>
                      {product.sizes.map((size, index) => (
                        <span key={index}>
                          {size.size}
                          {index < product.sizes.length - 1 ? ", " : ""}
                          {/* Agrega coma entre tallas */}
                        </span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
