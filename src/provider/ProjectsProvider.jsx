import { useState, useEffect } from "react";
import { ProjectsContext } from "../context/ProjectsContext";

export default function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects")) || [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (data) => {
    setProjects((prev) => [
      ...prev,
      {
        ...data,
        id: Date.now(),
        published: true,
      },
    ]);
  };

  const updateProject = (id, updated) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id.toString() === id.toString() ? { ...p, ...updated } : p,
      ),
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) =>
      prev.filter((p) => p.id.toString() !== id.toString()),
    );
  };

  // ✅ DUPLICATE
  const duplicateProject = (id) => {
    const existing = projects.find((p) => p.id.toString() === id.toString());

    if (existing) {
      const copy = {
        ...existing,
        id: Date.now(),
        title: existing.title + " Copy",
      };

      setProjects((prev) => [...prev, copy]);
    }
  };

  // ✅ FEATURE TOGGLE
  const toggleFeatured = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id.toString() === id.toString() ? { ...p, featured: !p.featured } : p,
      ),
    );
  };

  // ✅ PUBLISH TOGGLE
  const togglePublish = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id.toString() === id.toString()
          ? { ...p, published: !p.published }
          : p,
      ),
    );
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        toggleFeatured,
        togglePublish,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
