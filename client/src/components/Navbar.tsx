import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Code, ChevronDown, ChevronRight } from "lucide-react";
import { servicesData } from "@/data/services";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  
  { name: "Blogs", href: "#blog" },
  { name: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<string | null>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
        setActiveServiceCategory(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
    if (!servicesDropdownOpen) {
      setActiveServiceCategory("tech");
    } else {
      setActiveServiceCategory(null);
    }
  };

  const handleServiceCategoryHover = (category: string) => {
    setActiveServiceCategory(category);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setActiveServiceCategory(null);
    const element = document.querySelector(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 sm:py-1 bg-gradient-to-r from-black/90 via-zinc-900/90 to-black/90 backdrop-blur-lg border-b border-green-500/10 shadow-lg shadow-green-500/5"
          : "py-4 sm:py-2 bg-gradient-to-r from-black/80 via-zinc-900/80 to-black/80 backdrop-blur-md"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(0,255,0,0.1)_0%,_transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(0,128,0,0.1)_0%,_transparent_50%)] pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between bg-gradient-to-r from-zinc-900/50 via-transparent to-zinc-900/50 rounded-full px-4 py-2 backdrop-blur-sm border border-green-500/10">
          <div className="flex items-center">
            <div onClick={() => window.location.href = '/'} className="cursor-pointer">
              <div className="font-bold text-white flex items-center">
                  <h1 className="font-['Orbitron'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#00FF00] via-[#008000] to-[#004400] mb-0 sm:mb-4 digital-glow relative z-10 hover:scale-105 transition-transform duration-300"><span className="text-4xl sm:text-7xl">&lt;/&gt;</span></h1>
               <h1 className=""></h1>
                {/* <img src="/images/ramaera-logo.jpg" alt="Ramaera Logo" className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-2 border-orange-500/30 shadow-lg shadow-orange-500/20" /> */}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-end flex-1 space-x-6 ml-auto desktop-nav">
            {navLinks.map((link, index) => {
              // Create Services dropdown button
              if (link.name === "Services") {
                return (
                  <div key={index} className="relative" ref={servicesDropdownRef}>
                    <button
                      onClick={toggleServicesDropdown}
                      className="relative text-white hover:text-primary font-medium transition-colors duration-300 group flex items-center gap-1"
                    >
                      {link.name}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </button>

                    {/* Services Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-[600px] bg-zinc-900 rounded-lg shadow-xl border border-zinc-800 overflow-hidden z-50"
                        >
                          <div className="flex">
                            {/* Category Menu */}
                            <div className="w-1/3 bg-zinc-800/50 p-2">
                              {Object.keys(servicesData).map((category) => (
                                <button
                                  key={category}
                                  onMouseEnter={() => handleServiceCategoryHover(category)}
                                  onClick={() => handleServiceCategoryHover(category)}
                                  className={`w-full text-left p-3 rounded-md transition-colors duration-200 flex justify-between items-center ${
                                    activeServiceCategory === category
                                      ? "bg-primary/10 text-primary"
                                      : "text-white hover:bg-zinc-700/50"
                                  }`}
                                >
                                  <span className="capitalize">{category} Services</span>
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                              ))}
                            </div>

                            {/* Services List */}
                            <div className="w-2/3 p-4">
                              <AnimatePresence mode="wait">
                                {activeServiceCategory && (
                                  <motion.div
                                    key={activeServiceCategory}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <h3 className="text-lg font-medium text-primary mb-3 capitalize">
                                      {activeServiceCategory} Solutions
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                      {servicesData[activeServiceCategory as keyof typeof servicesData].map((service, idx) => (
                                        <motion.button
                                          key={idx}
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                                          onClick={() => scrollToSection("#services")}
                                          className="flex items-start gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors group"
                                        >
                                          <div className="text-primary mt-1">
                                            <div className="h-5 w-5">{React.createElement(service.icon)}</div>
                                          </div>
                                          <div className="text-left">
                                            <h4 className="text-white group-hover:text-primary transition-colors">
                                              {service.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-1">
                                              {service.features[0]}
                                            </p>
                                          </div>
                                        </motion.button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Normal nav links
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="relative text-white hover:text-primary font-medium transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[4rem] left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-border overflow-y-auto max-h-[calc(100vh-4rem)] z-50 min-h-screen"
          >
            <div className="flex flex-col space-y-1 px-4 py-5 pb-20 w-full">
              {navLinks.map((link, index) => {
                // Services dropdown for mobile
                if (link.name === "Services") {
                  return (
                    <div key={index} className="py-2">
                      <button
                        onClick={() => {
                          toggleServicesDropdown();
                        }}
                        className="text-white hover:text-primary font-medium transition-colors duration-300 flex items-center justify-between w-full px-4"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-4 mt-2 border-l border-zinc-700 space-y-2 max-h-[40vh] overflow-y-auto"
                          >
                            {Object.keys(servicesData).map((category) => (
                              <div key={category} className="mb-3">
                                <h3 className="text-sm font-medium text-primary mb-2 capitalize">
                                  {category} Solutions
                                </h3>
                                <div className="space-y-2">
                                  {servicesData[category as keyof typeof servicesData].map((service, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => scrollToSection("#services")}
                                      className="service-item flex items-center text-sm text-muted-foreground hover:text-white w-full text-left"
                                    >
                                      <div className="service-icon text-primary">{React.createElement(service.icon)}</div>
                                      <span className="service-text">{service.title}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Normal nav links
                return (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(link.href.substring(1));
                      if (element) {
                        setIsMobileMenuOpen(false);
                        setTimeout(() => {
                          const yOffset = -80;
                          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className="block text-white hover:text-primary font-medium py-2 transition-colors duration-300 w-full text-left px-4"
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;