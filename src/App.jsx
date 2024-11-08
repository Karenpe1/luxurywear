// src/App.jsx
import NewHeader from "./components/NewHeader.jsx";
import Footer from "./components/Footer.jsx"; // Importa el Footer
import Detail from "./Routes/Detail.jsx";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Routes/Home.jsx";
import appStyles from "./styles/App.module.css";
import Login from "./Routes/Login"
import Admin from "./Routes/Admin.jsx";
import Register from "./Routes/Register.jsx";
import Search from "./components/Search.jsx";

function App() {

  const location = useLocation();
  const isLocation = location.pathname === "/register";
  return (
    <>

    {!isLocation &&  ( 
      <>
      <NewHeader />
      <Search/>
      </>  )/*condicion para no mostrar el header en el registro */} 
        <div className={appStyles.container}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> {/* Ruta de inicio de sesión */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      {!isLocation && <Footer /> }

    </>
  );
}

export default App;
