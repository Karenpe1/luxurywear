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
import { differenceInDays, set } from 'date-fns';

const Checkout = () => {
  const {state,dispatch}=useContextGlobal();
  const [cupon,setCupon] = useState(true)
  const [selectedOption, setSelectedOption] = useState("regular");
  const [daysDifference,setDaysDifference]=useState(0)
  const [envio, setEnvio]=useState(12000)
  const [suggestions, setSuggestions]=useState([])
  const [paisesTitle, setPaisesTitle] = useState([]);
  const [estadosTitle, setEstadosTitle] = useState([]);
  const location = useLocation();
  const axios=axiosInstance();
  const noNumbersRegex = /^\D*$/;
  const numbersRegex = /^\d+$/;


  // Extract state or use default values
  const { id = "Unknown", startDate = {}, endDate = {} } = location.state || {};

  //traer el producto seleccionado por el usuario
  useEffect(()=>{
    const fetchById = async()=> {
      try{
        const response=await axios.get(`http://localhost:8080/api/v1/products/${id}`)
        const data= response.data;
        dispatch({type:"GET_PRODUCT_BY_ID",payload:data})
        dispatch({type:"SET_USER_INFO_RESERVA", payload:{productName: data.name}})
      }catch(err){
        dispatch({type:"SET_ERROR", payload:"Error al encontrar el producto"})
      }
    }
    fetchById();

  },[])

  //traer la informacion del user
  useEffect(()=>{
    const fetchUserInfo=async()=>{
      try{
        const response= await axios.get(`http://localhost:8080/api/v1/users/user-info`)
        const data= response.data

        dispatch({type:"GET_USER_INFO", payload:data});
      }catch(error){
        dispatch({type:"SET_ERROR",payload:"Error al encontrar la informacion del usuario"})
      }
    }
    fetchUserInfo()
  },[])
  
  //use effect para mostrar las direcciones guardadas anteriormente
  useEffect(()=>{
    const fetchDireccionInfo=async()=>{
      try{
        const response= await axios.get(`http://localhost:8080/api/v1/users/user-info`)
        const data= response.data

        setSuggestions(data)
        if(suggestions.length>0){
          dispatch()
        }
      }catch(error){
        dispatch({type:"SET_ERROR",payload:"Error al encontrar la informacion del usuario"})
      }
    }
    fetchDireccionInfo()
  },[])
  const formatDate=({day,month,year})=>{
    return `${year}-${month}-${day}`; // Formatea la fecha como "YYYY-MM-DD"
  };
  useEffect(() => {
    if (!id || !startDate || !endDate) {
      // Redirect back to detail page if data is missing
      window.history.back();
    }else{
      dispatch({type:"SET_USER_INFO_RESERVA",payload:{startDate: formatDate(startDate), endDate:formatDate(endDate)}})
      const startDateObj = new Date(`${startDate.year}-${startDate.month}-${startDate.day}`);
      const endDateObj = new Date(`${endDate.year}-${endDate.month}-${endDate.day}`);
      setDaysDifference(differenceInDays(endDateObj, startDateObj));
    }
  }, [id, startDate, endDate]);

  useEffect(() => {
    const calculateTotalCost = () => {
      const productPrice = state.productId?.price || 0;
      const total = productPrice * daysDifference + envio;
  
      dispatch({
        type: "SET_USER_INFO_RESERVA",
        payload: { totalCost: total},
      });
    };
  
    calculateTotalCost();
  }, [state.productId, daysDifference, envio]); // Dependencias necesarias

  // cargar los paises desde el backend  
  useEffect(() => {
    const fetchPaises = async () => {
      const paisesResponse= await axios.get("http://localhost:8080/api/v1/countries");
      const data = paisesResponse.data
      setPaisesTitle(data.map(countries => ({
        value: countries,
        label: countries,
        name: countries,
      })));
    };
    fetchPaises();
  }, []);
  
  const handleCupon = () => {
    setCupon(!cupon);
  }

  const handleChange = (option) => {
    setSelectedOption(option);
  };
  const handleCheck=()=>{
    dispatch({type:"TOGGLE_CHECK"})
  }

  const handleNombre=(e)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{nombre:e.target.value}})
    dispatch({type:"SET_ERROR_RESERVA", payload:{nombre:""}})
  }

  const handleApellido=(e)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{apellido:e.target.value}})
    dispatch({type:"SET_ERROR_RESERVA", payload:{apellido:""}})
  }

  const handleCedula=(e)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{cedula:e.target.value}})
    dispatch({type:"SET_ERROR_RESERVA", payload:{cedula:""}})
  }

  const handleTelefono=(e)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{telefono :e.target.value}})
    dispatch({type:"SET_ERROR_RESERVA", payload:{telefono:""}})
  }

  const handleDireccion=(e)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{direccion:e.target.value}})
    dispatch({type:"SET_ERROR_RESERVA", payload:{direccion:""}})
  }

  // Función para manejar la selección de una sugerencia
  const handleSuggestionClick = (suggestion) => {
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{direccion:suggestion}}); // Actualizar el valor del campo de entrada
    setSuggestions([]); // Ocultar sugerencias después de seleccionar una
  };

  const handleDetallesEntrega=(e)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{detalles:e.target.value}})
  }

  const handleCiudad=(e)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{ciudad:e.target.value}})
    dispatch({type:"SET_ERROR_RESERVA", payload:{ciudad:""}})
  }

  const handleCodigoPostal=(e)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{codigoPostal:e.target.value}})
    dispatch({type:"SET_ERROR_RESERVA", payload:{codigoPostal:""}})
  }

  const handlePais= async (pais)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{pais}})
    console.log(state.pais)
    setEstadosTitle([])
    try{
      const estadosResponse= await axios.get(`http://localhost:8080/api/v1/countries/${pais}/states`);
      const data = estadosResponse.data
      console.log("paises",data)
      setEstadosTitle(data.map(estados => ({
        value: estados,
        label: estados,
        name: estados,
      })));
    }catch(err){
      dispatch({type:"SET_ERROR",payload:{err}})
    }
  }

  const handleProvincia =(provincias)=>{
    dispatch({type:"SET_USER_INFO_RESERVA", payload:{provincia:provincias}})
    dispatch({type:"SET_ERROR_RESERVA", payload:{provincia:""}})
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    let formIsValid = true;
    let errors = {};

    if(state.infoUserReservation.nombre.trim().length <4 || !noNumbersRegex.test(state.infoUserReservation.nombre)){
      errors.nombre="El nombre debe ser válido y mayor a 3 caracteres";
      formIsValid=false;
    }
    if(state.infoUserReservation.apellido.trim().length <4 || !noNumbersRegex.test(state.infoUserReservation.apellido)){
      errors.apellido="El apellido debe ser valido y mayor a 3 caracteres";
      formIsValid=false;
    }
    if(!state.infoUserReservation.cedula || !numbersRegex.test(state.infoUserReservation.cedula)){
      errors.cedula="El documento debe ser valido";
      formIsValid=false;
    }
    if(!state.infoUserReservation.telefono || !numbersRegex.test(state.infoUserReservation.telefono)){
      errors.telefono="El telefono debe ser valido";
      formIsValid=false;
    }
    if(envio==0){
      dispatch({type:"SET_USER_INFO_RESERVA", payload:{envio:false}})
    }
    if(envio !=0){
      if(!state.infoUserReservation.pais){
        errors.pais="Debes seleccionar un pais";
        formIsValid=false;
      }
      if(!state.infoUserReservation.provincia){
        errors.provincia="Debes seleccionar una provincia/ estado";
        formIsValid=false;
      }
  
      if(!state.infoUserReservation.direccion){
        errors.direccion="La direccion no puede estar vacia";
        formIsValid=false;
      }
  
      if(state.infoUserReservation.codigoPostal && !numbersRegex.test(state.infoUserReservation.codigoPostal)){
        errors.codigoPostal="El codigo postal no puede contener letras"
        formIsValid=false
      }
  
      if(!noNumbersRegex.test(state.infoUserReservation.ciudad) || !state.infoUserReservation.ciudad){
        errors.ciudad="La ciudad debe ser valida"
        formIsValid=false
      }
    }
    dispatch({type:"SET_ERROR_RESERVA", payload:errors})
    console.log(state.infoUserReservation)
    if(formIsValid){
      const body = {
        productName: state.infoUserReservation.productName,
        startDate: state.infoUserReservation.startDate,
        endDate: state.infoUserReservation.endDate,
        totalCost: state.infoUserReservation.totalCost,
        nombre: state.infoUserReservation.nombre.trim(),
        apellido: state.infoUserReservation.apellido.trim(),
        saveData: state.infoUserReservation.saveData,
        envio: state.infoUserReservation.envio,
        cedula:state.infoUserReservation.cedula,
        telefono: state.infoUserReservation.telefono, 
        addressId: state.infoUserReservation.addressId, 
        pais: state.infoUserReservation.pais, 
        provincia:state.infoUserReservation.provincia, 
        ciudad: state.infoUserReservation.ciudad, 
        direccion:state.infoUserReservation.direccion, 
        detalles: state.infoUserReservation.detalles, 
        codigoPostal: state.infoUserReservation.codigoPostal, 
      };

      const method = "POST"
      const endpoint = "http://localhost:8080/api/v1/reservations";

      try {
        const response = await axios({
        method,
          url: endpoint,
          data: body,
        });

        // Handle non-201 status codes
        if (response.status === 200 || response.status === 201 ) {
          dispatch({
            type: "SHOW_MODAL_GLOBAL",
            payload: {
              img: "/Estrellas.svg",
              titulo: "¡Felicidades!",
              subtitulo: "Tu reserva ha sido exitoso.",
              mensaje: "A tu correo llegara todos los detalles de la reserva",
            },
          });
        }
      } catch (err) {
        console.error("Error during form submission:", err);
        dispatch({
          type: "SHOW_MODAL_GLOBAL",
          payload: {
            img: "/ohNo.png",
            titulo: "¡Error de conexión!",
            subtitulo: "Hubo un problema con la conexión.",
            mensaje: "Tu reserva no pudo ser completada, por favor vuelve a intentar",
          }})
      }
    }
  }

  return (
    <div className={styleCheckout.contenedor}>
      <div className={styleCheckout.checkoutLeft}>
        <a href="/"><img className={styleCheckout.logo} src="/logo.png" alt="App Logo" /></a>
        <div className={styleCheckout.info}>
          <h2>¡Estas a un click de tu reserva!</h2>
          <form >
            <Input
              id="email"
              label="Correo electronico"
              placeholder="Ingresa tu email"
              type="text"
              value={state.infoUser?.email}
            />
            <div className={styleCheckout.grid}>
              <Input
                id="nombre"
                label="Nombre"
                placeholder="Nombres"
                type="text"
                onChange={handleNombre}
                value={state.infoUserReservation?.nombre}
                error={state.errorReservation?.nombre}
                className={styleCheckout.inputMedio}
              />
              <Input
                id="apellido"
                label="Apellidos"
                placeholder="Apellidos"
                type="text"
                onChange={handleApellido}
                value={state.infoUserReservation?.apellido}
                error={state.errorReservation?.apellido}
                className={styleCheckout.inputMedio}
              />
              <Input
                id="cedula"
                label="Cedula o Nit"
                placeholder="Cedula o Nit"
                type="text"
                onChange={handleCedula}
                value={state.infoUserReservation?.cedula}
                error={state.errorReservation?.cedula}
                className={styleCheckout.inputMedio}
              />
              <Input
                id="telefono"
                label="Teléfono"
                placeholder="Teléfono"
                type="tel"
                onChange={handleTelefono}
                value={state.infoUserReservation?.telefono}
                error={state.errorReservation?.telefono}
                className={styleCheckout.inputMedio}
              />
            </div>
          </form>
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
          <form >
            <MultiSelector
              label="País"
              options={paisesTitle}
              placeholder="País/Región"
              multiselector={false}
              onChange={(option) => handlePais(option.value)}
              error={state.errorReservation?.pais}
            />
            <div className={styleCheckout.ciudadGrid}>
              <Input
                id="ciudad"
                label="Ciudad"
                placeholder="Ciudad"
                type="text"
                onChange={handleCiudad}
                value={state.infoUserReservation?.ciudad}
                error={state.errorReservation?.ciudad}
              />
              <MultiSelector
                label="Provincia"
                options={estadosTitle}
                placeholder="Provincia/Estado"
                multiselector={false}
                onChange={(option)=> handleProvincia (option.value)}
                error={state.errorReservation?.provincia}
              />
              <Input
                id="codigo"
                label="Código Postal"
                placeholder="Codigo postal(Opcional)"
                type="text"
                onChange={handleCodigoPostal}
                value={state.infoUserReservation?.codigoPostal}
                error={state.errorReservation?.codigoPostal}
              />
            </div>
            <Input
              id="direccion"
              label="Dirección"
              placeholder="Dirección"
              type="text"
              onChange={handleDireccion}
              onClick={()=>dispatch({type:"TOGGLE_OPEN"})}
              error={state.errorReservation?.direccion}
            />
            {suggestions.length>0 && (
              <ul>
                {suggestions.map((suggest,index)=>(
                  <li key={index} onClick={handleSuggestionClick}>
                    {suggest}
                  </li>
                ))}
              </ul>
            )}
            <Input
              id="detalles"
              label="Detalles de entrega"
              placeholder="Casa, apartamento, etc. (Opcional)"
              type="text"
              onChange={handleDetallesEntrega}
              value={state.infoUserReservation?.detalles}
            />
          </form>
          <label htmlFor="">
            <input className={styleCheckout.check} type="checkbox" checked={state.infoUserReservation.saveData} onChange={handleCheck}/> Guardar mi información y consultar más rápidamente la próxima vez
          </label>
        </div>
      </div>
      <div className={styleCheckout.checkoutRight}>
        <div className={styleCheckout.producto}>
          <div className={styleCheckout.detailProduct}>
            <img src={`http://localhost:8080${state.productId?.images[0].url}`} alt=""/>
            <div className={styleCheckout.descriptionProduct}>
              <span>{state.productId?.name}</span>
              <span>XS</span>
            </div>
          </div>
          <div className={styleCheckout.precioProduct}>
            <h3>{formatCurrency(state.productId?.price,"es-CO", "COP")}</h3>
          </div>
        </div>
        <div className={styleCheckout.resumenFechas}>
          <div className={styleCheckout.resumenFila}>
            <span>Fecha Recogida</span>
            <span>{state.infoUserReservation.startDate}</span>
          </div>
          <div className={styleCheckout.resumenFila}>
            <span>Fecha Entrega</span>
            <span>{state.infoUserReservation.endDate}</span>
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
            <span className={styleCheckout.productosDias}>Total Productos <span>{`x ${daysDifference} dias`} </span></span>
            <span>{formatCurrency(state.productId?.price * daysDifference ||0 ,"es-CO", "COP")}</span>
          </div>
          <div className={styleCheckout.resumenFila}>
            <span>Costo de envío</span>
            <span>{envio!=0 ? formatCurrency(envio ,"es-CO", "COP"): "GRATIS"}</span>
          </div>
          <div className={styleCheckout.resumenFila}>
            <span>Total a pagar</span>
            <span className={styleCheckout.total}>{formatCurrency(state.infoUserReservation.totalCost ,"es-CO", "COP")}</span>
          </div>
        </div>
        <label className={styleCheckout.condiciones}>
          <input type="checkbox"/> He leído y acepto los <a href="#">Términos y Condiciones</a>
        </label>
        <div className={styleCheckout.buttonReservar}>
          <Button onClick={handleSubmit}>Reservar</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
