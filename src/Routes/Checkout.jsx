import React, { useEffect, useState } from "react";
import styleCheckout from "../styles/checkOut.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTag,faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import Input from "../components/Input";
import MultiSelector from "../components/Multiselector";


const Checkout = () => {
  const [cupon,setCupon]=useState(false)
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("regular");
  const handleCupon=()=>{
    setCupon(!cupon);
  }
  useEffect(()=>{
    setCountryOptions([{value:"Colombia"}]);
  },[]);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styleCheckout.contenedor}>
      <div className={styleCheckout.checkoutLeft}>
        <a href="/"><img className={styleCheckout.logo} src="/logo.png" alt="App Logo" /></a>
        <div className={styleCheckout.info}>
          <h2>¡Estas a un click de tu reserva!</h2>
          <Input
            id="email"
            label="Correo electronico"
            placeholder="Ingresa tu email"
            type="text"
          />
          <div className={styleCheckout.grid}>
            <Input
              id="nombre"
              label="Nombre"
              placeholder="Nombres"
              type="text"
              className={styleCheckout.inputMedio}
            />
            <Input
              id="apellido"
              label="Apellidos"
              placeholder="Apellidos"
              type="text"
              className={styleCheckout.inputMedio}
            />
            <Input
              id="cedula"
              label="Cedula o Nit"
              placeholder="Cedula o Nit"
              type="text"
              className={styleCheckout.inputMedio}
            />
            <Input
              id="telefono"
              label="Teléfono"
              placeholder="Teléfono"
              type="tel"
              className={styleCheckout.inputMedio}
            />
          </div>
        </div>
        <div className={styleCheckout.info}>
          <h2>Entrega</h2>
          <MultiSelector
            label="País"
            options={countryOptions}
            placeholder="País/Región"
            multiselector={false}
            preselected= {countryOptions}
          />
          <Input
              id="direccion"
              label="Dirección"
              placeholder="Dirección"
              type="text"
            />
          <Input
              id="detalles"
              label="Detalles de entrega"
              placeholder="Casa, apartamento,etc. (Opcional)"
              type="text"
            />
            <div className={styleCheckout.ciudadGrid}>
              <Input
                id="ciudad"
                label="Ciudad"
                placeholder="Ciudad"
                type="text"
              />
              <MultiSelector
                label="Provincia"
                options={countryOptions}
                placeholder="Provincia/Estado"
                multiselector={false}
                preselected= {countryOptions}
              />
              <Input
                id="codigo"
                label="Código Postal"
                placeholder="Codigo postal(Opcional)"
                type="text"
              />
            </div>
            <label htmlFor="">
              <input type="checkbox" /> Guardar mi información y consultar más rápidamente la próxima vez
            </label>
        </div>
        <div className={styleCheckout.info}>
          <h2>Metodos de envio</h2>
          <p>Envío Exprés: (Solo Bogotá - Costo adicional) Si pides antes de las 3pm te llega HOY mismo, si pides después de las 3pm llega mañana</p>
          <div className={styleCheckout.option}>
            <label className={`${styleCheckout.label} ${selectedOption === "regular" ? styleCheckout.active : ""}`}>
              <input
                type="radio"
                name="envio"
                value="regular"
                checked={selectedOption === "regular"}
                onChange={() => handleChange("regular")}
              />
              <div>
                <span>Envío Regular (Tiempo de entrega: 2-6 días hábiles en Bogotá)</span>
                <strong className={styleCheckout.price}>$6.000</strong>
              </div>
            </label>
          </div>
          <div className={styleCheckout.option}>
            <label className={`${styleCheckout.label} ${selectedOption === "tienda" ? styleCheckout.active : ""}`}>
              <input
                type="radio"
                name="envio"
                value="regular"
                checked={selectedOption === "tienda"}
                onChange={() => handleChange("tienda")}
              />
              <div>
                <span>Recoger en tienda</span>
                <strong className={styleCheckout.price}>GRATIS</strong>
              </div>
            </label>
          </div>
          <div className={styleCheckout.option}>
            <label className={`${styleCheckout.label} ${selectedOption === "expres" ? styleCheckout.active : ""}`}>
              <input
                type="radio"
                name="envio"
                value="expres"
                checked={selectedOption === "expres"}
                onChange={() => handleChange("expres")}
              />
              <div>
                <span>Envío Exprés (Llega HOY mismo si lo pides antes de la 12 m) - Máximo 4 prendas</span>
                <strong className={styleCheckout.price}>$15.000</strong>
              </div>
            </label>
          </div>
        </div>    
      </div>
      <div className={styleCheckout.checkoutRight}>
        <div className={styleCheckout.producto}>
          <div className={styleCheckout.detailProduct}>
            <img src="/img/categories/1.png" alt="" />
            <div className={styleCheckout.descriptionProduct}>
              <span>Falda Cavalieri Mujer Camel</span>
              <span>XS</span>
            </div>
          </div>
          <div className={styleCheckout.precioProduct}>
            <h3>$ 135.400</h3>
          </div>
        </div>
        <div className={styleCheckout.cupon}>
          <div className={styleCheckout.cuponTitle}>
            <h3 className={styleCheckout.title}><FontAwesomeIcon icon={faTag} />¿Tienes un cupón de descuento?</h3>
            <button className={styleCheckout.arrowContainer} onClick={handleCupon}>
              <img className={`${styleCheckout.arrow} ${cupon ? styleCheckout.open: ""}`} src="/arrowDown.svg" alt="" />
            </button>
          </div>
          <div className={`${styleCheckout.inputCupon} ${cupon ? styleCheckout.visible : ""} `}>
              <input className={styleCheckout.input} type="text" placeholder="Introduce tu cupón aqui" />
              <button className={styleCheckout.inputButton}>Aplicar</button>
          </div>
        </div>
        <div className={styleCheckout.resumenPago}>
          <div className={styleCheckout.resumenFila}>
            <span>Total Productos</span>
            <span>$25.800</span>
          </div>
          <div className={styleCheckout.resumenFila}>
            <span>Costo de envío</span>
            <span>$12.475</span>
          </div>
          <div className={styleCheckout.resumenFila}>
            <span>Total a pagar</span>
            <span className={styleCheckout.total}>$38.275</span>
          </div>
        </div>
        <label className={styleCheckout.condiciones}>
            <input type="checkbox" /> He leído y acepto los <a href="#">Términos y Condiciones</a>
        </label>
        <div className={styleCheckout.buttonReservar}>
        <Button>Reservar</Button>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
