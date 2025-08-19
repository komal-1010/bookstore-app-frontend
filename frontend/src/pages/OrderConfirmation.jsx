import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetail } from '../api/orders';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
      const { id } = useParams();
      const [order, setOrder] = useState(null);

      useEffect(() => {
            const fetchOrder = async () => {
                  try {
                        const res = await getOrderDetail(id);
                        setOrder(res.data);
                  } catch (err) {
                        console.error(err);
                  }
            };
            fetchOrder();
      }, [id]);

      if (!order) return <p>Loading order...</p>;

      return (
            <div className="order-confirmation-container">
                  <h2>Order Confirmation</h2>
                  <p>Order ID: {order.id}</p>
                  <p>Total Price: ${order.total_price}</p>
                  <p>Shipping Address: {order.shipping_address}</p>
                  <h3>Items:</h3>
                  <ul>
                        {order.items.map((item) => (
                              <li key={item.id}>
                                    {item.product.name} - {item.quantity} x ${item.price}
                              </li>
                        ))}
                  </ul>
                  <p>Thank you for your purchase!</p>
            </div>
      );
}
