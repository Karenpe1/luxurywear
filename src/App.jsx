// src/App.jsx
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx"; // Importa el Footer
import Detail from "./Routes/Detail.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.jsx";
import appStyles from "./styles/App.module.css";
import Login from "./Routes/Login"

function App() {
  return (
    <Router>
      <Header />
      <div className={appStyles.container}>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* Ruta de inicio de sesión */}
        </Routes>
      </div>
      <Footer /> {/* Coloca el footer aquí */}
    </Router>
  );
}

export default App;