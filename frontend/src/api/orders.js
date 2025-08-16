import axios from 'axios';

const BASE_URL = 'https://bookstore-app-hsz2.onrender.com';
const authHeader = () => {
  const token = localStorage.getItem('access_token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const placeOrder = async (shipping_address) => {
  return await axios.post(`${BASE_URL}/api/store/orders/`, { shipping_address }, authHeader());
};

export const getOrders = async () => {
  return await axios.get(`${BASE_URL}/api/store/orders/`, authHeader());
};

export const getOrderDetail = async (id) => {
  return await axios.get(`${BASE_URL}/api/store/orders/${id}/`, authHeader());
};
