// /frontend/src/services/itemService.js

import axios from "axios";
import config from "../config/userConfig";

const API_URL = "http://localhost:5001/items/";

const addItemsToProject = (projectId, items) => {
  return axios
    .post(`${API_URL}${projectId}/add-items`, { items }, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao adicionar itens ao projeto:", error);
      throw error;
    });
};

const getItemsByProject = (projectId) => {
  // const user = JSON.parse(localStorage.getItem("user"));
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${user?.token}`,
  //   },
  // };

  return axios
    .get(`${API_URL}by-project/${projectId}`, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar itens do projeto:", error);
      throw error;
    });
};

export default {
  addItemsToProject,
  getItemsByProject,
};
