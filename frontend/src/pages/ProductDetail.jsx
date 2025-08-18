import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getProductDetail } from '../api/products';
import './ProductDetail.css';
import { addToCart } from '../api/cart';
const BASE_URL = 'https://bookstore-app-e464.onrender.com';
export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductDetail(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);
  const navigate = useNavigate();
  const handleAddToCart = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login first');
      navigate('/login')
      return;
    }

    try {
      await addToCart(id, quantity);
      alert('Added to cart!');
      navigate('/cart')
    } catch (err) {
      console.error(err);
      alert('Error adding to cart');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <h2>{product.name}</h2>
      <p className="description">{product.description}</p>
      <p className="price">Rs.{product.price}</p>
      <div className="quantity-container">
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
