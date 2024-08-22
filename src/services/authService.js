// /frontend/src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5001/auth/";

const register = (username, password, role) => {
  return axios.post(API_URL + "register", { username, password, role });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", { username, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response.data.accessToken,
            role: response.data.role,
          })
        );
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  // Navigate("/login");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
