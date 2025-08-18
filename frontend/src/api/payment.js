import axios from "axios";

const BASE_URL = "https://bookstore-app-e464.onrender.com";
const authHeader = () => {
  const token = localStorage.getItem("access_token");
  return { headers: { Authorization: `Bearer ${token}` } };
};
export const paymentApi = async (orderId) => {
  return await axios.post(
    `${BASE_URL}/api/payments/create-checkout-session/${orderId}/`,
    {},
    authHeader()
  )};