import ServicePageTemplate from "@/components/common/ServicePageTemplate";
import { Search } from "lucide-react";

export default function SEO() {
  return (
    <ServicePageTemplate
      serviceKey="seo"
      icon={<Search className="h-8 w-8 text-foreground" />}
      gradient="from-emerald-500 to-teal-400"
      features={[
        "Stratégie IA + Humain : l'IA génère du contenu massif, l'expert humain révise et optimise",
        "8 à 50+ articles SEO par mois selon la formule, optimisés pour Google et l'IA Search",
        "Netlinking premium : 5 à 15 backlinks qualité par mois (DA >30)",
        "Optimisation technique avancée : Core Web Vitals, vitesse, architecture silo",
        "Stratégie cluster et cocons sémantiques pour une autorité de domaine maximale",
        "Reporting détaillé : positions, trafic, concurrence, opportunités identifiées",
        "ROI moyen +340% en 12 mois avec trafic organique durable sans publicité",
        "Support prioritaire et appels stratégiques mensuels ou bi-mensuels",
      ]}
    />
  );
}
