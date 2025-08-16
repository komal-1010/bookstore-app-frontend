import { useEffect, useState } from 'react';
import { getCart, removeFromCart, addToCart } from '../api/cart';
import './Cart.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    fetchCart();
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    await addToCart(productId, quantity);
    fetchCart();
  };

  if (!cart) return <p>Loading cart...</p>;

  const totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.product.name}</h4>
                  <p>${item.product.price}</p>
                </div>
                <div className="actions">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.product.id, e.target.value)}
                  />
                  <button onClick={() => handleRemove(item.product.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${totalPrice}</h3>
            <Link to="/checkout" className="btn">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}
