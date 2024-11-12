import NewHeader from "./components/NewHeader.jsx";
import Detail from "./Routes/Detail.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Routes/Home.jsx";
import appStyles from "./styles/App.module.css";
import Login from "./Routes/Login";
import Admin from "./Routes/Admin.jsx";
import Register from "./Routes/Register.jsx";
import Search from "./components/Search.jsx";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import NewFooter from "./components/NewFooter.jsx";
import PaginatedProductList from "./components/PaginatedProductList";

function App() {
  const location = useLocation();
  const isLocation = location.pathname === "/register";

  return (
    <AuthProvider>
    {!isLocation && (
      <>
      <NewHeader />
      <Search />
      </>  )/*condicion para no mostrar el header en el registro */} 
        <div className={appStyles.container}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <Admin />
                </PrivateRoute>
              }
            />
            {/* Dynamic category route */}
            <Route
              path="/:categoryName"
              element={<PaginatedProductList />}
            />
          </Routes>
        </div>
      {!isLocation && <NewFooter />}
    </AuthProvider>
  );
}

export default App;
