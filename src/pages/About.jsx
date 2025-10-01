import { BookOpen, CheckCircle, Clock, Sparkles, Star, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function About({ darkMode }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef([]);
  const canvasRef = useRef(null);

  const features = [
    {
      icon: BookOpen,
      title: "Quranic Reminders",
      description: "Stay spiritually connected with motivating Quranic verses and daily reminders.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: CheckCircle,
      title: "Task Management",
      description: "Add tasks, mark them complete, and track your progress toward productivity.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "Your tasks are saved securely in local storage — they persist even after reloads.",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observers = [];
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              ref.classList.add('animate-fade-in-up');
              observer.unobserve(ref);
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  // Particle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = darkMode ? '#10B981' : '#059669';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 10000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-all duration-700 p-6 rounded-2xl relative overflow-hidden
        ${darkMode 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100" 
          : "bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 text-gray-900"
        }
      `}
    >
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 opacity-20 animate-float">
        <BookOpen size={40} className={darkMode ? "text-green-400" : "text-green-600"} />
      </div>
      <div className="absolute top-20 right-20 opacity-30 animate-float" style={{ animationDelay: '2s' }}>
        <Moon size={35} className={darkMode ? "text-blue-400" : "text-blue-600"} />
      </div>
      <div className="absolute bottom-20 left-20 opacity-25 animate-float" style={{ animationDelay: '4s' }}>
        <Star size={30} className={darkMode ? "text-yellow-400" : "text-yellow-600"} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 animate-float" style={{ animationDelay: '3s' }}>
        <Sun size={35} className={darkMode ? "text-orange-400" : "text-orange-600"} />
      </div>

      {/* Hero Section */}
      <div
        ref={el => sectionRefs.current[0] = el}
        className={`relative overflow-hidden rounded-2xl shadow-2xl mb-16 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Animated Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-r ${
          darkMode 
            ? "from-green-600 via-emerald-600 to-teal-600 animate-gradient-x" 
            : "from-green-400 via-emerald-500 to-teal-500 animate-gradient-x"
        }`} />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-10" />
        
        {/* Animated Sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <Sparkles size={20} className="text-white opacity-70" />
            </div>
          ))}
        </div>

        <div className="relative p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6 animate-pulse-slow">
            <BookOpen size={32} className="text-white" />
          </div>
          
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
            About This App
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-white/90 font-light">
            The Islamic To-Do App is designed to keep you organized and
            spiritually motivated with a perfect balance of{" "}
            <span className="font-semibold text-white">productivity</span> and{" "}
            <span className="font-semibold text-white">faith</span>.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            {[
              { number: "99%", label: "Spiritual Focus" },
              { number: "24/7", label: "Availability" },
              { number: "100%", label: "Privacy" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              ref={el => sectionRefs.current[idx + 1] = el}
              className={`group relative rounded-2xl p-8 backdrop-blur-sm border transition-all duration-500 transform hover:scale-105
                ${darkMode 
                  ? "bg-gray-800/60 border-gray-700 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20" 
                  : "bg-white/80 border-gray-200 hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/20"
                }
              `}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Animated Icon Container */}
              <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-500 group-hover:scale-110
                ${darkMode 
                  ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                  : `bg-gradient-to-r ${item.gradient} shadow-lg`
                }
              `}>
                <Icon size={28} className="text-white" />
                
                {/* Pulse Animation */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-50 animate-ping`} style={{ animationDuration: '2s' }} />
              </div>

              <h3 className={`text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r
                ${darkMode 
                  ? "from-green-300 to-emerald-300" 
                  : "from-green-600 to-emerald-600"
                }
              `}>
                {item.title}
              </h3>
              
              <p className={`text-lg leading-relaxed transition-colors duration-300
                ${darkMode ? "text-gray-300" : "text-gray-600"}
              `}>
                {item.description}
              </p>

              {/* Animated Border */}
              <div className={`absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r ${item.gradient} group-hover:w-full group-hover:left-0 transition-all duration-500 rounded-full`} />
            </div>
          );
        })}
      </div>

      {/* Additional Info Section */}
      <div
        ref={el => sectionRefs.current[4] = el}
        className={`mt-16 rounded-2xl p-8 backdrop-blur-sm border transition-all duration-500
          ${darkMode 
            ? "bg-gray-800/40 border-gray-700" 
            : "bg-white/60 border-gray-200"
          }
        `}
      >
        <div className="text-center max-w-4xl mx-auto">
          <h3 className={`text-3xl font-bold mb-6
            ${darkMode ? "text-green-300" : "text-green-600"}
          `}>
            Built with Modern Technology
          </h3>
          <p className={`text-xl leading-relaxed mb-8
            ${darkMode ? "text-gray-300" : "text-gray-600"}
          `}>
            This application leverages cutting-edge web technologies including React, 
            Tailwind CSS, and modern browser APIs to deliver a seamless and inspiring user experience.
          </p>
          
          {/* Tech Stack Icons */}
          <div className="flex justify-center space-x-8 opacity-70">
            {["React", "Tailwind", "JavaScript", "CSS3"].map((tech, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 text-lg font-bold
                  ${darkMode ? "bg-gray-700 text-green-300" : "bg-white text-green-600"}
                `}>
                  {tech.charAt(0)}
                </div>
                <span className={darkMode ? "text-gray-400" : "text-gray-600"}>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}