// src/components/Footer.jsx
import { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  BookOpen, 
  Calendar,
  Moon,
  Sun,
  Share2,
  ArrowUp,
  Menu,
  X
} from 'lucide-react';

export default function Footer({ darkMode, toggleDarkMode }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const shareApp = () => {
    if (navigator.share) navigator.share({ title: 'Islamic To-Do App', text: 'Check out this beautiful Islamic productivity app!', url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); }
  };

  const quickLinks = [
    { icon: BookOpen, label: 'Quran Verses', href: '#verses' },
    { icon: Calendar, label: 'Prayer Times', href: '#prayer' },
    { icon: Users, label: 'Community', href: '#community' },
  ];

  const footerLinks = [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Contact', href: '#contact' },
    { label: 'Support', href: '#support' },
  ];

  return (
    <footer className={`relative overflow-hidden transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-800 via-green-700 to-emerald-900 text-white'
    }`}>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent text-center sm:text-left">
                Islamic To-Do App
              </h3>
            </div>
            <p className="text-green-100 mb-4 leading-relaxed text-sm sm:text-base text-center sm:text-left">
              A spiritual productivity companion to balance worldly tasks and your faith journey.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 flex-shrink-0"
                title="Toggle theme"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={shareApp}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 flex-shrink-0"
                title="Share app"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h4 className="font-semibold text-base lg:text-lg mb-3 lg:mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 lg:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors duration-200 group text-sm lg:text-base"
                  >
                    <link.icon size={14} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-6 lg:mt-8 pt-6 lg:pt-8 flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
          <span className="text-green-100 text-sm">© {currentYear} Islamic To-Do App</span>
          <span className="flex items-center space-x-1 text-green-100 text-sm">
            <span>Built with</span>
            <Heart size={14} className="text-red-400 fill-current animate-pulse mx-1" />
            <span>for the Ummah</span>
          </span>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm text-green-100">
            {footerLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-white transition-colors whitespace-nowrap">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-2 sm:p-3 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90'
        } hover:scale-110 z-50`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} className="sm:w-5 sm:h-5" />
      </button>
    </footer>
  );
}
