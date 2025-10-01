import QuoteSection from "./QuoteSection";
import TaskCard from "./TaskCard";

export default function MainContent({ tasks, toggleComplete, darkMode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Section */}
      <div
        className={`p-8 rounded-2xl shadow-lg text-center transition-colors duration-500
          ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}
        `}
      >
        <h2
          className={`text-3xl font-extrabold ${
            darkMode ? "text-emerald-400" : "text-green-700"
          }`}
        >
          Welcome to My Islamic To-Do App
        </h2>
        <p
          className={`mt-3 text-lg ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Stay organized and motivated with Quranic reminders ✨
        </p>
      </div>

      {/* Quote Section */}
      <QuoteSection darkMode={darkMode} />

      {/* Tasks Section */}
      <div
        className={`p-8 rounded-2xl shadow-lg transition-colors duration-500
          ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}
        `}
      >
        <h3
          className={`text-2xl font-semibold mb-6 ${
            darkMode ? "text-emerald-400" : "text-green-700"
          }`}
        >
          📝 Your Tasks
        </h3>

        {tasks.length === 0 ? (
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            No tasks yet. Add one to get started!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleComplete}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
