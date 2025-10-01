import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Home,
  CheckSquare,
  Info,
  Star
} from "lucide-react";

export default function Header({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // scroll effect for shadow/backdrop (does NOT toggle theme)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMenuOpen(false);

  const navLinks = [
    { name: "Home", path: "/", icon: Home, description: "Welcome to your spiritual journey" },
    { name: "Tasks", path: "/tasks", icon: CheckSquare, description: "Manage your daily tasks" },
    { name: "About", path: "/about", icon: Info, description: "Learn about our mission" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-green-600 to-emerald-600 text-white"}
          ${scrolled ? "backdrop-blur-sm shadow-2xl border-b border-gray-200/10 dark:border-gray-700/30" : ""}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">

            {/* Logo */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className={`relative rounded-2xl p-2 ${darkMode ? "bg-gray-800/60" : "bg-white/10"}`}>
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className={`font-bold ${scrolled ? "text-lg lg:text-xl" : "text-xl lg:text-2xl"}`}>
                  Islamic Tasks
                </h1>
                <p className="text-xs hidden sm:block text-white/80">Spiritual Productivity Companion</p>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium mx-1
                      ${isActive ? (darkMode ? "bg-white/8 text-green-300" : "bg-white/20 text-white") : "text-white/90 hover:bg-white/10"}
                    `}
                  >
                    <Icon size={16} className="flex-shrink-0" />
                    <span>{link.name}</span>
                    {isActive && <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full bg-yellow-300 animate-pulse" />}
                  </NavLink>
                );
              })}

              {/* Theme switch (desktop) */}
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
                className="ml-3 relative w-14 h-7 flex items-center rounded-full p-1 transition-transform shadow-lg bg-white/10"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transform transition-all duration-300
                    ${darkMode ? "translate-x-7 bg-gray-800 text-yellow-300" : "translate-x-0 bg-yellow-300 text-white"}
                  `}
                >
                  {darkMode ? <Moon size={12} /> : <Sun size={12} />}
                </div>
              </button>
            </nav>

            {/* Mobile controls */}
            <div className="flex lg:hidden items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-white/10 text-white/90 hover:scale-105 transition"
                aria-label="Toggle theme"
              >
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="p-2 rounded-lg bg-white/10 text-white/90 hover:scale-105 transition"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${menuOpen ? "block" : "hidden"} px-4 pb-6 bg-opacity-90`}>
          <div className="px-2 pt-4 space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 p-3 rounded-2xl transition ${isActive ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/5"}`}
                >
                  <div className={`p-2 rounded-xl ${isActive ? "bg-green-500 text-white" : "bg-white/10 text-white/80"}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base">{link.name}</div>
                    <div className="text-sm text-white/70 mt-1">{link.description}</div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
