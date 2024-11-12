import bodyStyles from '../styles/Body.module.css';
import PaginatedProductList from '../components/PaginatedProductList';
import TopRentas from '../components/TopRentas';
import Carrusel from './Carrusel';

const Body = () => {
  return (
    <div className={bodyStyles.container}>
        <Carrusel/>
        <TopRentas/>
        <PaginatedProductList />
    </div>
  )
}

export default Body;