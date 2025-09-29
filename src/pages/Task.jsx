// src/pages/Tasks.jsx
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Tasks({ tasks, addTask, toggleComplete }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-4">📝 My Tasks</h2>

      {/* Task Form */}
      <TaskForm onAdd={addTask} />

      {/* Task List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete} />
        ))}
      </div>
    </div>
  );
}
