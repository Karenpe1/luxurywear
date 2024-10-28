import React, { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8080/api/v1/products/top-rents');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Productos Destacados</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Material: {product.material}</p>
                        <p>Color: {product.color}</p>
                        <p>Diseñador: {product.designer}</p>
                        <p>Precio de Alquiler: ${product.rental_price}</p>
                        <div>
                            <h3>Imágenes:</h3>
                            {product.images.map(image => (
                                <img key={image.id} src={image.url} alt={product.name} style={{ width: '100px' }} />
                            ))}
                        </div>
                        <div>
                            <h3>Categorías:</h3>
                            {product.categories.map(category => (
                                <span key={category.id}>{category.name}</span>
                            ))}
                        </div>
                        <div>
                            <h3>Tamaños Disponibles:</h3>
                            {product.available_sizes.map(size => (
                                <span key={size.id}>{size.size}</span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
