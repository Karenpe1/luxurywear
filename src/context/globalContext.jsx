import { createContext, useContext, useEffect, useReducer } from "react";



const initialState = {
  modalData:{isOpen:false, img:"",titulo: "", subtitulo:"", mensaje:"",},
  productsPaginados:[],
  categoriesPaginados:[],
  usersPaginados:[],
  reservationsPaginados:[],
  selectedId:null,
  showActions:[],
  productToEdit: null,
  showModal: false,
  error:"",

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