import { useState } from 'react';
import { placeOrder } from '../api/orders';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import './Checkout.css';
import { paymentApi } from '../api/payment';

const stripePromise = loadStripe("pk_test_51Rx49VGR1EHMKmwJxxNwPG7RtzoIbfttEFP1Dj8aIoig0h4u7b9LuSurNdwuFzikt2N6MSiBWf8DrAw6anaOoDE400owvsdzIQ");
const BASE_URL = 'https://bookstore-app-e464.onrender.com';
export default function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await placeOrder(shippingAddress);
      const orderId = res.data.id;

      // 2. Create Stripe checkout session
      const sessionRes = await paymentApi(orderId);
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionRes.data.id,
      });
      if (error) {
        console.error("Stripe checkout error:", error);
        alert("Something went wrong with payment");
      }
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
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}
