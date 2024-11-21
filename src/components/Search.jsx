import { useState } from "react";
import styles from "../styles/Search.module.css";
import Calendar from "./Calendar";
import PaginatedSearchList from "./PaginatedSearchList";

const Search = ({isSearch, setIsSearch}) => {

  const [startDate, setStartDate] = useState({day: null, month: null, year: null});
  const [endDate, setEndDate] = useState({day: null, month: null, year: null});
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  }
  
  return (
    <>
      <div className={styles.container}>
          <div className={styles.inner}>
              <p className={styles.title}>Descubre el vestido perfecto para cada ocasión.</p>
              <div className={styles.search}>
                  <input className={styles.input} type="text" placeholder="Escribe el tipo de vestido ideal." value={searchTerm} onChange={handleSearchTermChange}/>
                  <span className={styles.separator}>|</span>
                  <div className={styles.dateOuterContainer} onClick={() => setIsOpen(true)}>
                    <div className={styles.dateContainer}>
                      <span>Alquila</span>
                      <span className={styles.date}>{startDate.day == null ? 'Desde' : startDate.day + '/' + (startDate.month + 1) + '/' + startDate.year}</span>
                    </div>
                    <span onClick={() => {setStartDate({day: null, month: null, year: null}); setEndDate({day: null, month: null, year: null});}}>{startDate.day != null ? 'x' : ''}</span>
                  </div>
                  <span className={styles.separator}>|</span>
                  <div className={styles.dateOuterContainer} onClick={() => setIsOpen(true)}>
                    <div className={styles.dateContainer}>
                      <span>Devuelve</span>
                      <span className={styles.date}>{endDate.day == null ? 'Hasta' : endDate.day + '/' + (endDate.month + 1) + '/' + endDate.year}</span>
                    </div>
                    <span onClick={() => setEndDate({day: null, month: null, year: null})}>{endDate.day != null ? 'x' : ''}</span>
                  </div>
                  <span className={styles.separator}>|</span>
                  <div className={styles.searchButton} onClick={() => {
                    if(startDate.day != null && searchTerm != '' && endDate.day != null) 
                    {setSearchToggle(!searchToggle); setIsSearch(true);}
                    else alert("Por favor, rellene todos los campos.");
                  }}>
                    <span>Buscar</span>
                    <img className={styles.lens} src="lens.svg"/>
                  </div>
              </div>
              {isOpen && <div className={styles.calendarContainer} onClick={() => setIsOpen(false)}>
                <div className={styles.calendar} onClick={(e) => e.stopPropagation()}>
                  <Calendar setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}/>
                </div>
              </div>}
          </div>
      </div>
      {isSearch && <PaginatedSearchList searchTerm={searchTerm} startDate={startDate} endDate={endDate} searchToggle={searchToggle}/>}
    </>
  )
}

export default Search;