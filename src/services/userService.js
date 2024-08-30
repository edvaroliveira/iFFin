// /frontend/src/services/userService.js

import axios from "axios";
import { getConfig } from "../config/userConfig";

const API_URL = "http://localhost:5001/users/";

const getAllUsers = () => {
  return axios
    .get(`${API_URL}all`, getConfig())
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    });
};

const createUser = (userData) => {
  return axios
    .post(`${API_URL}create`, userData, getConfig())
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
