import axios from "axios";

const BASE_URL = "https://bookstore-app-e464.onrender.com";
const authHeader = () => {
  const token = localStorage.getItem("access_token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Product APIs
export const adminGetProducts = () =>
  axios.get(`${BASE_URL}/api/store/products/`, authHeader());

export const adminCreateProduct = (data) =>
  axios.post(`${BASE_URL}/api/store/products/`, data, authHeader());

export const adminUpdateProduct = (id, data) =>
  axios.put(`${BASE_URL}/api/store/products/${id}/`, data, authHeader());

export const adminDeleteProduct = (id) =>
  axios.delete(`${BASE_URL}/api/store/products/${id}/`, authHeader());

// Order APIs
export const adminGetOrders = () =>
  axios.get(`${BASE_URL}/api/store/orders/`, authHeader());

export const adminUpdateOrderStatus = (id, status) =>
  axios.patch(`${BASE_URL}/api/store/orders/${id}/`, { status }, authHeader());
