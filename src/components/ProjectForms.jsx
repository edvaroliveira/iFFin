// /frontend/src/components/ProjectForm.jsx

import { useState, useEffect } from "react";
import projectService from "../services/projectService";
import userService from "../services/userService";
import "./ProjectForms.css";

const ProjectForms = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Carrega a lista de usuários para o dropdown
    userService
      .getAllUsers()
      .then((response) => {
        setUsers(response);
        if (response.length > 0) {
          setUserId(response[0].id); // Define o primeiro usuário como padrão
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar usuários:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cria um novo projeto enviando os dados para o backend
    projectService
      .createProject({ name, description, user_id: userId })
      .then((response) => {
        setMessage("Projeto criado com sucesso!");
        setName("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Erro ao criar projeto:", error);
        setMessage("Erro ao criar projeto. Tente novamente.");
      });
  };

  return (
    <div className="project-form">
      <h2>Cadastrar Novo Projeto</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome do Projeto:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição do Projeto:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="user">Selecionar Usuário:</label>
          <select
            id="user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="form-control"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Criar Projeto
        </button>
      </form>
    </div>
  );
};

export default ProjectForms;
