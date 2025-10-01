import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // <-- Framer Motion imported

// Advanced TaskCard Component
export default function TaskCard({ task, onToggleComplete, onDelete, darkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const priorityColors = {
    low: darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700",
    medium: darkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-100 text-yellow-700",
    high: darkMode ? "bg-orange-500/20 text-orange-300" : "bg-orange-100 text-orange-700",
    urgent: darkMode ? "bg-red-500/20 text-red-300" : "bg-red-100 text-red-700"
  };

  const priorityIcons = {
    low: "🔵",
    medium: "🟡",
    high: "🟠",
    urgent: "🔴"
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;

  // Safe priority values
  const taskPriority = task.priority || "low";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isDeleting ? 0 : 1, 
        scale: isDeleting ? 0.8 : 1,
        y: isDeleting ? -20 : 0
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-3xl p-6 border-2 shadow-2xl backdrop-blur-sm transition-all duration-500 group
        ${task.completed
          ? darkMode
            ? "bg-green-900/20 border-green-500/30"
            : "bg-green-50/80 border-green-400/50"
          : darkMode
          ? "bg-gray-800/50 border-gray-600/30 hover:border-gray-500/50"
          : "bg-white/80 border-gray-200/50 hover:border-gray-300/70"
        }
        ${isOverdue ? "border-red-400/50 animate-pulse" : ""}
      `}
    >
      {/* Priority Indicator */}
      <div className={`absolute -top-2 -left-2 px-3 py-1 rounded-full text-xs font-bold ${priorityColors[taskPriority]}`}>
        {priorityIcons[taskPriority]} {taskPriority.toUpperCase()}
      </div>

      {/* Completion Checkbox */}
      <div className="absolute top-4 right-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleComplete(task.id)}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
            ${task.completed
              ? "bg-green-500 border-green-500 text-white"
              : darkMode
              ? "border-gray-500 hover:border-green-400"
              : "border-gray-300 hover:border-green-400"
            }
          `}
        >
          {task.completed && "✓"}
        </motion.button>
      </div>

      <div className="pr-12">
        <motion.h3
          className={`text-xl font-bold transition-all duration-300 cursor-pointer
            ${task.completed
              ? "text-green-500 line-through"
              : darkMode
              ? "text-green-400"
              : "text-green-700"
            }
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {task.title}
        </motion.h3>

        <AnimatePresence>
          {(isExpanded || !task.description) && task.description && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-3 text-sm leading-relaxed transition
                ${task.completed
                  ? "line-through text-gray-400"
                  : darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
                }
              `}
            >
              {task.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs rounded-full
                  ${darkMode ? "bg-purple-600/30 text-purple-300" : "bg-purple-100 text-purple-700"}
                `}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Deadline */}
        {task.deadline && (
          <motion.p
            className={`text-sm mt-3 flex items-center gap-2 font-medium
              ${isOverdue ? "text-red-400" : darkMode ? "text-gray-400" : "text-gray-500"}
            `}
          >
            ⏰ {new Date(task.deadline).toLocaleDateString()}
            {isOverdue && <span className="text-red-400 text-xs">(Overdue)</span>}
          </motion.p>
        )}

        {/* Created Date */}
        <p className={`text-xs mt-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons */}
      <motion.div 
        className="flex gap-2 mt-4"
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggleComplete(task.id)}
          className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300
            ${
              task.completed
                ? "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                : "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
            }
          `}
        >
          {task.completed ? "↶ Undo" : "✓ Complete"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className="p-2 bg-red-500/20 text-red-600 hover:bg-red-500/30 rounded-xl transition-all duration-300"
        >
          🗑️
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
