import QuoteSection from "./QuoteSection";
import TaskCard from "./TaskCard";

export default function MainContent({ tasks, toggleComplete }) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Welcome */}
      <div className="bg-white p-6 rounded-xl shadow-md text-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">
          Welcome to My Islamic To-Do App
        </h2>
        <p className="text-gray-600 mt-2">
          Stay organized and motivated with Quranic reminders ✨
        </p>
      </div>

      {/* Quote */}
      <QuoteSection />

      {/* Tasks */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          📝 Your Tasks
        </h3>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Add one to get started!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
