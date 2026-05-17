import { useState, useEffect } from "react";
import { AchievementsContext } from "../context/AchievementsContext";

export default function AchievementsProvider({ children }) {
  const [achievements, setAchievements] = useState(() => {
    return JSON.parse(localStorage.getItem("achievements")) || [];
  });

  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [achievements]);

  const addAchievement = (item) => {
    setAchievements((prev) => [...prev, { ...item, id: Date.now() }]);
  };

  const deleteAchievement = (id) => {
    setAchievements((prev) =>
      prev.filter((a) => a.id.toString() !== id.toString()),
    );
  };

  const updateAchievement = (id, updated) => {
    setAchievements((prev) =>
      prev.map((a) =>
        a.id.toString() === id.toString() ? { ...a, ...updated } : a,
      ),
    );
  };

  const toggleFeatured = (id) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, featured: !a.featured } : a)),
    );
  };

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        addAchievement,
        deleteAchievement,
        updateAchievement,
        toggleFeatured,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}
