import categoryCardStyles from '../styles/CategoryCard.module.css';

const CategoryCard = () => {
  return (
    <div className={categoryCardStyles.container}>
        <img src="vestido.png"/>
        <p>Vestido de cóctel</p>
    </div>
  )
}

export default CategoryCard;