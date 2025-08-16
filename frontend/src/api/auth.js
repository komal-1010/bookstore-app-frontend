import axios from 'axios';

const BASE_URL = 'https://bookstore-app-hsz2.onrender.com';
console.log("BASE_URL",BASE_URL)
export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/api/user/register/`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${BASE_URL}/api/user/login/`, credentials);
};
