import React, { useEffect, useState } from "react";
import RentaStyle from "../styles/topRentas.module.css";
import { Link } from "react-router-dom";

const TopRentas = () => {
  const [topRentas, setTopRentas] = useState([]);
  const url = "http://localhost:8080/api/v1/products/top-rents";

  useEffect(() => {
    const fetchData = async () => {
      let respuesta = await fetch(url);
      let data = await respuesta.json();
      setTopRentas(data);
      console.log("product", data);
    };
    fetchData();
  }, []);

  return (
    <div className={RentaStyle.contenedor}>
      <h2 className={RentaStyle.titulo}>Top en Rentas</h2>
      <div className={RentaStyle.listaProductos}>
        {/*recorre lista aleatorizada */}
        {topRentas.map((data, index) => (
          <div key={data.productId} className={RentaStyle.producto}>
            <img
              className={RentaStyle.card}
              src={data.images[0].url}
              alt={data.name}
            />
            {/* Añadiendo el botón debajo de la Card */}
            <Link to={"/detail/" + data.productId}>
              <button className={RentaStyle.detalle}>Ver detalle</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRentas;
