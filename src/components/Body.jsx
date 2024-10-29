import bodyStyles from '../styles/Body.module.css';
import CategoryCard from './CategoryCard';

const Body = () => {
  return (
    <div className={bodyStyles.container}>
        <div className={bodyStyles.subcontainer}>
          <p className={bodyStyles.title1}>Encuentra el vestido ideal para cada ocasión</p>
          <div className={bodyStyles.searchContainer}>
            <input className={bodyStyles.search} type='text'/>
            <img className={bodyStyles.lens} src='./lens.svg'/>
          </div>
        </div>
        <div className={bodyStyles.subcontainer2}>
          <p className={bodyStyles.title2}>Busca por tipo de evento</p>
          <div className={bodyStyles.categoriesContainer}>
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>
          </div>
        </div>
    </div>
  )
}

export default Body;