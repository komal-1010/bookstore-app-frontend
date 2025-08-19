import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from './pages/SignUp';
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import OrderConfirmation from "./pages/OrderConfirmation";
import Checkout from "./pages/Checkout"
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage"
function App() {
  const [user, setUser] = useState(null);

  // Example: fetch user info from localStorage or API
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products/add" element={<AddProductPage />} />
          <Route path="/admin/products/:id/edit" element={<EditProductPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
