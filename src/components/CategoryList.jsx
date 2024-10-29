import { useEffect, useState } from "react";
import categoryListStyles from '../styles/CategoryList.module.css';
import CategoryCard from './CategoryCard';

const API_URL = "http://localhost:8080/api/v1/categories";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let respuesta = await fetch(API_URL);
            let data = await respuesta.json();
            setCategories(data);
            console.log("category", data);
        };
        fetchData();
    }, []);

    return (
        <>
            <h2 className={categoryListStyles.titulo}>Busca por tipo de evento</h2>
            <div className={categoryListStyles.categoriesContainer}>
                {categories?.map(({ id, name }) => (
                    <CategoryCard
                        key={id}
                        imageSrc={`img/categories/${id}.png`}
                        categoryName={name}
                        altText={name}
                    />
                ))}
            </div>
        </>
    );
};

export default CategoryList;