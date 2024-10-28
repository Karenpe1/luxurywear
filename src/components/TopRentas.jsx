import React, { useEffect, useState } from "react";
import Button from "./Button";
import RentaStyle from "../styles/topRentas.module.css";

const listaProductos = [
  {
    id: 1,
    url: "/img/coctel1.jpg",
    descripcion: "vestido de noche",
  },
  {
    id: 2,
    url: "/img/coctelDos2.png",
    descripcion: "vestido de noche dorado",
  },
  {
    id: 3,
    url:"/img/coctelTres4.jpg",
    descripcion: "vestido de noche con volados",
  },
  {
    id: 4,
    url: "/img/madrina1.jpg",
    descripcion: "vestido de madrina azul",
  },
  {
    id: 5,
    url: "/img/novia3.jpg",
    descripcion: "vestido de novia estilo princesa",
  },
  {
    id: 6,
    url: "/img/quince1.jpg",
    descripcion: "vestido quinceañera rosado",
  },
];
const aleatorizar = (array) => {
  //se crea una copia del array original
  let arrayAleatorio = [...array];
  //Iterar desde el Final del Array hasta el Principio:
  for (let i = arrayAleatorio.length - 1; i > 0; i--) {
    //Generamos un Índice Aleatorio
    const j = Math.floor(Math.random() * (i + 1));
    //Intercambiamos los Elementos para aleatorizar el array segun el numero de 0 a i que obtuvimos en el indice j con el math.random
    [arrayAleatorio[i], arrayAleatorio[j]] = [
      arrayAleatorio[j],
      arrayAleatorio[i],
    ];
  }
  return arrayAleatorio;
};

const TopRentas = () => {
  const [aleatorizarProductos, setAleatorizarProductos] = useState([]);

  useEffect(() => {
    // Mezclar los productos cada vez que se monta el componente
    setAleatorizarProductos(aleatorizar(listaProductos));
  }, []);
  return (
    <div className={RentaStyle.contenedor} >
      <h2 className={RentaStyle.titulo}>Top en Rentas</h2>
      <div className={RentaStyle.listaProductos}>
        {/*recorre lista aleatorizada */}
        {aleatorizarProductos.map((data) => (
          <div key={data.id} className={RentaStyle.producto}>
            {/* Añadiend el botón debajo de la Card */}
            <img className={RentaStyle.card} src={data.url} alt={data.descripcion} />
            {/* Añadiendo el botón debajo de la Card */}
            <button
             className={RentaStyle.detalle}
            >
              Ver detalle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRentas;
