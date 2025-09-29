// src/components/TaskCard.jsx
export default function TaskCard({ task, onToggleComplete }) {
  return (
    <div
      className={`bg-white shadow-md rounded-xl p-4 border transition ${
        task.completed ? "border-green-500 bg-green-50" : "border-gray-200"
      }`}
    >
      <h3
        className={`text-lg font-bold ${
          task.completed ? "text-green-500 line-through" : "text-green-700"
        }`}
      >
        {task.title}
      </h3>
      <p className={`mt-2 ${task.completed ? "line-through text-gray-400" : "text-gray-600"}`}>
        {task.description}
      </p>
      {task.deadline && (
        <p className="text-sm text-gray-500 mt-2">⏰ {task.deadline}</p>
      )}

      <button
        onClick={() => onToggleComplete(task.id)}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {task.completed ? "Undo" : "Complete"}
      </button>
    </div>
  );
}
