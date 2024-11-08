// src/App.jsx
import NewHeader from "./components/NewHeader.jsx";
import Footer from "./components/Footer.jsx"; // Importa el Footer
import Detail from "./Routes/Detail.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.jsx";
import appStyles from "./styles/App.module.css";
import Admin from "./Routes/Admin.jsx";
import Register from "./Routes/Register.jsx";
import Search from "./components/Search.jsx";

function App() {
  return (
    <Router>
      <NewHeader />
      <Search/>
      <div className={appStyles.container}>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
      <Footer /> {/* Coloca el footer aquí */}
    </Router>
  );
}

export default App;