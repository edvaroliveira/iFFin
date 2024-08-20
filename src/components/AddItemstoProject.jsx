// /frontend/src/components/AddItemsToProject.jsx

import { useState, useEffect } from "react";
import projectService from "../services/projectService";
import itemService from "../services/ItemService";
import "./AddItemsToProject.css";

const AddItemsToProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [items, setItems] = useState([{ name: "", category: "", cost: "" }]);
  const [message, setMessage] = useState("");

  const categories = [
    "Material de Consumo",
    "Capital",
    "Contratações PJ",
    "Contratações PF",
    "CLT",
    "Bolsistas",
  ];

  useEffect(() => {
    projectService
      .getAllProjects()
      .then((data) => setProjects(data))
      .catch((error) => console.error("Erro ao carregar projetos:", error));
  }, []);

  const handleAddItem = () => {
    setItems([...items, { name: "", category: "", cost: "" }]);
  };

  const handleChange = (index, e) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [e.target.name]: e.target.value } : item
    );
    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProject) {
      setMessage("Selecione um projeto.");
      return;
    }

    itemService
      .addItemsToProject(selectedProject, items)
      .then((response) => {
        setMessage("Itens adicionados com sucesso!");
        setItems([{ name: "", category: "", cost: "" }]);
      })
      .catch((error) => {
        console.error("Erro ao adicionar itens:", error);
        setMessage("Erro ao adicionar itens. Tente novamente.");
      });
  };

  return (
    <div className="add-items-form">
      <h2>Adicionar Itens ao Projeto</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="project">Selecione o Projeto:</label>
          <select
            id="project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            required
            className="form-control"
          >
            <option value="">Escolha um projeto...</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {items.map((item, index) => (
          <div key={index} className="item-group">
            <h4>Item {index + 1}</h4>
            <div className="form-group">
              <label htmlFor={`name-${index}`}>Nome do Item:</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={item.name}
                onChange={(e) => handleChange(index, e)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`category-${index}`}>Categoria:</label>
              <select
                id={`category-${index}`}
                name="category"
                value={item.category}
                onChange={(e) => handleChange(index, e)}
                required
                className="form-control"
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`cost-${index}`}>Custo:</label>
              <input
                type="number"
                id={`cost-${index}`}
                name="cost"
                value={item.cost}
                onChange={(e) => handleChange(index, e)}
                required
                className="form-control"
              />
            </div>
            <button
              type="button"
              className="btn btn-danger remove-btn"
              onClick={() => handleRemoveItem(index)}
            >
              Remover Item
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary add-btn"
          onClick={handleAddItem}
        >
          Adicionar Outro Item
        </button>

        <button type="submit" className="btn btn-primary submit-btn">
          Salvar Itens
        </button>
      </form>
    </div>
  );
};

export default AddItemsToProject;
