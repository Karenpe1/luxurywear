import { useState } from "react";
import styles from "../styles/Search.module.css";
import Calendar from "./Calendar";
import PaginatedSearchList from "./PaginatedSearchList";
import Swal from 'sweetalert2';

const Search = ({isSearch, setIsSearch}) => {

  const [startDate, setStartDate] = useState({day: null, month: null, year: null});
  const [endDate, setEndDate] = useState({day: null, month: null, year: null});
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [startDateToggle, setStartDateToggle] = useState(false);

  const searchTerms = [
    "vestido", "elegante", "evento", "corto", "vestido corto", "largo", "vestido largo",
    "juvenil", "encaje", "corte juvenil y elegante", "casual", "formal", "gala", "fiesta",
    "coctel", "moderno", "clásico", "sencillo", "sofisticado", "glamoroso", "bohemio",
    "vintage", "minimalista", "bordado", "con pedrería", "con brillo", "floral", "plisado",
    "de noche", "de día", "seda", "gasa", "poliéster", "chiffon", "algodón", "terciopelo",
    "lino", "tul", "raso", "satén", "organza", "crepé", "tafetán", "azul", "verde", 
    "blanco", "rosa", "rosado", "marfil", "dorado", "coral", "perla", "plateado", 
    "rojo", "negro", "gris", "amarillo", "morado", "fucsia", "vino", "lavanda", 
    "turquesa", "beige", "esmeralda", "champán", "nude"
  ];

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  }

  document.addEventListener('scroll', () => {if(window.screen.width > 500) {setIsOpen(false); setStartDateToggle(false);}});
  
  return (
    <>
      <div className={styles.container}>
          <div className={styles.inner}>
              <p className={styles.title}>Descubre el vestido perfecto para cada ocasión.</p>
              <div className={styles.search}>
                  <input className={styles.input} type="text" list="searchTerms" placeholder="Escribe el tipo de vestido ideal." value={searchTerm} onChange={handleSearchTermChange} onClick={() => {setIsOpen(false); setStartDateToggle(false);}} onKeyUp={(e) => {if(e.key == "Enter") {
                    if(startDate.day != null && searchTerm != '' && endDate.day != null) 
                      {setSearchToggle(!searchToggle); setIsSearch(true);}
                      else {
                        Swal.fire({
                          title: '¡Búsqueda incompleta!',
                          text: 'Por favor, complete todos los campos.',
                          iconHtml: '<img src="busquedaIncompleta.png" style="width: 150px;"/>',
                          customClass: styles.noBorder,
                        })
                      };
                  }}}/>
                  <datalist id="searchTerms">
                    {searchTerms.map((e, i) => <option key={i}>{e}</option>)}
                  </datalist>
                  <span className={styles.separator}>|</span>
                  <div className={startDateToggle ? styles.dateOuterContainerToggled : styles.dateOuterContainer} onClick={() => {setIsOpen(true); setStartDateToggle(!startDateToggle);}}>
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
                    setIsOpen(false);
                    if(startDate.day != null && searchTerm != '' && endDate.day != null) 
                    {setSearchToggle(!searchToggle); setIsSearch(true);}
                    else {
                      Swal.fire({
                        title: '¡Búsqueda incompleta!',
                        text: 'Por favor, complete todos los campos.',
                        iconHtml: '<img src="busquedaIncompleta.png" style="width: 150px;"/>',
                        customClass: styles.noBorder,
                      })
                    };
                  }}>
                    <span>Buscar</span>
                    <img className={styles.lens} src="lens.svg"/>
                  </div>
              </div>
              {isOpen && <div className={styles.calendarContainer} onClick={() => setIsOpen(false)}>
                <div className={styles.calendar} onClick={(e) => e.stopPropagation()}>
                  <Calendar 
                    setStartDate={setStartDate} 
                    setEndDate={setEndDate} 
                    startDate={startDate} 
                    endDate={endDate}
                    startDateToggle={startDateToggle}
                    setStartDateToggle={setStartDateToggle}
                    setIsOpen={setIsOpen}
                  />
                </div>
              </div>}
          </div>
      </div>
      {isSearch && <PaginatedSearchList searchTerm={searchTerm} startDate={startDate} endDate={endDate} searchToggle={searchToggle}/>}
    </>
  )
}

export default Search;