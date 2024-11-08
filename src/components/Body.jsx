import bodyStyles from '../styles/Body.module.css';
import CategoryList from './CategoryList';
import PaginatedProductList from '../components/PaginatedProductList';
import TopRentas from '../components/TopRentas';

const Body = () => {
  return (
    <div className={bodyStyles.container}>
        <div className={bodyStyles.subcontainer2}>
          <CategoryList />
        </div>
        <TopRentas/>
        <PaginatedProductList />
    </div>
  )
}

export default Body;