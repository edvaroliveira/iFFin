// /frontend/src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import projectService from "../services/projectService";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user.role);

    projectService
      .getAllWithItems(user.role)
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar projetos:", error);
        setProjects([]);
      });
  }, []);

  const calculateTotalCostByCategory = (items) => {
    if (!items || items.length === 0) {
      return {};
    }

    return items.reduce((categories, item) => {
      const category = item.category || "Sem categoria";
      const cost = parseFloat(item.cost) || 0;

      if (!categories[category]) {
        categories[category] = 0;
      }

      categories[category] += cost;
      return categories;
    }, {});
  };

  return (
    <div className="dashboard">
      <h1>Projetos e Itens Cadastrados</h1>
      {projects.length > 0 ? (
        projects.map((project) => {
          const totalCostByCategory = calculateTotalCostByCategory(
            project.items
          );
          return (
            <div key={project.id} className="project">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(totalCostByCategory).map((category) => (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>R${totalCostByCategory[category].toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </div>
  );
};

export default Dashboard;
