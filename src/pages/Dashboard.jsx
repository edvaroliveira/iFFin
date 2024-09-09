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
        console.log("Projetos recebidos: ", data);

        // Agrupando os dados pelo `projectid`
        const groupedProjects = data.reduce((acc, project) => {
          let existingProject = acc.find((p) => p.id === project.projectid);
          if (!existingProject) {
            existingProject = {
              id: project.projectid,
              name: project.projectname,
              description: project.projectdescription,
              budget: parseFloat(project.projectbudget) || 0, // Aqui utiliza projectbudget
              items: [],
            };
            acc.push(existingProject);
          }

          if (project.itemcategory) {
            existingProject.items.push({
              category: project.itemcategory,
              cost: parseFloat(project.totalcost) || 0,
            });
          }

          return acc;
        }, []);

        setProjects(groupedProjects);
      })
      .catch((error) => {
        console.error("Erro ao buscar projetos:", error);
        setProjects([]);
      });
  }, []);

  // Função para calcular o custo total por categoria
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

  // Função para calcular o custo total do projeto
  const calculateTotalProjectCost = (items) => {
    if (!items || items.length === 0) {
      return 0;
    }

    return items.reduce((total, item) => {
      const cost = parseFloat(item.cost) || 0;
      return total + cost;
    }, 0);
  };

  return (
    <div className="dashboard">
      <h1>Projetos e Itens Cadastrados</h1>
      {projects.length > 0 ? (
        projects.map((project) => {
          const totalCostByCategory = calculateTotalCostByCategory(
            project.items
          );
          const totalProjectCost = calculateTotalProjectCost(project.items); // Custo total do projeto

          return (
            <div key={project.id} className="project">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <h6>Orçamento do Projeto: R$ {project.budget.toFixed(2)}</h6>
              <h6>
                Custo Total do Projeto: R$ {totalProjectCost.toFixed(2)}
              </h6>{" "}
              <h6>
                Saldo: R$ {(project.budget - totalProjectCost).toFixed(2)}
              </h6>
              {/* Exibe o custo total do projeto */}
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
                      <td>R$ {totalCostByCategory[category].toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
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
