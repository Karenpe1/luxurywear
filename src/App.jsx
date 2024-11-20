import NewHeader from "./components/NewHeader.jsx";
import Detail from "./Routes/Detail.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Routes/Home.jsx";
import appStyles from "./styles/App.module.css";
import Login from "./Routes/Login";
import Register from "./Routes/Register.jsx";
import Search from "./components/Search.jsx";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import NewFooter from "./components/NewFooter.jsx";
import PaginatedProductList from "./components/PaginatedProductList";
import NewAdmin from "./Routes/NewAdmin.jsx";
import FavList from "./Routes/FavList.jsx";

function App() {
  const location = useLocation();
  const isLocation = location.pathname === "/register";
  const currentPath = location.pathname;

  return (
    <AuthProvider>
    {!isLocation && (
      <>
      <NewHeader />
      {currentPath == "/" && <Search/>}
      </>  )/*condicion para no mostrar el header en el registro */} 
        <div className={appStyles.container}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/favList"
              element={
                <PrivateRoute>
                  <FavList />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <NewAdmin />
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
