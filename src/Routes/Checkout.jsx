import { useEffect, useState } from "react";
import styleCheckout from "../styles/checkOut.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import Input from "../components/Input";
import MultiSelector from "../components/Multiselector";
import { useLocation } from "react-router-dom";
import { useContextGlobal } from "../context/globalContext";
import axiosInstance from "../Utils/axiosInstance";
import { formatCurrency } from "../Utils/currencyFormatter";

const Checkout = () => {
  const {state,dispatch}=useContextGlobal();
  const [cupon,setCupon] = useState(false)
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("regular");
  const [envio, setEnvio]=useState(12000)
  const location = useLocation();
  const axios=axiosInstance();

  // Extract state or use default values
  const { id = "Unknown", startDate = {}, endDate = {} } = location.state || {};

  //traer el producto seleccionado por el usuario
  useEffect(()=>{
    const fetchById=async()=>{
      try{
        const response=await axios.get(`http://localhost:8080/api/v1/products/${id}`)
        const data= response.data;
        console.log(data)
        dispatch({type:"GET_PRODUCT_BY_ID",payload:data})
      }catch(err){
        dispatch({type:"SET_ERROR", payload:"Error al encontrar el producto"})
      }
    }
    fetchById();

  },[])
  //traer la informacion del user
  

  const handleCupon = () => {
    setCupon(!cupon);
  }
  useEffect(() => {
    setCountryOptions([{value:"Colombia"}]);
  },[]);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (!id || !startDate || !endDate) {
      // Redirect back to detail page if data is missing
      window.history.back();
    }
  }, [id, startDate, endDate]);

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
          <h2>Metodos de envio</h2>
          <p>Envío Exprés: (Solo Bogotá - Costo adicional) Si pides antes de las 3pm te llega HOY mismo, si pides
            después de las 3pm llega mañana</p>
          <div className={styleCheckout.option}>
            <label className={`${styleCheckout.label} ${selectedOption === "regular" ? styleCheckout.active : ""}`}>
              <div className={styleCheckout.labelRadio}>
                <input
                  type="radio"
                  name="envio"
                  value="regular"
                  checked={selectedOption === "regular"}
                  onChange={() => {handleChange("regular"),setEnvio(6000)}}
                />
                <div className={styleCheckout.labelOptions}>
                  <span>Envío Regular</span>
                  <span>(Tiempo de entrega: 2-6 días hábiles en Bogotá)</span>
                </div>
              </div>
              <div className={styleCheckout.options}>
                <h4>
                  <strong className={styleCheckout.price}>$6.000</strong>
                </h4>
              </div>
            </label>
          </div>
          <div className={styleCheckout.option}>
            <label className={`${styleCheckout.label} ${selectedOption === "tienda" ? styleCheckout.active : ""}`}>
              <div className={styleCheckout.labelRadio}>
                <input
                  type="radio"
                  name="envio"
                  value="tienda"
                  checked={selectedOption === "tienda"}
                  onChange={() => {handleChange("tienda"),setEnvio(0)}}
                />
                <span>Recoger en tienda</span>
              </div>
              <div className={styleCheckout.options}>
                <h4><strong className={styleCheckout.price}>GRATIS</strong></h4>
              </div>
            </label>
          </div>
          <div className={styleCheckout.option}>
            <label className={`${styleCheckout.label} ${selectedOption === "expres" ? styleCheckout.active : ""}`}>
              <div className={styleCheckout.labelRadio}>
                <input
                  type="radio"
                  name="envio"
                  value="expres"
                  checked={selectedOption === "expres"}
                  onChange={() =>{ handleChange("expres"), setEnvio(15000)}}
                />
                <span className={styleCheckout.labelOptions}>
                  <span>Envío Exprés</span>
                  <span>(Llega HOY mismo si lo pides antes de la 12 m)</span>
                </span>
              </div>
              <div className={styleCheckout.options}>
                <strong className={styleCheckout.price}>$15.000</strong>
              </div>
            </label>
          </div>
        </div>
      
        {/*  form para la entrega */}
        <div className={`${styleCheckout.info} ${envio==0 && styleCheckout.disable}`}>
          <h2>Entrega</h2>
          <MultiSelector
            label="País"
            options={countryOptions}
            placeholder="País/Región"
            multiselector={false}
            preselected={countryOptions}
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
              preselected={countryOptions}
            />
            <Input
              id="codigo"
              label="Código Postal"
              placeholder="Codigo postal(Opcional)"
              type="text"
            />
          </div>
          <label htmlFor="">
            <input type="checkbox"/> Guardar mi información y consultar más rápidamente la próxima vez
          </label>
        </div>
      </div>
      
      <div className={styleCheckout.checkoutRight}>
        <div className={styleCheckout.producto}>
          <div className={styleCheckout.detailProduct}>
            <img src={state.productId?.images[0].url} alt=""/>
            <div className={styleCheckout.descriptionProduct}>
              <span>{state.productId?.name}</span>
              <span>XS</span>
            </div>
          </div>
          <div className={styleCheckout.precioProduct}>
            <h3>{formatCurrency(state.productId?.price,"es-CO", "COP")}</h3>
          </div>
        </div>
        <div className={styleCheckout.cupon}>
          <div className={styleCheckout.cuponTitle}>
            <h3 className={styleCheckout.title}><FontAwesomeIcon icon={faTag}/>¿Tienes un cupón de descuento?</h3>
            <button className={styleCheckout.arrowContainer} onClick={handleCupon}>
              <img className={`${styleCheckout.arrow} ${cupon ? styleCheckout.open : ""}`} src="/arrowDown.svg" alt=""/>
            </button>
          </div>
          <div className={`${styleCheckout.inputCupon} ${cupon ? styleCheckout.visible : ""} `}>
            <input className={styleCheckout.input} type="text" placeholder="Introduce tu cupón aqui"/>
            <button className={styleCheckout.inputButton}>Aplicar</button>
          </div>
        </div>
        <div className={styleCheckout.resumenPago}>
          <div className={styleCheckout.resumenFila}>
            <span>Total Productos</span>
            <span>{formatCurrency(state.productId?.price ||0 ,"es-CO", "COP")}</span>
          </div>
          <div className={styleCheckout.resumenFila}>
            <span>Costo de envío</span>
            <span>{envio!=0 ? formatCurrency(envio ,"es-CO", "COP"): "GRATIS"}</span>
          </div>
          <div className={styleCheckout.resumenFila}>
            <span>Total a pagar</span>
            <span className={styleCheckout.total}>{formatCurrency(state.productId?.price + envio,"es-CO", "COP")}</span>
          </div>
        </div>
        <label className={styleCheckout.condiciones}>
          <input type="checkbox"/> He leído y acepto los <a href="#">Términos y Condiciones</a>
        </label>
        <div className={styleCheckout.buttonReservar}>
          <Button>Reservar</Button>
        </div>
        <h1>Checkout</h1>
        <p>Id del producto {id}</p>
        <p>Fecha de inicio: {`${startDate.day}/${startDate.month + 1}/${startDate.year}`}</p>
        <p>Fecha final {`${endDate.day}/${endDate.month + 1}/${endDate.year}`}</p>
      </div>
    </div>
  );
};

export default Checkout;
