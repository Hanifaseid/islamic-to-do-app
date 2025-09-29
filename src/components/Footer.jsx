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

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Islamic To-Do App',
        text: 'Check out this beautiful Islamic productivity app!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
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
      isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-800 via-green-700 to-emerald-900 text-white'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Brand Section - Full width on mobile, 2 cols on desktop */}
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
              A spiritual productivity companion designed to help you balance your worldly tasks 
              with your spiritual journey.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 flex-shrink-0"
                title="Toggle theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
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

          {/* Quick Links - Hidden on mobile, visible on desktop */}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full p-3 bg-white/10 rounded-lg flex items-center justify-between"
            >
              <span className="font-semibold">Quick Links</span>
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Quran Verse - Full width on mobile, proper column on desktop */}
          <div className="bg-white/10 rounded-xl p-4 lg:p-6 backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen size={18} className="text-green-300 flex-shrink-0" />
              <span className="text-green-200 text-sm font-medium">Daily Verse</span>
            </div>
            <blockquote className="text-sm italic text-green-50 leading-relaxed mb-2">
              "Indeed, Allah is with the patient."
            </blockquote>
            <cite className="text-xs text-green-200 not-italic">Quran 2:153</cite>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
            <div className="grid grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={16} />
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-6 lg:mt-8 pt-6 lg:pt-8">
          {/* Copyright and Built with love */}
          <div className="flex flex-col items-center space-y-3 lg:flex-row lg:justify-between lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center">
              <span className="text-green-100 text-sm">© {currentYear} Islamic To-Do App</span>
              <span className="hidden sm:inline text-white">•</span>
              <span className="flex items-center space-x-1 text-green-100 text-sm">
                <span>Built with</span>
                <Heart size={14} className="text-red-400 fill-current animate-pulse mx-1" />
                <span>for the Ummah</span>
              </span>
            </div>
            
            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm text-green-100">
              {footerLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href}
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>
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

      {/* Decorative Wave - Hidden on mobile for better performance */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg 
          className="relative block w-full h-12" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0Z" 
            className="fill-white/10"
          ></path>
        </svg>
      </div>
    </footer>
  );
}