// src/components/TaskForm.jsx
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      deadline,
      completed: false,
    };

    onAdd(newTask);

    // Reset form
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-4 mb-6 border border-gray-200"
    >
      <h3 className="text-lg font-bold text-green-800 mb-3">➕ Add New Task</h3>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-green-400"
      />

      <textarea
        placeholder="Task description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-green-400"
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-green-400"
      />

      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Add Task
      </button>
    </form>
  );
}
