import { useContext, useState } from "react";
import StyleRegistro from "../styles/registro.module.css";
import logo from "../Images/Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";
import AuthContext from "../context/AuthContext";
import { useContextGlobal } from "../context/globalContext";

const NewRegister = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {state,dispatch}=useContextGlobal();
  
  const [modalInfo, setModalInfo] = useState({
    show: false,
    titulo: "",
    subtitulo: "",
    mensaje: "",
    img: "",
    label: "",
  });

  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const noNumbersRegex = /^[^\d]*$/;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/auth/register`;
  const isRegister = location.pathname.includes("/register"); 

  //Login
  const handleCorreoLogin = (e) => {
    dispatch({type:"SET_USER_INFO_LOGIN", payload:{email:e.target.value}})
    dispatch({type:"SET_ERROR_LOGIN", payload:{email:""}})
  };
  const handleContraseñaLogin = (e) => {
    dispatch({type:"SET_USER_INFO_LOGIN", payload:{password:e.target.value}})
    dispatch({type:"SET_ERROR_LOGIN", payload:{password:""}})
  };

  const handleLogin = async(e)=>{
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    // Validación de correo
    if (!state.userLogin.email) {
      errors.email = "Por favor, ingresa tu correo electrónico.";
      formIsValid = false;
    } else if (!state.userLogin.email.includes("@") || !state.userLogin.email.includes(".")) {
      errors.email = "El correo electrónico parece incorrecto. Revisa el formato.";
      formIsValid = false;
    } else if (!emailRegex.test(state.userLogin.email)) {
      errors.email = "Ingresa un correo electrónico válido.";
      formIsValid = false;
    }

    // Validación de contraseña
    if (!state.userLogin.password) {
      errors.password = "Por favor, ingresa tu contraseña.";
      formIsValid = false;
    } else if (state.userLogin.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
      formIsValid = false;
    }

    dispatch({type:"SET_ERROR_LOGIN", payload:errors})

    if (formIsValid) {
      try {
        const body = {
            email: state.userLogin.email,
            password: state.userLogin.password,
        };
        const response = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        
        const previousPage = location.state?.from || document.referrer;
        if (response.ok) {
          loginUser(data);
          const previousPage = location.state?.from || document.referrer; // Obtener página anterior
          if(previousPage?.includes("/register")){
            navigate("/")
          }else{
            navigate(-1);
          }
        } else if (response.status === 404) {
          dispatch({type:"SET_ERROR_LOGIN", payload:{email:"No encontramos una cuenta asociada a este correo electrónico."}})
        } else if (response.status === 401) {
          dispatch({type:"SET_ERROR_LOGIN", payload:{password: "La contraseña ingresada es incorrecta. Vuelve a intentarlo." }})
        } else {
          dispatch({type:"SET_ERROR_LOGIN", payload:{general: " El correo o contraseña ingresados es incorrecto. Vuelve a intentarlo." }})
        }
      } catch (error) {
        Swal.fire({
          title: '¡No se puede iniciar sesión!',
          text: 'Hubo un problema con el inicio de sesión. Por favor, vuelve a intentarlo más tarde.',
          iconHtml: '<img src="ohNo2.png" style="width: 253px;"/>',
          customClass: {
            icon: loginStyles.noBorder,
            confirmButton: loginStyles.confirmButton,
          },
          buttonsStyling: false,
          confirmButtonText: 'Aceptar'
        })
        console.error("Error al iniciar sesión:", error);
      }
    }
  }


  //register
  const handleNombre = (e) => {
    dispatch({type:"SET_USER_INFO_REGISTER", payload:{nombre:e.target.value}})
    dispatch({type:"SET_ERROR_REGISTER", payload:{nombre:""}})
  };
  const handleApellido = (e) => {
    dispatch({type:"SET_USER_INFO_REGISTER", payload:{apellido:e.target.value}})
    dispatch({type:"SET_ERROR_REGISTER", payload:{apellido:""}})
  };
  const handleCorreo = (e) => {
    dispatch({type:"SET_USER_INFO_REGISTER", payload:{correo:e.target.value}})
    dispatch({type:"SET_ERROR_REGISTER", payload:{correo:""}})
  };
  const handleContraseña = (e) => {
    dispatch({type:"SET_USER_INFO_REGISTER", payload:{contraseña:e.target.value}})
    dispatch({type:"SET_ERROR_REGISTER", payload:{contraseña:""}})
  };
  const handleRepetida = (e) => {
    dispatch({type:"SET_USER_INFO_REGISTER", payload:{contraseñaRepetida:e.target.value}})
    dispatch({type:"SET_ERROR_REGISTER", payload:{contraseñaRepetida:""}})
  };


  const handdleRegister = async (e) => {

    e.preventDefault();
    let errors = {};
    let formIsValid = true;
    // Validaciones para el nombre
    if (!state.userRegister.nombre.trim()) {
      errors.nombre = "El campo de nombre no puede estar vacío.";
      formIsValid = false;
    } else if (state.userRegister.nombre.trim().length < 3) {
      errors.nombre = "El nombre debe tener al menos 3 caracteres.";
      formIsValid = false;
    } else if (!noNumbersRegex.test(state.userRegister.nombre)) {
      errors.nombre ="El nombre no puede contener caracteres especiales o números.";
      formIsValid = false;
    }
    // Validaciones para el apellido
    if (!state.userRegister.apellido.trim()) {
      errors.apellido = "El campo de apellido no puede estar vacío.";
      formIsValid = false;
    } else if (state.userRegister.apellido.trim().length < 3) {
      errors.apellido = "El apellido debe tener al menos 3 caracteres.";
      formIsValid = false;
    } else if (!noNumbersRegex.test(state.userRegister.apellido)) {
      errors.apellido ="El apellido no puede contener caracteres especiales o números.";
      formIsValid = false;
    }

    // Validaciones para el correo
    if (!state.userRegister.correo.trim()) {
      errors.correo = "El campo de correo electrónico no puede estar vacío.";
      formIsValid = false;
    } else if (!emailRegex.test(state.userRegister.correo)) {
      errors.correo = "Ingresa un correo electrónico válido.";
      formIsValid = false;
    } else if (!state.userRegister.correo.includes("@") || !state.userRegister.correo.includes(".")) {
      errors.correo ="El correo electrónico parece incorrecto. Revisa el formato.";
      formIsValid = false;
    }
    // Validaciones para la contraseña
    if (!state.userRegister.contraseña.trim()) {
      errors.contraseña = "El campo de contraseña no puede estar vacío.";
      formIsValid = false;
    } else if (state.userRegister.contraseña.includes(" ")) {
      errors.contraseña = "La contraseña no puede contener espacios.";
      formIsValid = false;
    } else if (state.userRegister.contraseña.length < 6) {
      errors.contraseña = "La contraseña debe tener mínimo 6 caracteres.";
      formIsValid = false;
    }
    // Validaciones para repetir la contraseña
    if (!state.userRegister.contraseñaRepetida.trim()) {
      errors.contraseñaRepetida ="El campo de repetir contraseña no puede estar vacío.";
      formIsValid = false;
    } else if (state.userRegister.contraseñaRepetida !== state.userRegister.contraseña) {
      errors.contraseñaRepetida ="Las contraseñas no coinciden. Verifícalas y vuelve a intentarlo.";
      formIsValid = false;
    }
    dispatch({type:"SET_ERROR_REGISTER", payload:errors})

    if (formIsValid) {
      const body = {
        first_name: state.userRegister.nombre.trim(),
        last_name: state.userRegister.apellido.trim(),
        email: state.userRegister.correo,
        password: state.userRegister.contraseña,
      };

      const settings = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        await realizarRegister(settings);
        e.target.reset();
      } catch (err) {
        console.error("Error during form submission:", err);
      }
    }
  };

  async function realizarRegister(settings) {
    try {
      const response = await fetch(url, settings);

      // Handle non-201 status codes
      if (response.status == 201) {
        setModalInfo({
          show: true,
          titulo: "¡Felicidades!",
          subtitulo: "Tu registro ha sido exitoso.",
          mensaje:
            "Te hemos registrado correctamente en nuestra web. Ahora puedes acceder a todas las funciones y beneficios que ofrecemos.",
          img: "./Estrellas.svg",
          label: "continuar",
        }); //mostrar el mensaje de exito
      } else {
        const errorMessages = {
          409: "Ya hay un usuario creado con ese correo electrónico.",
          400: "Solicitud inválida. Por favor, verifica los datos ingresados.",
          500: "Error del servidor. Por favor, intenta más tarde.",
        };

        const message =
          errorMessages[response.status] ||
          `Ocurrió un error inesperado (Código: ${response.status}).`;
        setModalInfo({
          show: true,
          img: "./ohNo.png",
          titulo: "Error",
          subtitulo: "Ha ocurrido un problema.",
          mensaje: message,
          label: "continuar",
        });
      }

      // Parse the successful response
      const data = await response.json();
      console.log(data);
    } catch (err) {
      // Handle network or other fetch errors
      setModalInfo({
        show: true,
        titulo: "Error de conexión",
        subtitulo: "Hubo un problema con la conexión.",
        mensaje:
          "Por favor, verifica tu conexión a Internet e intenta nuevamente.",
        img: "./ohNo.png",
        label: "continuar",
      });
      console.error("Error al realizar el registro:", err);
    }
  }
  const handleLoginClick = () => {
    navigate("/login", { state: { from: "/register" } });
  };

  return (
    <div className={StyleRegistro.container}>
      <div className={StyleRegistro.containerFoto}>
        <div className={StyleRegistro.containerFiltro}>
          <Link to="/">
            <img src={logo} alt="app logo" className={StyleRegistro.img} />
          </Link>
        </div>
      </div>
      <div className={StyleRegistro.contenedorForm}>
        {modalInfo.show && isRegister? (
          <Modal
            img={modalInfo.img}
            titulo={modalInfo.titulo}
            subtitulo={modalInfo.subtitulo}
            mensaje={modalInfo.mensaje}
            label={modalInfo.label}
            onClose={() => {
              setModalInfo({ ...modalInfo, show: false });
              if (modalInfo.titulo === "¡Felicidades!") {
                navigate("/login", { state: { from: "/register" } });
              }
            }}
          />
        ) : isRegister ? (
          <div className={StyleRegistro.formulario}>
            <h2>Registro de cuenta</h2>
            <form onSubmit={handdleRegister} className={StyleRegistro.registro}>
              <Input
                id="nombre"
                label="Nombre"
                placeholder="Ingresa tu nombre"
                type="text"
                value={state.userRegister.nombre}
                onChange={handleNombre}
                error={state.errorRegister.nombre}
              />

              <Input
                id="apellidos"
                label="Apellido"
                placeholder="Ingresa tu Apellido"
                type="text"
                value={state.userRegister.apellido}
                onChange={handleApellido}
                error={state.errorRegister.apellido}
              />

              <Input
                label="Correo Eléctronico"
                id="correo"
                placeholder="Ingresa tu correo electronico"
                type="text"
                value={state.userRegister.correo}
                onChange={handleCorreo}
                error={state.errorRegister.correo}
              />

              <Input
                label="Contraseña"
                id="contraseña"
                placeholder="Ingresa tu contraseña"
                type="password"
                value={state.userRegister.contraseña}
                onChange={handleContraseña}
                error={state.errorRegister.contraseña}
              />

              <Input
                label="Repetir Contraseña"
                id="repetir"
                placeholder="Ingresa nuevamente tu contraseña"
                type="password"
                value={state.userRegister.contraseñaRepetida}
                onChange={handleRepetida}
                error={state.errorRegister.contraseñaRepetida}
              />
              <Button>Registrar</Button>
              <p className={StyleRegistro.cuenta}>
                ¿Ya tienes una cuenta?{" "}
                <strong className={StyleRegistro.link} onClick={handleLoginClick}>
                  Inicia sesión aquí
                </strong>
              </p>
            </form>
          </div>
        ):(
            <div className={StyleRegistro.formularioLogin}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className={StyleRegistro.registro}>
              <Input
                label="Correo Eléctronico"
                id="correo"
                placeholder="Ingresa tu correo electronico"
                type="text"
                value={state.userLogin.email}
                onChange={handleCorreoLogin}
                error={state.errorLogin.email}
              />
              <Input
                label="Contraseña"
                id="contraseña"
                placeholder="Ingresa tu contraseña"
                type="password"
                value={state.userLogin.password}
                onChange={handleContraseñaLogin}
                error={state.errorLogin.password}
              />
              {state.errorLogin.general && (
              <p className={StyleRegistro.error}>{state.errorLogin.general}</p>
            )}
              <Button>Iniciar sesión</Button>
              <p className={StyleRegistro.cuenta}>
                ¿No tienes cuenta?{" "}
                <strong className={StyleRegistro.link} onClick={()=>{navigate("/register")}}>
                  Regístrate aquí
                </strong>
              </p>
            </form>           
          </div>
        )}
      </div>
    </div>
  );
};

export default NewRegister;
