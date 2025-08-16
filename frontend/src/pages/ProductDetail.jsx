import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../api/products';
import axios from 'axios';
import './ProductDetail.css';

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

  const handleAddToCart = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login first');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/cart/add_item/',
        { product: id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Added to cart!');
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
      <p className="price">${product.price}</p>
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
