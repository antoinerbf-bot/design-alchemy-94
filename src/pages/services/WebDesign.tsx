import ServicePageTemplate from "@/components/common/ServicePageTemplate";
import { Code } from "lucide-react";

export default function WebDesign() {
  return (
    <ServicePageTemplate
      serviceKey="webDesign"
      icon={<Code className="h-8 w-8 text-foreground" />}
      gradient="from-blue-500 to-cyan-400"
      features={[
        "Design responsive mobile-first (320px → 1920px) avec optimisation Google PageSpeed >90",
        "Intégration CMS avancé (WordPress, Webflow, ou sur-mesure React)",
        "E-commerce complet : Stripe, PayPal, Apple Pay, gestion stocks et codes promo",
        "SEO technique de base inclus : meta tags, sitemap, robots.txt, schema.org",
        "Formulaires de contact fonctionnels avec validation et feedback visuel",
        "Intégration Google Maps, réseaux sociaux et systèmes de réservation",
        "SSL/HTTPS, sauvegardes automatiques et monitoring uptime 24/7",
        "Formation 30 minutes incluse pour la gestion autonome du contenu",
      ]}
    />
  );
}
