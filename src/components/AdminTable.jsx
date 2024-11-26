import React, { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import StyleAdminTable from "../styles/AdminTable.module.css";
import { useContextGlobal } from "../context/globalContext";
import axiosInstance from "../Utils/axiosInstance";
import styles from "../styles/NewAdmin.module.css";
import Table from "./Table";
import { formatCurrency } from "../Utils/currencyFormatter";

const AdminTable = ({ pageSize = 6,reload,setReload}) => {
  const { state, dispatch } = useContextGlobal();
  const [currentPageReservation, setCurrentPageReservation] = useState(0); // Tracks current page
  const [totalPagesReservation, setTotalPagesReservation] = useState(0); // Tracks total pages
  const [totalElementsReservation, setTotalElementsReservation] = useState(0);
  const [numElementsReservation, setNumElementsReservation] = useState(0);
  const axios = axiosInstance();


  useEffect(()=>{
    const fetchReservations= async()=>{
        try{
            const response= await axios.get(`/api/v1/reservations/paginated`,{
                params:{
                    page:currentPageReservation,
                    size:pageSize,
                },
            });
            const data= response.data
            console.log(data)
            dispatch({type:"GET_RESERVATIONS", payload:data.content})
            dispatch({type:"INITIALIZE_SHOWACTIONS", payload:data.content.map(()=>false)})
            setTotalPagesReservation(data.totalPages); // Set total pages from response
            setTotalElementsReservation(data.totalElements);
            setNumElementsReservation(data.numberOfElements);
        }catch (err) {
            dispatch({type:"SET_ERROR", payload:"Error fetching categoria" })
        }
    }
    fetchReservations();
  },[currentPageReservation, reload])

  const startRangerReservation = currentPageReservation * pageSize + 1;
  const endRangeReservation = Math.min(
    startRangerReservation + numElementsReservation - 1,
    totalElementsReservation
  );
  const handlePageChangeReservations = (page) => {
    setCurrentPageReservation(page);
  };
  const handleShowActionsReservations = (i) => {
    dispatch({type:"TOGGLE_SHOW_ACTIONS", payload:i})
  };

  return (
    <>
      <div className={StyleAdminTable.contenedorCards}>
        <CardInfo
          title={"Pedidos Totales"}
          subtitle={"Numero de pedidos realizados"}
          total={900}
        />
        <CardInfo
          title={"Usuarios Totales"}
          subtitle={"Numero de usuarios registrados"}
          total={40}
        />
        <CardInfo
          title={"Ingresos Totales"}
          subtitle={"Total de ingresos generados"}
          total={"$ 30.000.000"}
        />
        <CardInfo
          title={"Valor Promedio Pedido"}
          subtitle={"Numero de pedidos realizados"}
          total={"$ 230.000"}
        />
      </div>
      <div className={StyleAdminTable.contenedorTable}>
        <h2 className={StyleAdminTable.title}>Pedidos Recientes</h2>
        <h6 className={StyleAdminTable.subtitle}>Ultima pedidos realizados</h6>
      </div>  
        <Table
            headers={[
            "ID",
            "Nombre Producto",
            "Fecha Inicio",
            "Fecha devolucion",
            "Usuario",
            "Total",
            ]}
            rows={state.reservationsPaginados.map((reservation) => ({
            ID: reservation.id,
            Nombre: reservation.productName,
            FechaInicio: reservation.startDate,
            FechaFin: reservation.endDate,
            Usuario: reservation.userEmail,
            Total: formatCurrency(reservation.totalCost, "es-CO", "COP"),
            }))}
            renderActions={(row, idx) => (
            <td className={styles.cells}>
                <div className={styles.actions}>
                <img
                    className={styles.dots}
                    src="/dots.png"
                    onClick={(e) => {
                    e.stopPropagation(); // Detiene la propagación del evento click
                    handleShowActionsReservations(idx); // Llama a tu función de manejo
                    }}
                />
                </div>
                {state.showActions[idx] && (
                <div
                    className={styles.actionsMenuContainer}
                    onClick={(e) => {
                    e.stopPropagation();
                    handleShowActionsReservations(idx);
                    }}
                >
                    <div className={styles.actionsMenu}>
                    <span
                        className={styles.action}
                    >
                        Editar
                    </span>
                    <span
                        className={styles.action}
                    >
                        Eliminar
                    </span>
                    </div>
                </div>
                )}
            </td>
            )}
            showActions={state.showActions}
            handleShowActions={handleShowActionsReservations}
            currentPage={currentPageReservation}
            onPageChange={handlePageChangeReservations}
            totalPages={totalPagesReservation}
            startRange={startRangerReservation}
            endRange={endRangeReservation}
            totalElements={totalElementsReservation}
        />
    </>
  );
};

export default AdminTable;
