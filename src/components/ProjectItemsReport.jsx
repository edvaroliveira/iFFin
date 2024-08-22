// /frontend/src/components/ProjectItemsReport.jsx

import { useState, useEffect } from "react";
import itemService from "../services/itemService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./ProjectItemsReport.css";

const ProjectItemsReport = ({ projectId, projectName, back }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    itemService
      .getItemsByProject(projectId)
      .then((data) => setItems(data))
      .catch((error) =>
        console.error("Erro ao carregar itens do projeto:", error)
      );
  }, [projectId]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Relatório de Itens - Projeto: ${projectName}`, 14, 20);
    doc.autoTable({
      startY: 30,
      head: [["Nome do Item", "Categoria", "Custo", "Data de Criação"]],
      body: items.map((item) => [
        item.name,
        item.category,
        item.cost,
        item.creation_date,
      ]),
    });
    doc.save(`relatorio_itens_${projectName}.pdf`);
  };

  return (
    <div className="project-items-report">
      <h3>Itens do Projeto: {projectName}</h3>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Nome do Item</th>
            <th>Categoria</th>
            <th>Custo</th>
            <th>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.cost}</td>
                <td>{item.creation_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum item encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={exportToPDF}>
        Exportar para PDF
      </button>
      <button
        className="btn btn-primary"
        style={{ background: "red", padding: "5px 10px", marginLeft: "10px" }}
        onClick={back}
      >
        Listar Projetos
      </button>
    </div>
  );
};

export default ProjectItemsReport;
