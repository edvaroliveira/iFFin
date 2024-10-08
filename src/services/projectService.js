// /frontend/src/services/projectService.js

import axios from "axios";
import { getConfig } from "../config/userConfig";

const API_URL = "http://localhost:5001/projects/";

const getAllWithItems = (role) => {
  const conf = { ...getConfig(), params: { role } };
  console.log("Dentro do getAllWithItems... --->", conf);
  return axios
    .get(API_URL + "with-items", conf)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        // Verifica se o erro é relacionado ao token expirado
        alert("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("user"); // Remove o token expirado
        window.location.href = "/login"; // Redireciona para a página de login
      } else {
        console.error("Erro ao buscar projetos com itens:", error);
      }
      throw error;
    });
};

const createProject = (projectData) => {
  return axios
    .post(API_URL, projectData, getConfig())
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao criar projeto:", error);
      throw error;
    });
};

const getAllProjects = () => {
  return axios
    .get(API_URL, getConfig())
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar projetos:", error);
      throw error;
    });
};

const getProjectsByUser = () => {
  return axios
    .get(API_URL + "by-user", getConfig())
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
  getProjectsByUser,
};
