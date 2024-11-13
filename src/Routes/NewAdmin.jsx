import { useEffect, useState } from "react";
import styles from "../styles/NewAdmin.module.css";
import { formatCurrency } from "../Utils/currencyFormatter";
import axiosInstance from "../Utils/axiosInstance";
import CategoryForm from "../components/CategoryForm";

const NewAdmin = () => {

    const [tab, setTab] = useState("Productos");
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalAdmin, setShowModalAdmin] = useState(false);
    const [showActions, setShowActions] = useState([]);
    const [showActionsUsers, setShowActionsUsers] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserEmail, setSelectedUserEmail] = useState(null);
    const [selectedUserRole, setSelectedUserRole] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const axios = axiosInstance();

    useEffect(() => {
        // Llamada a la API para obtener listado de productos
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/products`);
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
        // Llamada a la API para obtener listado de usuarios
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/users`);
            const data = await response.data;
            setUsers(data);
            setShowActionsUsers(data.map(() => false));
          } catch (error) {
            console.error("Error fetching products:", error);
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

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/products/delete-product/${selectedProductId}`);
            setProducts(products.filter((product) => product.productId !== selectedProductId)); // Remove product from list
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const confirmDeleteUser = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/users/delete-user/${selectedUserId}`);
            setUsers(users.filter((user) => user.userId !== selectedUserId)); // Remove product from list
            setShowModalUser(false);
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const confirmChangePermissions = async () => {
        try {
            if(selectedUserRole == "ADMIN")
            await axios.put(`http://localhost:8080/api/v1/users/remove-admin`, {email: selectedUserEmail});
            else
            await axios.put(`http://localhost:8080/api/v1/users/set-admin`, {email: selectedUserEmail});
            setShowModalAdmin(false);
            location.reload();
        } catch (error) {
            console.error("Error setting permissions:", error);
        }
    };

    const handleSelectTab = (tab) => {
        setTab(tab);
    }

    const handleOpenCategoryModal = () => {
        setShowCategoryModal(true);
    };

    const handleCloseCategoryModal = () => {
        setShowCategoryModal(false);
    };

    const handleShowActions = (i) => {
        setShowActions(showActions.map((_, index, arr) => {if(index === i) {if(arr[index] === true) return false; else return true;} else return false}));
    }

    const handleShowActionsUsers = (i) => {
        setShowActionsUsers(showActionsUsers.map((_, index, arr) => {if(index === i) {if(arr[index] === true) return false; else return true;} else return false}));
    }

    const handleClickAdmin = (email, role) => {
        setSelectedUserEmail(email);
        setSelectedUserRole(role);
        setShowModalAdmin(true);
    }

    return (
        <div className={styles.container}>
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>¿Estás seguro de que deseas eliminar este producto?</h3>
                        <button onClick={confirmDelete} className={styles.confirmButton}>Confirmar</button>
                        <button onClick={() => setShowModal(false)} className={styles.cancelButton}>Cancelar</button>
                    </div>
                </div>
            )}
            {showModalUser && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>¿Estás seguro de que deseas eliminar este usuario?</h3>
                        <button onClick={confirmDeleteUser} className={styles.confirmButton}>Confirmar</button>
                        <button onClick={() => setShowModalUser(false)} className={styles.cancelButton}>Cancelar</button>
                    </div>
                </div>
            )}
            {showModalAdmin && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>¿Estás seguro de que deseas cambiar los permisos de este usuario?</h3>
                        <button onClick={confirmChangePermissions} className={styles.confirmButton}>Confirmar</button>
                        <button onClick={() => setShowModalAdmin(false)} className={styles.cancelButton}>Cancelar</button>
                    </div>
                </div>
            )}
            <div className={styles.notAvailable}>
                <img className={styles.ohNo} src="ohNo.png"/>
                <h1>No está disponible para móviles ni tablet</h1>
            </div>
            {showCategoryModal && (
                <div className={styles.categoryModalOverlay} onClick={handleCloseCategoryModal}>
                    <div
                        className={styles.categoryModalContent}
                        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                    >
                        <button
                            className={styles.categoryModalCancelButton}
                            onClick={handleCloseCategoryModal}
                        >
                            Cancelar
                        </button>
                        <CategoryForm onClose={handleCloseCategoryModal} />
                    </div>
                </div>
            )}
            <div className={styles.panel}>
                <div className={styles.tabs}>
                    <span className={styles.tab} onClick={() => handleSelectTab("Productos")}>Productos</span>
                    <span className={styles.tab} onClick={() => handleSelectTab("Usuarios")}>Usuarios</span>
                    {/* "Agregar categoría" button */}
                    <button
                        className={styles.addCategoryButton}
                        onClick={handleOpenCategoryModal}
                    >
                        Agregar categoría
                    </button>
                </div>
                <div className={styles.titles}>
                    <span className={styles.title}>{tab}</span>
                    <span className={styles.subtitle}>Administra tus {tab} y su información.</span>
                </div>
                {tab == "Productos" ? <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Referencia</th>
                            <th>Color</th>
                            <th>Diseñador</th>
                            <th>Valor</th>
                            <th>Categoría</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product, idx) => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.name}</td>
                                <td>{product.reference}</td>
                                <td>{product.color}</td>
                                <td>{product.designer}</td>
                                <td>{formatCurrency(product.price, 'es-CO', 'COP')}</td>
                                <td>{product.categories[0].name}</td>
                                <td>
                                    <div className={styles.containerImage}>
                                        <img className={styles.prodImage} src={product.images[0].url} />
                                    </div>
                                </td>
                                <td className={styles.cell}>
                                    <div className={styles.actions}>
                                        <img className={styles.dots} src="dots.png" onClick={() => handleShowActions(idx)}/>
                                    </div>
                                    {showActions[idx] && <div className={styles.actionsMenuContainer} onClick={() => handleShowActions(idx)}>
                                        <div className={styles.actionsMenu}>
                                            <span className={styles.action}>Editar</span>
                                            <span className={styles.action} onClick={() => handleDeleteClick(product.productId)}>Eliminar</span>
                                        </div>
                                    </div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, idx) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.userRole}</td>
                                <td className={styles.cell}>
                                    <div className={styles.actions}>
                                        <img className={styles.dots} src="dots.png" onClick={() => handleShowActionsUsers(idx)}/>
                                    </div>
                                    {showActionsUsers[idx] && <div className={styles.actionsMenuContainer} onClick={() => handleShowActionsUsers(idx)}>
                                        <div className={styles.actionsMenuUser}>
                                            <span className={styles.action} onClick={() => handleClickAdmin(user.email, user.userRole)}>Permisos</span>
                                            <span className={styles.action} onClick={() => handleDeleteClickUser(user.userId)}>Eliminar</span>
                                        </div>
                                    </div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}

export default NewAdmin;