import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  adminGetProducts,
  adminDeleteProduct,
  adminGetOrders,
  adminUpdateOrderStatus,
} from "../api/admin";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const prodRes = await adminGetProducts();
      setProducts(prodRes.data);
      const orderRes = await adminGetOrders();
      setOrders(orderRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await adminDeleteProduct(id);
    fetchData();
  };

  const handleStatusChange = async (id, status) => {
    await adminUpdateOrderStatus(id, status);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <section>
        <div className="section-header">
          <h2>Products</h2>
          <button onClick={() => navigate("/admin/products/add")}>+ Add Product</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>Rs.{p.price}</td>
                <td>
                  <button onClick={() => navigate(`/admin/products/${p.id}/edit`)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user.username}</td>
                <td>Rs.{o.total_price}</td>
                <td>{o.status}</td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
