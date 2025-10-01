import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Advanced TaskForm Component
export default function TaskForm({ onAdd, darkMode }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const titleRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      // Shake animation for empty title
      titleRef.current.classList.add("animate-shake");
      setTimeout(() => titleRef.current.classList.remove("animate-shake"), 500);
      return;
    }

    const newTask = {
      id: Date.now() + Math.random(),
      title,
      description,
      deadline,
      priority,
      tags,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAdd(newTask);

    // Reset form
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("medium");
    setTags([]);
    setIsExpanded(false);
  };

  const addTag = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim()) && tags.length < 5) {
        setTags([...tags, currentTag.trim()]);
        setCurrentTag("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const priorityColors = {
    low: "bg-blue-500",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    urgent: "bg-red-500"
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={false}
      animate={{ height: isExpanded ? "auto" : "80px" }}
      className={`rounded-3xl shadow-2xl p-6 mb-8 border-2 backdrop-blur-sm transition-all duration-700 overflow-hidden
        ${darkMode 
          ? "bg-gray-800/80 border-gray-600/50 text-gray-100" 
          : "bg-white/80 border-gray-200/50 text-gray-900"
        }
      `}
    >
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          ✨ Add New Task
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div>
              <input
                ref={titleRef}
                type="text"
                placeholder="🎯 What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-4 text-lg rounded-2xl focus:ring-4 focus:ring-green-300/50 outline-none transition-all duration-300 font-medium
                  ${darkMode 
                    ? "bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400" 
                    : "bg-gray-50/80 border border-gray-300 text-gray-900 placeholder-gray-500"
                  }
                `}
              />
            </div>

            <div>
              <textarea
                placeholder="📝 Add description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className={`w-full p-4 rounded-2xl focus:ring-4 focus:ring-cyan-300/50 outline-none transition-all duration-300 resize-none
                  ${darkMode 
                    ? "bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400" 
                    : "bg-gray-50/80 border border-gray-300 text-gray-900 placeholder-gray-500"
                  }
                `}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  ⏰ Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className={`w-full p-3 rounded-xl focus:ring-4 focus:ring-blue-300/50 outline-none transition-all duration-300
                    ${darkMode 
                      ? "bg-gray-700/50 border border-gray-600 text-gray-100" 
                      : "bg-gray-50/80 border border-gray-300 text-gray-900"
                    }
                  `}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  🚨 Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={`w-full p-3 rounded-xl focus:ring-4 focus:ring-orange-300/50 outline-none transition-all duration-300
                    ${darkMode 
                      ? "bg-gray-700/50 border border-gray-600 text-gray-100" 
                      : "bg-gray-50/80 border border-gray-300 text-gray-900"
                    }
                  `}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                🏷️ Tags
              </label>
              <div className={`p-3 rounded-2xl min-h-[60px] ${darkMode ? "bg-gray-700/30" : "bg-gray-50/50"}`}>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1
                        ${darkMode ? "bg-purple-600/30 text-purple-300" : "bg-purple-100 text-purple-700"}
                      `}
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:scale-110 transition-transform"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tag and press Enter (max 5)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={addTag}
                  className={`w-full p-2 rounded-lg focus:ring-2 focus:ring-purple-300/50 outline-none text-sm
                    ${darkMode 
                      ? "bg-gray-600/50 border border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white/50 border border-gray-300 text-gray-900 placeholder-gray-500"
                    }
                  `}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                Add Task
                <motion.span
                  initial={{ x: -5, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  className="group-hover:block hidden"
                >
                  🚀
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
