// /frontend/src/components/ProjectReport.jsx

import { useState, useEffect } from "react";
import projectService from "../services/projectService";
import ProjectItemsReport from "./ProjectItemsReport";
import "./ProjectReport.css";

const ProjectReport = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    projectService
      .getProjectsByUser() // Obtém os projetos com base no usuário logado
      .then((data) => setProjects(data))
      .catch((error) => console.error("Erro ao carregar projetos:", error));
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setStatus(false);
  };

  const handleBackStatus = () => {
    setSelectedProject(null);
    setStatus(true);
  };

  return (
    <div className="project-report">
      <h2>Relatório de Projetos</h2>
      {status && (
        <div className="project-list">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="project-item"
                onClick={() => handleProjectSelect(project)}
              >
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            ))
          ) : (
            <p>Nenhum projeto encontrado.</p>
          )}
        </div>
      )}

      {selectedProject && (
        <ProjectItemsReport
          projectId={selectedProject.id}
          projectName={selectedProject.name}
          back={handleBackStatus}
        />
      )}
    </div>
  );
};

export default ProjectReport;
