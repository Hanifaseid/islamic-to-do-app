import  TaskCard from "../components/TaskCard";
import TaskForm  from "../components/TaskForm";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function Tasks({ tasks, addTask, toggleComplete, deleteTask, darkMode }) {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("created");

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = 
        filter === "all" ? true :
        filter === "completed" ? task.completed :
        filter === "pending" ? !task.completed :
        filter === "overdue" ? task.deadline && new Date(task.deadline) < new Date() && !task.completed :
        true;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "deadline":
          return new Date(a.deadline) - new Date(b.deadline);
        case "created":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && !t.completed).length
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen transition-colors duration-500 p-6
        ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" : "bg-gradient-to-br from-cyan-50 to-green-50 text-gray-900"}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            🚀 My Tasks
          </h1>
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Organize your life, one task at a time
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total", value: stats.total, color: "blue", icon: "📊" },
            { label: "Completed", value: stats.completed, color: "green", icon: "✅" },
            { label: "Pending", value: stats.pending, color: "yellow", icon: "⏳" },
            { label: "Overdue", value: stats.overdue, color: "red", icon: "🚨" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-4 backdrop-blur-sm border-2
                ${darkMode 
                  ? "bg-gray-800/50 border-gray-700/50" 
                  : "bg-white/50 border-gray-200/50"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Task Form */}
        <TaskForm onAdd={addTask} darkMode={darkMode} />

        {/* Controls */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-6 mb-6 backdrop-blur-sm border-2
            ${darkMode 
              ? "bg-gray-800/50 border-gray-700/50" 
              : "bg-white/50 border-gray-200/50"
            }
          `}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                🔍 Search Tasks
              </label>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-3 rounded-xl focus:ring-4 focus:ring-purple-300/50 outline-none transition-all duration-300
                  ${darkMode 
                    ? "bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400" 
                    : "bg-gray-50/80 border border-gray-300 text-gray-900 placeholder-gray-500"
                  }
                `}
              />
            </div>

            {/* Filter */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                🎯 Filter
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`w-full p-3 rounded-xl focus:ring-4 focus:ring-blue-300/50 outline-none transition-all duration-300
                  ${darkMode 
                    ? "bg-gray-700/50 border border-gray-600 text-gray-100" 
                    : "bg-gray-50/80 border border-gray-300 text-gray-900"
                  }
                `}
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                📋 Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full p-3 rounded-xl focus:ring-4 focus:ring-green-300/50 outline-none transition-all duration-300
                  ${darkMode 
                    ? "bg-gray-700/50 border border-gray-600 text-gray-100" 
                    : "bg-gray-50/80 border border-gray-300 text-gray-900"
                  }
                `}
              >
                <option value="created">Recently Created</option>
                <option value="priority">Priority</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Task List */}
        <AnimatePresence mode="wait">
          {filteredTasks.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-2">No tasks found</h3>
              <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Create your first task to get started! ✨"
                }
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="task-grid"
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence>
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteTask}
                    darkMode={darkMode}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}