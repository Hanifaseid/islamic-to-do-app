// src/pages/About.jsx
import { BookOpen, CheckCircle, Clock } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: BookOpen,
      title: "Quranic Reminders",
      description:
        "Stay spiritually connected with motivating Quranic verses and daily reminders."
    },
    {
      icon: CheckCircle,
      title: "Task Management",
      description:
        "Add tasks, mark them complete, and track your progress toward productivity."
    },
    {
      icon: Clock,
      title: "Always Available",
      description:
        "Your tasks are saved securely in local storage — they persist even after reloads."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-xl text-center mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl" />
        <h2 className="relative text-3xl font-bold mb-3">ℹ️ About This App</h2>
        <p className="relative text-lg text-white/90 max-w-2xl mx-auto">
          The Islamic To-Do App is designed to keep you organized and
          spiritually motivated with a balance of productivity and faith.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4 group-hover:scale-110 transition">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
