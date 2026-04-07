import ServicePageTemplate from "@/components/common/ServicePageTemplate";
import { Bot } from "lucide-react";

export default function AIAutomation() {
  return (
    <ServicePageTemplate
      serviceKey="ai"
      icon={<Bot className="h-8 w-8 text-foreground" />}
      gradient="from-violet-500 to-purple-400"
      features={[
        "Chatbot IA 24/7 : qualification automatique des leads et support client instantané",
        "Automatisation des processus métier : emails, relances, reporting, facturation",
        "Assistants IA sur mesure formés sur vos données et votre secteur d'activité",
        "Intégration CRM intelligente : HubSpot, Salesforce, Pipedrive avec enrichissement IA",
        "Analyse prédictive : anticipez les tendances et comportements clients",
        "Économie moyenne de 2 200€/mois par rapport à un employé dédié",
        "Tableau de bord temps réel avec métriques de performance et ROI",
        "Formation équipe incluse pour l'utilisation optimale des outils IA déployés",
      ]}
    />
  );
}
