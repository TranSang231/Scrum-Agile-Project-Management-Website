import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [currentProject, setCurrentProject] = useState(null);
  const navigate = useNavigate();

  const selectProject = (project) => {
    setCurrentProject(project);
    // Tự động chuyển đến trang backlog của project
    navigate(`/backlog/${project.id}`);
  };

  return (
    <ProjectContext.Provider value={{ currentProject, selectProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}