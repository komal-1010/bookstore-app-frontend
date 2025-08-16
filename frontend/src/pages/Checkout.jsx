import { useState } from 'react';
import { placeOrder } from '../api/orders';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await placeOrder(shippingAddress);
      alert('Order placed successfully!');
      navigate(`/order-confirmation/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert('Error placing order');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>Shipping Address</label>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
          rows={4}
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
