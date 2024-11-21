import bodyStyles from '../styles/Body.module.css';
import PaginatedProductList from '../components/PaginatedProductList';
import TopRentas from '../components/TopRentas';
import Carrusel from './Carrusel';

const Body = ({isSearch}) => {
  return (
    <div className={bodyStyles.container}>
        {!isSearch && <Carrusel/>}
        {!isSearch && <PaginatedProductList />}
        {!isSearch && <TopRentas/>}
    </div>
  )
}

export default Body;