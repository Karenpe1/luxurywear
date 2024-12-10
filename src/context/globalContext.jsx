import { createContext, useContext, useEffect, useReducer } from "react";



const initialState = {
  modalData:{isOpen:false, img:"",titulo: "", subtitulo:"", mensaje:"",mensaje2:""},
  isVisible:false,
  productsPaginados:[],
  categoriesPaginados:[],
  usersPaginados:[],
  reservationsPaginados:[],
  productId:null,
  infoUser:null,
  directionList:([]),
  searchTerms:(''),
  selectedId:null,
  showActions:[],
  productToEdit: null,
  showModal: false,
  error:"",
  infoUserReservation:{
    nombre:"",apellido:"",cedula:"", telefono:"",pais: "",direccion: "",detalles: "",ciudad: "",provincia: "",codigoPostal: "",
    startDate: "",endDate:"", totalCost:"",addressId:0, saveData:false,productName:"",envio:true,tiendaId:0,
  },
  errorReservation:{
    nombre: "",apellido: "",cedula: "",telefono: "", pais: "",direccion: "", ciudad: "",provincia: "",codigoPostal: "",terminos:"",
  },
  userRegister:{ 
    nombre: "", apellido: "",correo: "",contraseña: "",contraseñaRepetida: "",
  },
  errorRegister:{nombre: "",apellido: "",correo: "",contraseña: "",contraseñaRepetida: "",
  },
  userLogin:{ 
    email: "",password: ""
  },
  errorLogin:{
    email: "",password: "",general: "",
  },


}
const ContextGlobal = createContext();

const reducer = (state, action)=>{

  switch(action.type) {
    case "GET_PRODUCTS":
      return{...state, productsPaginados: action.payload,} // y obtengo lista de productos
    case "GET_CATEGORIES":
      return{...state, categoriesPaginados: action.payload,} // y obtengo lista de categorias
    case "GET_USERS":
      return{...state, usersPaginados: action.payload,} // y obtengo lista de users
    case "GET_RESERVATIONS":
      return{...state, reservationsPaginados: action.payload,} // y obtengo lista de reservaciones
    case "GET_PRODUCT_BY_ID":
      return{...state, productId: action.payload,} // y obtengo lista de reservaciones
    case "GET_USER_INFO":
      return{...state, infoUser: action.payload,} // y obtengo informacion del usuario actual
    case "GET_DIRECTIONS":
      return{...state,directionList: action.payload} //obtengo direcciones del usuario antiguas
    case "SET_USER_INFO_RESERVA":
      return {
        ...state,infoUserReservation: {...state.infoUserReservation,...action.payload,}, // Actualiza solo las propiedades enviadas en el payload      
      };
    case "SET_ERROR_RESERVA":
      return{...state, errorReservation: action.payload,} // obtengo la informacion de los inputs 
    case "RESET_USER_INFO_RESERVA":
      return{...state, infoUserReservation:{nombre:"",apellido:"",cedula:"", telefono:"",pais: "",direccion: "",detalles: "",ciudad: "",provincia: "",codigoPostal: "",
        startDate: "",endDate:"", totalCost:"",addressId:0, saveData:false,productName:"",envio:true,tiendaId:0}, 
        errorReservation:{nombre: "",apellido: "",cedula: "",telefono: "", pais: "",direccion: "", ciudad: "",provincia: "",codigoPostal: "",terminos:""}
        }
    case "SET_USER_INFO_LOGIN":
      return {
        ...state,userLogin: {...state.userLogin,...action.payload,}, // Actualiza solo las propiedades enviadas en el payload      
      };
    case "SET_ERROR_LOGIN":
      return{...state, errorLogin: action.payload,} // obtengo la informacion de los inputs 
    case "DELETE_PRODUCT":
      return {
        ...state,
        productsPaginados: state.productsPaginados.filter(
          (product) => product.productId !== action.payload // elimina el producto de acuerdo al id del producto que le pasen
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categoriesPaginados: state.categoriesPaginados.filter(
          (categorie) => categorie.id !== action.payload // elimina el producto de acuerdo al id del producto que le pasen
        ),
      };
    case "DELETE_USERS":
      return {
        ...state,
        usersPaginados: state.usersPaginados.filter(
          (user) => user.userId !== action.payload // elimina el producto de acuerdo al id del producto que le pasen
        ),
      };
    case "GET_ID":
      return{...state, selectedId: action.payload}
    case "SHOW_MODAL":
      return {...state, showModal: true};
    case "HIDDEN_MODAL":
      return {...state, showModal: false};
    case ("INITIALIZE_SHOWACTIONS"):
      return{...state, showActions:action.payload}
    case("TOGGLE_CHECK"):
      return{...state,infoUserReservation:{...state.infoUserReservation, saveData: !state.infoUserReservation.saveData} }
    case "TOGGLE_SHOW_ACTIONS":
      return {...state,
        showActions: state.showActions.map((visible, index) =>
          index === action.payload ? !visible : false // Alterna el estado del índice actual, resetea los demás
        ),
      };
    case "RESET_SHOW_ACTIONS":
      return {
        ...state,
        showActions: state.showActions.map(() => false), // Resetea todos los menús de acciones
      };
    case"TOGGLE_OPEN":
      return{...state,isVisible:!isVisible};
    case "SET_ERROR":
      return {...state,error:action.payload}
    case "SHOW_MODAL_GLOBAL":
      return {...state, modalData: {isOpen:true, ...action.payload}} // muestro el modal global del error en favoritos
    case "HIDE_MODAL_GLOBAL":
      return {...state, modalData: {isOpen: false}}  // escondo el modal global del error en favoritos
    default:
    throw new Error();
  }
};

const ContextProvider = ({ children }) => {

  const[state,dispatch]=useReducer(reducer, initialState);
  
 
  return (
    <ContextGlobal.Provider value={{state,dispatch}}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider;

export const useContextGlobal= () => useContext(ContextGlobal);