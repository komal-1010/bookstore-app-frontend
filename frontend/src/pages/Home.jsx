import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <div>Loading products...</div>
      </div>
    );
  }

  return (
    <div className="product-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">Rs.{product.price}</p>
            <Link to={`/products/${product.id}`} className="btn">
              View Details
            </Link>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};
