import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import Tasks from "./pages/Task";
import About from "./pages/About";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-gray-100">
      <Header />

      <main className="flex-grow p-6">
        <Routes>
          <Route
            path="/"
            element={<MainContent tasks={tasks} toggleComplete={toggleComplete} />}
          />
          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                addTask={addTask}
                toggleComplete={toggleComplete}
              />
            }
          />
          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
