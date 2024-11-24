import { useState } from "react";
import styles from "../styles/NewAdmin.module.css";
import CategoryForm from "../components/CategoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faList, faLayerGroup, faUserTie, faInbox } from "@fortawesome/free-solid-svg-icons";
import ProductsForm from "../components/ProductsForm";
import ProductTable from "../components/ProductTable";
import CategoryTable from "../components/CategoryTable";
import UserTable from "../components/UserTable";

const NewAdmin = () => {
  const [tab, setTab] = useState("Productos");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [reload, setReload]= useState(false);

  const handleSelectTab = (tab) => {
    setTab(tab);
  };

  const handleOpenCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
    setReload((prev) => !prev); // Actualizar la tabla
  };

  const handleOpenProductModal= ()=>{
    setShowProductModal(true);
  };

  const handleCloseProductModal=()=>{
    setShowProductModal(false);
    setReload((prev)=> !prev)
  };

  const getPlaceholder = (tab) => {
    switch (tab) {
      case "Categoria":
        return "Buscar Categorías";
      case "Productos":
        return "Buscar Productos";
      case "Usuarios":
        return "Buscar Usuarios";
      default:
        return "Buscar Reservas";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h2 className={styles.titlePanel}>
          <FontAwesomeIcon icon={faInbox} />
          Panel Admin
        </h2>
        <span className={styles.tab} onClick={() => handleSelectTab("Admin")}>
          {" "}
          <FontAwesomeIcon icon={faUserTie} /> Admin
        </span>
        <span
          className={styles.tab}
          onClick={() => handleSelectTab("Productos")}
        >
          {" "}
          <FontAwesomeIcon icon={faList} />
          Productos
        </span>
        <span
          className={styles.tab}
          onClick={() => handleSelectTab("Usuarios")}
        >
          {" "}
          <FontAwesomeIcon icon={faUsers} /> Usuarios
        </span>
        <span
          className={styles.tab}
          onClick={() => handleSelectTab("Categoria")}
        >
          <FontAwesomeIcon icon={faLayerGroup} /> Categorías
        </span>
      </div>
      <div className={styles.notAvailable}>
        <img className={styles.ohNo} src="/ohNo.png" alt={"Oh no"} />
        <h1>No está disponible para móviles ni tablet</h1>
      </div>
      {showCategoryModal && (
        <div
          className={styles.categoryModalOverlay}
          onClick={handleCloseCategoryModal}
        >
          <div
            className={styles.categoryModalContent}
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >  
            <CategoryForm
              onClose={handleCloseCategoryModal}
              clase={styles.categoryModalCancelButton}
            />
          </div>
        </div>
      )}
      {showProductModal && (
        <div className={styles.categoryModalOverlayProducts}
        onClick={handleCloseProductModal}>
          <div className={styles.categoryModalContentProduct}
          onClick={(e)=>e.stopPropagation()}>
            <ProductsForm 
            onClose={handleCloseProductModal} 
            clase={styles.categoryModalCancelButton}/>
          </div>
        </div>
      )}
      <div className={styles.panel}>
        <div className={styles.containerTitles}>
          <div className={styles.titles}>
            <div className={styles.title}>{tab}</div>
              {tab === "Categoria" &&
              (<button
                  className={styles.addCategoryButton}
                  onClick={handleOpenCategoryModal}
              >
                  Agregar Categoría
              </button>)}
              {tab === "Admin" &&
              (<button
                  className={styles.addCategoryButton}
                  onClick={handleOpenCategoryModal}
              >
                  Agregar Categoría
              </button>)}
              {tab === "Productos" &&
              (<button 
                  className={styles.addCategoryButton} 
                  onClick={handleOpenProductModal}>
                    Agregar Producto
                </button>)}
              
          </div>
          <div className={styles.buscar}>
            <input
              className={styles.inputBuscar}
              type="text"
              placeholder={getPlaceholder(tab)}
            />
          </div>
        </div>

        {tab === "Productos" && (
          <ProductTable reload={reload} setReload={setReload}/>
        )}
        {tab === "Categoria" && (
          <CategoryTable reload={reload} setReload={setReload}/>
        )}
        {tab === "Usuarios" && (
          <UserTable reload={reload} setReload={setReload}/>
        )}
        
      </div>
    </div>
  );
};

export default NewAdmin;