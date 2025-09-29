// src/pages/About.jsx
export default function About() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-4">ℹ️ About</h2>
      <p className="text-gray-600 mb-2">
        This Islamic To-Do App helps you stay organized and motivated with daily prayers, Quranic reminders, and task management.
      </p>
      <p className="text-gray-600">
        You can add tasks, mark them as complete, and view your progress. All your tasks are saved in local storage and persist across page reloads.
      </p>
    </div>
  );
}
