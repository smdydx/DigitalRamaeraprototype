import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Database, ServerCog, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import JarvisGlobe from "./JarvisGlobe";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [currentIcon, setCurrentIcon] = useState(0);
  const floatingIcons = [
    <Database className="h-6 w-6 text-primary" />,
    <ServerCog className="h-6 w-6 text-[#FF3366]" />,
    <Rocket className="h-6 w-6 text-yellow-500" />,
    <Database className="h-6 w-6 text-green-500" />
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % floatingIcons.length);
    }, 2000);

    return () => clearInterval(iconInterval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background z-10"></div>
        <div className="circuit-board-bg w-full h-full"></div>
      </div>

      {/* Floating Digital Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0.3
          }}
          animate={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 15 + Math.random() * 20, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="absolute z-0"
        >
          <div className="text-primary/30 text-lg">
            {floatingIcons[Math.floor(Math.random() * floatingIcons.length)]}
          </div>
        </motion.div>
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              <div className="flex flex-col items-start pt-12 sm:pt-4">
                <div className="mb-2 relative">
                  <h1 className="font-['Orbitron'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#00FF00] via-[#008000] to-[#004400] mb-2 digital-glow relative z-10 hover:scale-105 transition-transform duration-300 flex items-center gap-2 sm:gap-4"><span className="text-6xl sm:text-9xl">&lt;/&gt;</span>Softbeem</h1>
                  <div className="flex flex-nowrap whitespace-nowrap gap-1 sm:gap-3 items-center hero-text-mobile">
                    <span className="font-['Rajdhani'] text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FF00] via-[#008000] to-[#004400] digital-glow relative z-10 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-green-500/10 after:to-transparent after:blur-lg hover:scale-105 transition-transform duration-300">Search</span>
                    <span className="font-['Rajdhani'] text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white digital-glow relative z-10 hover:scale-105 transition-transform duration-300">Ends Here</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-transparent blur-2xl"></div>
                </div>
              </div>
            </div>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg text-left">
              <span className="bg-gradient-to-r from-[#00FF00] to-[#32CD32] text-transparent bg-clip-text font-bold">Empowering businesses</span> with cutting-edge technology and comprehensive legal services to navigate the digital transformation landscape.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => scrollToSection("#services")}
                className="flex items-center gap-2 bg-gradient-to-r from-[#00FF00] to-[#004400] hover:from-[#008000] hover:to-[#006600] border-none shadow-lg shadow-green-500/20"
              >
                Our Services <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => scrollToSection("#contact")}
                className="border-orange-500/30 text-white hover:bg-orange-500/10 shadow-lg"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* Mobile Globe - Only visible on small screens */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 mb-20 relative flex justify-center"
            >
              <div className="relative">
                {/* Glowing background effects */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -top-10 -left-10 w-44 h-44 bg-primary/10 rounded-full filter blur-3xl"
                ></motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#FF3366]/10 rounded-full filter blur-3xl"
                ></motion.div>

                {/* Digital ring effect */}
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.03, 1] }}
                  transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] border border-[#FF8C00]/20 rounded-full"
                  style={{ boxShadow: "0 0 15px rgba(255, 140, 0, 0.2)" }}
                />

                <motion.div
                  animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                  transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, delay: 1 } }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-[#FF4500]/20 rounded-full"
                  style={{ boxShadow: "0 0 20px rgba(255, 69, 0, 0.15)" }}
                />

                {/* Data points indicators */}
                <motion.div 
                  animate={{ 
                    x: [0, 15, 0],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute top-1/4 right-1/4 h-2 w-2 bg-[#FF6E00] rounded-full shadow-[0_0_10px_rgba(255,110,0,0.7)]"
                />

                <motion.div 
                  animate={{ 
                    x: [0, -10, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                  className="absolute bottom-1/3 left-1/3 h-2 w-2 bg-[#FFA500] rounded-full shadow-[0_0_10px_rgba(255,165,0,0.7)]"
                />

                {/* Jarvis Globe */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="mx-auto relative z-10"
                >
                  <JarvisGlobe size={340} />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Desktop Globe - Only visible on large screens */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Glowing background effects */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-10 -left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"
              ></motion.div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#FF3366]/10 rounded-full filter blur-3xl"
              ></motion.div>

              {/* Digital ring effects */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.03, 1] }}
                transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-[#FF8C00]/20 rounded-full"
                style={{ boxShadow: "0 0 15px rgba(255, 140, 0, 0.2)" }}
              />

              <motion.div
                animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, delay: 1 } }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] border border-[#FF4500]/20 rounded-full"
                style={{ boxShadow: "0 0 20px rgba(255, 69, 0, 0.15)" }}
              />

              {/* Data points indicators */}
              <motion.div 
                animate={{ 
                  x: [0, 20, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-1/4 right-1/4 h-2 w-2 bg-[#FF6E00] rounded-full shadow-[0_0_10px_rgba(255,110,0,0.7)]"
              />

              <motion.div 
                animate={{ 
                  x: [0, -15, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className="absolute bottom-1/3 left-1/3 h-2 w-2 bg-[#FFA500] rounded-full shadow-[0_0_10px_rgba(255,165,0,0.7)]"
              />

              {/* Jarvis Globe */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mx-auto relative z-10"
              >
                <JarvisGlobe size={480} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection("#about")}
          className="text-white hover:text-primary transition-colors duration-300 bg-zinc-800/80 p-3 rounded-full border border-orange-500/20 backdrop-blur-sm shadow-lg"
          aria-label="Scroll to About section"
          style={{ boxShadow: "0 0 15px rgba(255, 110, 0, 0.1)" }}
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      </motion.div>
    </section>
  );
};

interface ServiceHighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceHighlightCard = ({ icon, title, description }: ServiceHighlightCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 1, rotate: 0 }}
      animate={{ 
        boxShadow: [
          "0 0 0 rgba(255, 110, 0, 0)",
          "0 0 15px rgba(255, 110, 0, 0.2)",
          "0 0 0 rgba(255, 110, 0, 0)"
        ]
      }}
      transition={{ 
        boxShadow: { duration: 2, repeat: Infinity },
        scale: { type: "spring", stiffness: 300 } 
      }}
      className="bg-zinc-800/80 p-6 rounded-lg flex flex-col items-center text-center cursor-pointer backdrop-blur-sm border border-orange-500/10 shadow-xl"
      style={{ boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 110, 0, 0.1)" }}
    >
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-[#FF6E00] mb-4 bg-orange-500/10 p-3 rounded-full"
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-medium mb-2 tech-heading bg-gradient-to-r from-[#FF6E00] to-[#FFA500] text-transparent bg-clip-text">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default HeroSection;