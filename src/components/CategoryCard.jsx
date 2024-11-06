import categoryCardStyles from '../styles/CategoryCard.module.css';

const CategoryCard = ({ imageSrc, categoryName }) => {
  return (
      <div className={categoryCardStyles.container}>
          <img src={imageSrc} alt={categoryName} />
          <p>{categoryName}</p>
      </div>
  )
}

export default CategoryCard;