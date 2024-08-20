// /frontend/src/components/UserForm.jsx

import { useState } from "react";
import userService from "../services/userService";
import "./UserForm.css";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Define o papel padrão como "user"
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Chama o serviço para criar um novo usuário
    userService
      .createUser({ username, password, role })
      .then(() => {
        setMessage("Usuário criado com sucesso!");
        setUsername("");
        setPassword("");
        setRole("user"); // Reseta o papel para "user"
      })
      .catch((error) => {
        console.error("Erro ao criar usuário:", error);
        setMessage("Erro ao criar usuário. Tente novamente.");
      });
  };

  return (
    <div className="user-form">
      <h2>Cadastrar Novo Usuário</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Perfil de Usuário:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="form-control"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Criar Usuário
        </button>
      </form>
    </div>
  );
};

export default UserForm;
