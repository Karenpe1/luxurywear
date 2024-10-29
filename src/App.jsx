import Header from "./components/Header.jsx";
import Detail from "./Routes/Detail.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.jsx";
import appStyles from "./styles/App.module.css";

function App() {
  return (
    <Router>
      <Header />
      <div className={appStyles.container}>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
