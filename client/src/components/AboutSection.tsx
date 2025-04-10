import { motion } from "framer-motion";
import { fadeIn, staggerContainer, slideIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const features = [
  {
    title: "Technology Expertise",
    description: "Cutting-edge solutions from blockchain to mobile apps",
  },
  {
    title: "Legal Services",
    description: "Comprehensive business registration & compliance",
  },
  {
    title: "Custom Solutions",
    description: "Tailored to meet your specific business needs",
  },
  {
    title: "Expert Team",
    description: "Highly skilled professionals with domain expertise",
  },
];

const AboutSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={fadeIn("right", "tween", 0.2, 1)}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Team collaboration"
              className="rounded-lg shadow-lg"
            />
            <motion.div
              variants={slideIn("right", "tween", 0.4, 1)}
              className="absolute -bottom-10 -right-10 bg-primary text-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block"
            >
              <p className="text-lg font-semibold mb-2">10+ Years</p>
              <p className="text-sm opacity-80">
                Delivering excellence in technology and legal solutions
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn("left", "tween", 0.2, 1)}>
            <div className="inline-block mb-4">
              <span className="text-primary font-medium text-sm uppercase tracking-wider relative before:content-[''] before:absolute before:w-8 before:h-[2px] before:bg-primary before:left-full before:top-1/2 before:ml-2">
                About Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We Combine Technology & Legal Expertise
            </h2>
            <p className="text-muted-foreground mb-8">
              Ramaera is a premier technology and legal services company that specializes in providing innovative solutions to businesses across various sectors. Our team of experts combines technical prowess with legal knowledge to deliver comprehensive services that address the complex challenges of today's digital landscape.
            </p>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", "tween", 0.1 * index, 0.5)}
                  className="flex items-start"
                >
                  <div className="bg-primary/10 p-2 rounded-md mr-4">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <Button 
              size="lg" 
              onClick={() => scrollToSection("#services")}
              className="flex items-center gap-2"
            >
              Explore Our Services <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
