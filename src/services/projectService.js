// /frontend/src/services/projectService.js

import axios from "axios";

const API_URL = "http://localhost:5001/projects/";

const getAllWithItems = (role) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Token:", user?.token);
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`, // Certifique-se de que o token está sendo passado corretamente
    },
    params: { role }, // Envia o papel do usuário como um parâmetro
  };

  return axios
    .get(API_URL + "with-items", config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar projetos com itens:", error);
      throw error;
    });
};

const createProject = (projectData) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`, // Envia o token JWT no cabeçalho
    },
  };

  return axios
    .post(API_URL, projectData, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao criar projeto:", error);
      throw error;
    });
};

const getAllProjects = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  return axios
    .get(API_URL, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar projetos:", error);
      throw error;
    });
};

export default {
  getAllWithItems,
  createProject,
  getAllProjects,
};
