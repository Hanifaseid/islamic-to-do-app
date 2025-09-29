// src/components/Navbar.jsx
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Sun, 
  Moon, 
  Menu, 
  X,
  Home,
  CheckSquare,
  Info,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Apply dark mode class and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Islamic Tasks
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`
                      relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium
                      ${isActive
                        ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Right Section - Dark Mode Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle - Advanced */}
              <button
                onClick={toggleDarkMode}
                className={`
                  relative w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ease-in-out
                  shadow-inner border
                  ${darkMode 
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 justify-end' 
                    : 'bg-gradient-to-r from-yellow-300 to-orange-300 border-yellow-400 justify-start'
                  }
                  hover:scale-105 active:scale-95
                `}
                aria-label="Toggle dark mode"
              >
                {/* Track */}
                <div className={`
                  absolute inset-0 rounded-full transition-opacity duration-300
                  ${darkMode ? 'opacity-100' : 'opacity-0'}
                `}>
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900 rounded-full opacity-20" />
                </div>
                
                {/* Thumb */}
                <div className={`
                  relative w-6 h-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out
                  flex items-center justify-center
                  ${darkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600' 
                    : 'bg-gradient-to-br from-white to-yellow-100 border border-yellow-200'
                  }
                `}>
                  {darkMode ? (
                    <Moon size={12} className="text-yellow-300" />
                  ) : (
                    <Sun size={12} className="text-orange-500" />
                  )}
                  
                  {/* Glow effect */}
                  <div className={`
                    absolute inset-0 rounded-full opacity-0 transition-opacity duration-300
                    ${darkMode ? 'bg-yellow-400' : 'bg-orange-400'}
                    group-hover:opacity-20
                  `} />
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 
          border-b border-gray-200 dark:border-gray-700 shadow-xl
          transition-all duration-300 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
                    ${isActive
                      ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="text-lg">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}