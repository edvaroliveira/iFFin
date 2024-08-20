// /frontend/src/pages/Items.jsx

import React from "react";
import { Route, Routes } from "react-router-dom";

function Items() {
  return (
    <Routes>
      <Route path="new" element={<div>Cadastrar Novo Item</div>} />
      <Route path="edit" element={<div>Editar Item</div>} />
      <Route path="delete" element={<div>Excluir Item</div>} />
    </Routes>
  );
}

export default Items;
