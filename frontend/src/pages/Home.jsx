import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const [products, setProducts] = useState([]);
    console.log("products",products)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        console.log("res",res)
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      {products.length > 0 && products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <Link to={`/products/${product.id}`} className="btn">View Details</Link>
        </div>
      ))}
    </div>
  );
}
