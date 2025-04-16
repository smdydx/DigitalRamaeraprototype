import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  Linkedin, 
  Facebook, 
  Instagram 
} from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Our Location",
    details: ["H-77 ,Sector 63, Noida, Uttar Pradesh, India"],
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email Us",
    details: ["support@ramaera.com"],
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Call Us",
    details: ["+911169310715", "+911204152818"],
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Business Hours",
    details: ["Monday-Friday: 10:00 AM - 6:30 PM", "Saturday: 10:00 AM - 2:00 PM"],
  },
];

const socialLinks = [
  { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/company/ramaera-legal-infotech-pvt-ltd/" },
  { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/profile.php?id=61571353791629" },
  { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/ramaera_legal_infotech_pvt_ltd?igsh=MWt1bWgycHBzMW9iZw==" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Enq_Message: "",
    Company_Name: "Ramaera",
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, privacy: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacy) {
      toast({
        title: "Agreement required",
        description: "Please agree to the privacy policy and terms of service.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const currentDate = new Date();
      const requestData = {
        Id: 0,
        Name: formData.Name,
        Email: formData.Email,
        Subject: formData.Subject,
        Enq_Message: formData.Enq_Message,
        Company_Name: "Softbeem",
        CreatedDate: currentDate.toISOString()
      };
      
      const response = await fetch('https://api.ramestta.com/api/Enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify([requestData])
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error:', errorData);
        throw new Error('Failed to send message');
      }
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({
        Name: "",
        Email: "",
        Subject: "",
        Enq_Message: "",
        Company_Name: "Softbeem",
        privacy: false,
      });
    } catch (error) {
      toast({
        title: "Message not sent",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="inline-block mb-4">
            <span className="text-primary font-medium text-sm uppercase tracking-wider relative before:content-[''] before:absolute before:w-8 before:h-[2px] before:bg-primary before:left-full before:top-1/2 before:ml-2 after:content-[''] after:absolute after:w-8 after:h-[2px] after:bg-primary after:right-full after:top-1/2 after:mr-2">
              Contact Us
            </span>
          </motion.div>
          <motion.h2
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Get In Touch With Us
          </motion.h2>
          <motion.p variants={fadeIn("up", "tween", 0.3, 1)} className="text-muted-foreground">
            Have a project in mind or need consultation? Reach out to us, and our team will get back to you soon.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div variants={fadeIn("right", "tween", 0.2, 1)}>
            <div className="bg-zinc-900 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn("up", "tween", 0.1 * index, 0.5)}
                    className="flex items-start"
                  >
                    <div className="bg-primary/10 p-3 rounded-md mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{info.title}</h4>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ y: -3 }}
                      href={link.href}
                      className="bg-zinc-800 hover:bg-primary text-white p-3 rounded-md transition-colors duration-300"
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn("left", "tween", 0.2, 1)}>
            <form 
              className="bg-zinc-900 p-8 rounded-lg"
              onSubmit={handleSubmit}
            >
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <Input
                    type="email"
                    id="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="Subject"
                  name="Subject"
                  value={formData.Subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <Textarea
                  id="Enq_Message"
                  name="Enq_Message"
                  value={formData.Enq_Message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your project or inquiry..."
                  required
                />
              </div>

              <div className="mb-6 flex items-center space-x-2">
                <Checkbox 
                  id="privacy" 
                  checked={formData.privacy}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="privacy"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree with the privacy policy and terms of service
                </label>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;