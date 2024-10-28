import Body from "./components/Body.jsx";
import Header from "./components/Header.jsx";
import TopRentas from "./components/TopRentas.jsx";
import Detail from "./Routes/Detail.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/">
              <Body/>
              <TopRentas/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
