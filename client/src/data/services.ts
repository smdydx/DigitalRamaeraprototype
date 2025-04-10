import {
  Code,
  CreditCard,
  Smartphone,
  Building,
  Network,
  FileText,
  ShieldCheck,
  UtensilsCrossed,
  LineChart,
  ServerCog,
} from "lucide-react";

interface Service {
  icon: React.ComponentType;
  title: string;
  features: string[];
}

interface ServicesData {
  tech: Service[];
  business: Service[];
  legal: Service[];
  digital: Service[];
}

export const servicesData: ServicesData = {
  tech: [
    {
      icon: Code,
      title: "Blockchain Development",
      features: [
        "Custom blockchain solutions",
        "Smart contract development",
        "dApp development",
        "Private/public blockchain solutions",
      ],
    },
    {
      icon: CreditCard,
      title: "Fintech App Development",
      features: [
        "Digital payment solutions",
        "E-wallet and banking apps",
        "Loan management software",
        "UPI integration",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      features: [
        "Android & iOS development",
        "UI/UX design",
        "App maintenance",
        "Cross-platform solutions",
      ],
    },
  ],
  business: [
    {
      icon: Building,
      title: "Real Estate Software",
      features: [
        "Property management",
        "CRM solutions",
        "Smart contract integration",
        "Listing management",
      ],
    },
    {
      icon: Network,
      title: "MLM Software Development",
      features: [
        "Binary/matrix plans",
        "E-wallet management",
        "Real-time tracking",
        "Commission management",
      ],
    },
  ],
  legal: [
    {
      icon: FileText,
      title: "Business Registration",
      features: [
        "Company Incorporation",
        "LLP Formation",
        "Partnership Firm Registration",
        "Partner Registration",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Compliance Services",
      features: [
        "GST Registration",
        "FSSAI Registration",
        "Annual compliance",
        "Legal documentation support",
      ],
    },
  ],
  digital: [
    {
      icon: UtensilsCrossed,
      title: "Food Delivery App",
      features: [
        "User & restaurant apps",
        "Real-time order tracking",
        "Payment integration",
        "Delivery management",
      ],
    },
    {
      icon: LineChart,
      title: "Trading Platforms",
      features: [
        "Crypto trading platforms",
        "Stocks & commodities",
        "Real-time data visualization",
        "Portfolio management",
      ],
    },
    {
      icon: ServerCog,
      title: "API Services",
      features: [
        "Bus & Hotel Booking API",
        "Bharat Connect API",
        "Aadhaar Verification API",
        "Money Transfer API",
      ],
    },
  ],
};
