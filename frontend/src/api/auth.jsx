import axios from 'axios';

const BASE_URL = 'https://bookstore-app-e464.onrender.com';
export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/api/user/register/`, userData, {
  headers: {
    'Content-Type': 'application/json',
  }})
};

export const loginUser = async (credentials) => {
  return await axios.post(`${BASE_URL}/api/user/login/`, credentials);
};
