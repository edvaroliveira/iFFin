// /frontend/src/services/userService.js

import axios from "axios";

const API_URL = "http://localhost:5001/users/";

const getAllUsers = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  return axios
    .get(`${API_URL}all`, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    });
};

const createUser = (userData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  return axios
    .post(`${API_URL}create`, userData, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao criar usuário:", error);
      throw error;
    });
};

export default {
  createUser,
  getAllUsers,
};
