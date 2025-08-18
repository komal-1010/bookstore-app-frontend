import axios from 'axios';

const BASE_URL = 'https://bookstore-app-e464.onrender.com';

const authHeader = () => {
  const token = localStorage.getItem('access_token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getCart = async () => {
  return await axios.get(`${BASE_URL}/api/store/cart/`, authHeader());
};

export const addToCart = async (productId, quantity = 1) => {
  return await axios.post(`${BASE_URL}/api/store/cart/add/`, { product: productId, quantity }, authHeader());
};

export const removeFromCart = async (productId) => {
  return await axios.post(`${BASE_URL}/api/store/cart/remove/`, { product: productId }, authHeader());
};
