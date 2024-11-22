import { useContext, useEffect, useState } from "react";
import styles from "../styles/NewAdmin.module.css";
import { formatCurrency } from "../Utils/currencyFormatter";
import axiosInstance from "../Utils/axiosInstance";
import CategoryForm from "../components/CategoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../context/AuthContext";
import {
  faUsers,
  faList,
  faLayerGroup,
  faUserTie,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../components/Table";
import { useParams } from "react-router-dom";
import ProductsForm from "../components/ProductsForm";

const NewAdmin = ({pageSize=6}) => {
  const [tab, setTab] = useState("Productos");
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const [showModalAdmin, setShowModalAdmin] = useState(false);
  const [showModalCategorie, setShowModalCategorie] = useState(false);
  const [showActions, setShowActions] = useState([]);
  const [showActionsUsers, setShowActionsUsers] = useState([]);
  const [showActionsCategories, setShowActionsCategories] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCategorieId, setSelectedCategorieId] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProducModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal]= useState(false)
  const { logoutUser } = useContext(AuthContext);
  const [reload, setReload]= useState(false);
  const axios = axiosInstance();

  //prueba
  const [productsPaginados, setProductsPaginados] = useState([]); // Stores product data
  const [userPaginados, setUserPaginados] = useState([]); // Stores user data
  const [categoriesPaginados, setCategoriesPaginados] = useState([]); // Stores categories data
  const [currentPage, setCurrentPage] = useState(0); // Tracks current page
  const [totalPages, setTotalPages] = useState(0); // Tracks total pages
  const [totalElements, setTotalElements] = useState(0);
  const [numElements, setNumElements] = useState(0);
  const [currentPageUser, setCurrentPageUser] = useState(0); // Tracks current page
  const [totalPagesUser, setTotalPagesUser] = useState(0); // Tracks total pages
  const [totalElementsUser, setTotalElementsUser] = useState(0);
  const [numElementsUser, setNumElementsUser] = useState(0);
  const [currentPageCategories, setCurrentPageCategories] = useState(0); // Tracks current page
  const [totalPagesCategories, setTotalPagesCategories] = useState(0); // Tracks total pages
  const [totalElementsCategories, setTotalElementsCategories] = useState(0);
  const [numElementsCategories, setNumElementsCategories] = useState(0);
  const [error, setError] =useState("")
  const { categoryName } = useParams(); // Get categoryName from URL

  // Fetch de los productos paginados
  useEffect(() => {
    const fetchProducts = async () => {

      try {
        const response = await axios.get(`/api/v1/products/paginated`, {
          params: {
            page: currentPage,
            size: pageSize,
            category: categoryName || "",
          },
        });

        const data = response.data;
        setProductsPaginados(data.content); // Set product data
        setTotalPages(data.totalPages); // Set total pages from response
        setTotalElements(data.totalElements);
        setNumElements(data.numberOfElements);
      } catch (err) {
        setError("Error fetching products"); // Set error if request fails
      }
    };

    fetchProducts();
  }, [categoryName, currentPage,reload]);

    // fetch de los usuarios paginados 
  useEffect(() => {
    const fetchUser = async () => {

      try {
        const response = await axios.get(`/api/v1/users/paginated`, {
          params: {
            page: currentPageUser,
            size: pageSize,
          },
        });

        const data = response.data;
        console.log("contenido de paginado", data);
        setUserPaginados(data.content); // Set product data
        setTotalPagesUser(data.totalPages); // Set total pages from response
        setTotalElementsUser(data.totalElements);
        setNumElementsUser(data.numberOfElements);
      } catch (err) {
        setError("Error fetching users"); // Set error if request fails
      }
    };

    fetchUser();
  }, [ currentPageUser]);
  
  // fetch de los categorias paginados 
  useEffect(() => {
    const fetchCategoria = async () => {

      try {
        const response = await axios.get(`/api/v1/categories/paginated`, {
          params: {
            page: currentPageCategories,
            size: pageSize,
          },
        });

        const data = response.data;
        console.log("contenido de paginado", data);
        setCategoriesPaginados(data.content); // Set product data
        setTotalPagesCategories(data.totalPages); // Set total pages from response
        setTotalElementsCategories(data.totalElements);
        setNumElementsCategories(data.numberOfElements);
      } catch (err) {
        setError("Error fetching categoria"); // Set error if request fails
      }
    };

    fetchCategoria();
  }, [ currentPageCategories,reload]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageChangeUser = (page) => {
    setCurrentPageUser(page);
  };
  const handlePageChangeCategories = (page) => {
    setCurrentPageCategories(page);
  };

  // Calculate the range of products displayed
  const startRange = currentPage * pageSize + 1;
  const endRange = Math.min(startRange + numElements - 1, totalElements);
    // Calculate the range of products displayed
    const startRangeUser = currentPageUser * pageSize + 1;
    const endRangeUser = Math.min(startRangeUser + numElementsUser - 1, totalElementsUser);

    const startRangeCategories = currentPageCategories * pageSize + 1;
    const endRangeCategories = Math.min(startRangeCategories + numElementsCategories - 1, totalElementsCategories);
  
  useEffect(() => {
    // Llamada a la API para obtener listado de productos
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products`
        );
        const data = await response.data;
        setProducts(data);
        setShowActions(data.map(() => false));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener listado de productos
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/categories`
        );
        const data = await response.data;
        console.log(data);
        setCategories(data);
        setShowActionsCategories(data.map(() => false));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener listado de usuarios
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/users`);
        const data = await response.data;
        setUsers(data);
        setShowActionsUsers(data.map(() => false));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const handleDeleteClickUser = (id) => {
    setSelectedUserId(id);
    setShowModalUser(true);
  };
  const handleDeleteClickCategorie = (id) => {
    setSelectedCategorieId(id);
    setShowModalCategorie(true);
  };
 
  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/products/${id}`);
      const productData = response.data;
      console.log("data a editar", productData)
      setSelectedProductId(id); // Almacena el ID seleccionado
      setProductToEdit({
        productId: productData.productId,
        name: productData.name,
        reference: productData.reference,
        description: productData.description,
        material: productData.material,
        color: productData.color,
        designer: productData.designer,
        price: productData.price,
        images: productData.images || [],
        categories: productData.category?
          {
            value: productData.category.id,
            label: productData.category.name,
          }
        :null,
        sizes: productData.sizes.map((size) => ({
          value: size.id,
          label: size.size,
        })),
      });
      setShowEditModal(true);   // Abre el modal para edición
    } catch (error) {
      console.error("Error fetching product data for edit:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/products/delete-product/${selectedProductId}`
      );
      setProducts(
        products.filter((product) => product.productId !== selectedProductId)
      ); // Remove product from list
      setShowModal(false);
      setReload((prev) => !prev); // Actualizar la tabla
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const confirmDeleteUser = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/users/delete-user/${selectedUserId}`
      );
      setUsers(users.filter((user) => user.userId !== selectedUserId)); // Remove product from list
      setShowModalUser(false);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  const confirmDeleteCategories = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/categories/delete-category/${selectedCategorieId}`
      );
      setCategories(
        categories.filter((categorie) => categorie.id !== selectedCategorieId)
      ); // Remove product from list
      setShowModalCategorie(false);
      setReload((prev) => !prev); // Actualizar la tabla
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const confirmChangePermissions = async () => {
    try {
      if (selectedUserRole == "ADMIN")
        await axios.put(`http://localhost:8080/api/v1/users/remove-admin`, {
          email: selectedUserEmail,
        });
      else
        await axios.put(`http://localhost:8080/api/v1/users/set-admin`, {
          email: selectedUserEmail,
        });
      setShowModalAdmin(false);

      // Si se quitó el rol "ADMIN" y el usuario actual es el mismo que el modificado
      if (selectedUserRole === "ADMIN" && users.email === selectedUserEmail) {
      console.log("Se quitó el rol ADMIN al usuario actual, cerrando sesión...");
      logoutUser(); // Desloguea al usuario actual
      }
      const fetchUsers = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/users`
          );
          const data = await response.data;
          setUsers(data);
          setShowActionsUsers(data.map(() => false));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchUsers();
    } catch (error) {
      console.error("Error setting permissions:", error);
    }
  };

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


  const handleCloseEditProduct=()=>{
    console.log("Cerrando modal de edición...")
    setShowEditModal(false);
    setProductToEdit(null);
    setReload((prev)=> !prev)
  }
  

  const handleShowActionsCategorie = (i) => {
    setShowActionsCategories((prev) => {
      const updated = prev.map((_, index) =>
        index === i ? !prev[index] : false
      );
      console.log("Updated showActions:", updated); // Verifica el estado actualizado
      return updated;
    });
  };

  const handleShowActions = (i) => {
    setShowActions((prev) => {
      const updated = prev.map((_, index) =>
        index === i ? !prev[index] : false
      );
      return updated;
    });
  };

  const handleShowActionsUsers = (i) => {
    setShowActionsUsers(
      showActionsUsers.map((_, index, arr) => {
        if (index === i) {
          if (arr[index] === true) return false;
          else return true;
        } else return false;
      })
    );
  };

  const handleClickAdmin = (email, role) => {
    setSelectedUserEmail(email);
    setSelectedUserRole(role);
    setShowModalAdmin(true);
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
          <FontAwesomeIcon icon={faLayerGroup} /> Categorias
        </span>
      </div>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>¿Estás seguro de que deseas eliminar este producto?</h3>
            <button onClick={confirmDelete} className={styles.confirmButton}>
              Confirmar
            </button>
            <button
              onClick={() => setShowModal(false)}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {showModalUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>¿Estás seguro de que deseas eliminar este usuario?</h3>
            <button
              onClick={confirmDeleteUser}
              className={styles.confirmButton}
            >
              Confirmar
            </button>
            <button
              onClick={() => setShowModalUser(false)}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {showModalCategorie && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>¿Estás seguro de que deseas eliminar esta categoria?</h3>
            <button
              onClick={confirmDeleteCategories}
              className={styles.confirmButton}
            >
              Confirmar
            </button>
            <button
              onClick={() => setShowModalCategorie(false)}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {showModalAdmin && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>
              ¿Estás seguro de que deseas cambiar los permisos de este usuario?
            </h3>
            <button
              onClick={confirmChangePermissions}
              className={styles.confirmButton}
            >
              Confirmar
            </button>
            <button
              onClick={() => setShowModalAdmin(false)}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <div className={styles.notAvailable}>
        <img className={styles.ohNo} src="ohNo.png" />
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
      {showProducModal && (
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
      {showEditModal && productToEdit &&  (
         <div className={styles.categoryModalOverlayProducts}
         onClick={handleCloseEditProduct}>
           <div className={styles.categoryModalContentProduct}
           onClick={(e)=>e.stopPropagation()}>
             <ProductsForm 
             onClose={handleCloseEditProduct} 
             clase={styles.categoryModalCancelButton}
             isEdit={true}
             initialData={productToEdit}/>
           </div>
         </div>
      )}
      <div className={styles.panel}>
        <div className={styles.containerTitles}>
          <div className={styles.titles}>
            <div className={styles.title}>{tab}</div>
              {tab == "Categoria" && 
              (<button
                  className={styles.addCategoryButton}
                  onClick={handleOpenCategoryModal}
              >
                  Agregar categoría
              </button>)}
              {tab == "Productos" && 
              (<button 
                  className={styles.addCategoryButton} 
                  onClick={handleOpenProductModal}>
                    agregar Producto
                </button>)}
          </div>
          <div className={styles.buscar}>
                    <input className={styles.inputBuscar} type="text" placeholder="Buscar Productos."/>
            </div>
        </div>

        {tab == "Productos" && (
          <Table
            headers={[
              "ID",
              "Nombre",
              "Referencia",
              "Color",
              "Diseñador",
              "Valor",
              "Categoría",
              "Imagen",
            ]}
            rows={productsPaginados.map((product) => ({
              ID: product.productId,
              Nombre: product.name,
              Referencia: product.reference,
              Color: product.color,
              Diseñador: product.designer,
              Valor: formatCurrency(product.price, "es-CO", "COP"),
              Categoría: product.category.name,
              Imagen: (
                <div className={styles.containerImage}>
                  <img
                    className={styles.prodImage}
                    src={`http://localhost:8080${product.images[0].url}`}
                    alt={product.name}
                    onError={(e) => {
                      const fallback1 = `http://localhost:8080/${product.images[0].url}`; // First fallback image
                      const fallback2 = "placeholder.svg"; // Second fallback image

                      if (e.target.src === `http://localhost:8080${product.images[0].url}`) {
                        e.target.src = fallback1; // Switch to the first fallback
                      } else if (e.target.src === fallback1) {
                        e.target.src = fallback2; // Switch to the second fallback
                      } else {
                        e.target.onerror = null; // Prevent infinite fallback loop
                      }
                    }}
                  />
                </div>
              ),
            }))}
            renderActions={(row, idx) => (
              <td className={styles.cells}>
                <div className={styles.actions}>
                  <img
                    className={styles.dots}
                    src="dots.png"
                    onClick={(e) => {
                      e.stopPropagation(); // Detiene la propagación del evento click
                      handleShowActions(idx); // Llama a tu función de manejo
                    }}
                  />
                </div>
                {showActions[idx] && (
                  <div
                    className={styles.actionsMenuContainer}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowActions(idx);}}
                  >
                    <div className={styles.actionsMenu}>
                      <span className={styles.action} onClick={()=>handleEditClick(row.ID)}>Editar</span>
                      <span
                        className={styles.action}
                        onClick={() => handleDeleteClick(row.ID)}
                      >
                        Eliminar
                      </span>
                    </div>
                  </div>
                )}
              </td>
            )}
            showActions={showActions}
            handleShowActions={handleShowActions}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            startRange={startRange}
            endRange={endRange}
            totalElements={totalElements}
          />
        )}
        {tab == "Usuarios" && (
          <Table
            headers={["ID", "Nombre", "Apellido", "Email", "Rol"]}
            rows={userPaginados.map((user) => ({
              ID: user.userId,
              Nombre: user.first_name,
              Apellido: user.last_name,
              Email: user.email,
              Rol: user.userRole,
            }))}
            renderActions={(row, idx) => (
              <td className={styles.cells}>
                <div className={styles.actions}>
                  <img
                    className={styles.dots}
                    src="dots.png"
                    onClick={() => handleShowActions(idx)} // Correctamente llama a la función
                  />
                </div>
                {showActions[idx] && (
                  <div
                    className={styles.actionsMenuContainer}
                    onClick={() => handleShowActions(idx)}
                  >
                    <div className={styles.actionsMenuUser}>
                      <span
                        className={styles.action}
                        onClick={() => handleClickAdmin(row.Email, row.Rol)}
                      >
                        Permisos
                      </span>
                      <span
                        className={styles.action}
                        onClick={() => handleDeleteClickUser(row.ID)}
                      >
                        Eliminar
                      </span>
                    </div>
                  </div>
                )}
              </td>
            )}
            showActions={showActionsUsers}
            handleShowActions={handleShowActionsUsers}
            currentPage={currentPageUser}
            onPageChange={handlePageChangeUser}
            totalPages={totalPagesUser}
            startRange={startRangeUser}
            endRange={endRangeUser}
            totalElements={totalElementsUser}
          />
        )}
        {tab == "Categoria" && (
          <Table
            headers={["ID", "Nombre", "Descripción", "Imagen"]}
            rows={categoriesPaginados.map((categorie) => ({
              ID: categorie.id,
              Nombre: categorie.name,
              Description: categorie.description,
              Image: (
                <div className={styles.containerImage}>
                  <img
                    className={styles.prodImage}
                    src={`http://localhost:8080${categorie.cover.url}`}
                    alt={categorie.name}
                    onError={(e) => {
                      e.target.src = "placeholder.svg"; // Fallback image
                      e.target.onerror = null; // Prevent infinite fallback loop
                    }}
                  />
                </div>
              ),
            }))}
            renderActions={(row, idx) => (
              <td className={styles.cells}>
                <div className={styles.actions}>
                  <img
                    className={styles.dots}
                    src="dots.png"
                    onClick={() => handleShowActions(idx)} // Correctamente llama a la función
                  />
                </div>
                {showActions[idx] && (
                  <div
                    className={styles.actionsMenuContainer}
                    onClick={() => handleShowActions(idx)}
                  >
                    <div className={styles.actionsMenuCategorie}>
                      <span
                        className={styles.action}
                        onClick={() => handleDeleteClickCategorie(row.ID)}
                      >
                        Eliminar
                      </span>
                    </div>
                  </div>
                )}
              </td>
            )}
            showActions={showActionsCategories}
            handleShowActions={handleShowActionsCategorie}
            currentPage={currentPageCategories}
            onPageChange={handlePageChangeCategories}
            totalPages={totalPagesCategories}
            startRange={startRangeCategories}
            endRange={endRangeCategories}
            totalElements={totalElementsCategories}
          />
        )}
      </div>
    </div>
  );
};

export default NewAdmin;