import { createContext, useContext, useReducer } from "react";


const initialState = {
  modalData:{isOpen:false, img:"",titulo: "", subtitulo:"", mensaje:"",},
}
const ContextGlobal = createContext();

const reducer = (state, action)=>{

  switch(action.type) {
    
    case "SHOW_MODAL":
      return {...state, modalData: {isOpen:true, ...action.payload}}
    case "HIDE_MODAL":
      return {...state, modalData: {isOpen: false}}
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