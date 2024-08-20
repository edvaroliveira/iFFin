// /frontend/src/pages/Projects.jsx

import { Route, Routes } from "react-router-dom";

function Projects() {
  return (
    <Routes>
      <Route path="new" element={<div>Cadastrar Novo Projeto</div>} />
      <Route path="edit" element={<div>Editar Projeto</div>} />
      <Route path="delete" element={<div>Excluir Projeto</div>} />
    </Routes>
  );
}

export default Projects;
