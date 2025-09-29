// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="bg-green-700 text-white shadow-lg dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">🌙 Islamic To-Do App</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-yellow-300 transition ${
                  isActive ? "text-yellow-300" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="py-1 px-3 rounded bg-white text-green-700 font-semibold hover:bg-gray-200 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-600 dark:bg-gray-900 text-white">
          <nav className="flex flex-col p-4 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "text-yellow-300" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="py-1 px-3 rounded bg-white text-green-700 font-semibold hover:bg-gray-200 transition mt-2"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
