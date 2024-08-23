// /frontend/src/services/projectService.js

import axios from "axios";
import config from "../config/userConfig";

const API_URL = "http://localhost:5001/projects/";

const getAllWithItems = (role) => {
  const conf = { ...config, params: { role } };

  return axios
    .get(API_URL + "with-items", conf)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar projetos com itens:", error);
      throw error;
    });
};

const createProject = (projectData) => {
  return axios
    .post(API_URL, projectData, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao criar projeto:", error);
      throw error;
    });
};

const getAllProjects = () => {
  return axios
    .get(API_URL, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar projetos:", error);
      throw error;
    });
};

const getProjectsByUser = () => {
  return axios
    .get(API_URL + "by-user", config)
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
