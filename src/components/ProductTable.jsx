import { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { useParams } from "react-router-dom";
import Table from "./Table";
import { formatCurrency } from "../Utils/currencyFormatter";
import styles from "../styles/NewAdmin.module.css";
import ProductsForm from "../components/ProductsForm";
import { useContextGlobal } from "../context/globalContext";
import ModalConfirm from "./ModalConfirm";
import ProductImage from "./ProductImage.jsx";

const ProductTable = ({ pageSize = 6, reload, setReload }) => {
  //cosas que se deben tener por cada table
  const {state,dispatch}=useContextGlobal();
  const [productToEdit, setProductToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Tracks current page
  const [totalPages, setTotalPages] = useState(0); // Tracks total pages
  const [totalElements, setTotalElements] = useState(0);
  const [numElements, setNumElements] = useState(0);
  const { categoryName } = useParams(); // Get categoryName from URL
  const axios = axiosInstance();
  
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
        dispatch({type:"GET_PRODUCTS", payload:data.content}) //obtener la lista de productos
        dispatch({type:"INITIALIZE_SHOWACTIONS", payload:data.content.map(()=>false)}) // Inicializar los menús de acción
        setTotalPages(data.totalPages); // Set total pages from response
        setTotalElements(data.totalElements);
        setNumElements(data.numberOfElements);
      } catch (err) {
        dispatch({type:"SET_ERROR", payload:"Error fetching products" })
      }
    };

    fetchProducts();
  }, [categoryName, currentPage, reload]);

  // Calculate the range of products displayed
  const startRange = currentPage * pageSize + 1;
  const endRange = Math.min(startRange + numElements - 1, totalElements);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const handleShowActions = (i) => {
    dispatch({type:"TOGGLE_SHOW_ACTIONS", payload:i})
  };

  const handleCloseEditProduct = () => {
    console.log("Cerrando modal de edición...");
    dispatch({type:("HIDDEN_MODAL")})
    setProductToEdit(null);
    setReload((prev) => !prev);
  };

  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(
        `/api/v1/products/${id}`
      );
      const productData = response.data;
      dispatch({type:"GET_ID",id})
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
        categories: productData.category
        ? {
          value: productData.category.id,
          label: productData.category.name,
        }
        : null,
        sizes: productData.sizes.map((size) => ({
          id: size.id,
          size: size.size,
          value: size.id,
          label: size.size,
        })),
      });
      dispatch({type:"SHOW_MODAL"}) // Abre el modal para edición
    } catch (error) {
      console.error("Error fetching product data for edit:", error);
    }
  };
  
  const handleDeleteClick = (id) => {
    dispatch({type:"GET_ID",payload:id})
    dispatch({type:"SHOW_MODAL"})
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `/api/v1/products/delete-product/${state.selectedId}`
      );
      dispatch({type:"DELETE_PRODUCT", payload: state.selectedId}) //eliminar el producto de la lista
      dispatch({type:"HIDDEN_MODAL"}) // se cierra el modal
      setReload((prev) => !prev); // Actualizar la tabla
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <>
      {state.showModal && productToEdit && (
        <div
          className={styles.productModalOverlay}
          onClick={handleCloseEditProduct}
        >
          <div
            className={styles.productModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <ProductsForm
              onClose={handleCloseEditProduct}
              clase={styles.categoryModalCancelButton}
              isEdit={true}
              initialData={productToEdit}
            />
          </div>
        </div>
      )}
      {state.showModal && !productToEdit &&(
        <ModalConfirm
        title="¿Estás seguro de que deseas eliminar este producto?"
        onClick={confirmDelete}
        onClick2={() => dispatch({type:"HIDDEN_MODAL"})}
        />
      )}
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
        rows={state.productsPaginados.map((product) => ({
          ID: product.productId,
          Nombre: product.name,
          Referencia: product.reference,
          Color: product.color,
          Diseñador: product.designer,
          Valor: formatCurrency(product.price, "es-CO", "COP"),
          Categoría: product.category.name,
          Imagen: (
            <div className={styles.containerImage}>
              <ProductImage
                src={`${product.images[0].url}`}
                alt={product.name}
                className={styles.prodImage}
              />
            </div>
          ),
        }))}
        renderActions={(row, idx) => (
          <td className={styles.cells}>
            <div className={styles.actions}>
              <img
                className={styles.dots}
                src="/dots.png"
                alt={"Botón acciones"}
                onClick={(e) => {
                  e.stopPropagation(); // Detiene la propagación del evento clic
                  handleShowActions(idx); // Llama a tu función de manejo
                }}
              />
            </div>
            {state.showActions[idx] && (
              <div
                className={styles.actionsMenuContainer}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowActions(idx);
                }}
              >
                <div className={styles.actionsMenu}>
                  <span
                    className={styles.action}
                    onClick={() => handleEditClick(row.ID)}
                  >
                    Editar
                  </span>
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
        showActions={state.showActions}
        handleShowActions={handleShowActions}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        startRange={startRange}
        endRange={endRange}
        totalElements={totalElements}
      />
    </>
  );
};

export default ProductTable;
