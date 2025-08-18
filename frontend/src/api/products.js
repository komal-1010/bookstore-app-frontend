import axios from 'axios';

const BASE_URL = 'https://bookstore-app-e464.onrender.com';

export const getProducts = async () => {
  return await axios.get(`${BASE_URL}/api/store/products/`);
};

export const getProductDetail = async (id) => {
  return await axios.get(`${BASE_URL}/api/store/products/${id}/`);
};
