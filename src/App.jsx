// src/App.jsx
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx"; // Importa el Footer
import Detail from "./Routes/Detail.jsx";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Routes/Home.jsx";
import appStyles from "./styles/App.module.css";
import Admin from "./Routes/Admin.jsx";
import Register from "./Routes/Register.jsx";

function App() {

  const location = useLocation();
  const isLocation = location.pathname === "/register";
  return (
    <>

    {!isLocation && <Header /> /*condicion para no mostrar el header en el registro */} 
        <div className={appStyles.container}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      {!isLocation && <Footer /> }

    </>
  );
}

export default App;
