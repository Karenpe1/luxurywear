import React, { useEffect, useState } from "react";
import useAxios from "../Utils/axiosInstance";
import stylesTable from "../styles/table.module.css";
import Pagination from "./Pagination";

const Table = ({
  headers,
  rows,
  renderActions,
  showActions,
  handleShowActions,
  currentPage,
  totalPages,
  onPageChange,
  startRange,
  endRange,
  totalElements,
}) => {


  // Fetch a los productos de la pagina actual

  return (
    <>
      <table>
        <thead>
          <tr className={stylesTable.header}>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
            {renderActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr className={stylesTable.containerFilas} key={rowIndex}>
                {Object.keys(row).map((key, cellIndex) => (
                  <td className={stylesTable.filas} key={cellIndex}>{row[key]}</td>
                ))}
                {renderActions && (
                  <>
                    {/* Pasamos `showActions` y `handleShowActions` al renderizador */}
                    {renderActions(
                      row,
                      rowIndex,
                      showActions,
                      handleShowActions
                    )}
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + (renderActions ? 1 : 0)}>
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p className={stylesTable.contador}>
        Mostrando {startRange}-{endRange} de {totalElements} (Página {currentPage + 1} de {totalPages})
      </p>
      <Pagination 
        currentPage={currentPage}
        totalPage={totalPages}
        onPageChange={onPageChange}/>
    </>
  );
};

export default Table;
