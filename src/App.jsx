// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import Tasks from "./pages/Task";
import About from "./pages/About";

function App() {
  // dark mode state (only for pages, not header/footer)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved != null) return JSON.parse(saved);
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // tasks state
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // persist darkMode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((v) => !v);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header (not affected by page dark mode) */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main content (only this part switches dark/light) */}
      <main
        className={`flex-grow w-full transition-colors duration-500
          ${darkMode ? "bg-black text-white" : "bg-white text-black"}
        `}
      >
       <Routes>
  <Route
    path="/"
    element={
      <MainContent
        tasks={tasks}
        toggleComplete={toggleComplete}
        darkMode={darkMode}   // ✅ pass it here
      />
    }
  />
  <Route
    path="/tasks"
    element={
      <Tasks
        tasks={tasks}
        addTask={addTask}
        toggleComplete={toggleComplete}
        darkMode={darkMode}   // ✅ pass it here
      />
    }
  />
  <Route
    path="/about"
    element={<About darkMode={darkMode} />}   // ✅ pass it here
  />
</Routes>

      </main>

      {/* Footer (not affected by page dark mode) */}
      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;
