import ServicePageTemplate from "@/components/common/ServicePageTemplate";
import { MapPin } from "lucide-react";

export default function GoogleMaps() {
  return (
    <ServicePageTemplate
      serviceKey="maps"
      icon={<MapPin className="h-8 w-8 text-foreground" />}
      gradient="from-amber-500 to-orange-400"
      features={[
        "Optimisation complète de votre fiche Google Business Profile : catégories, photos HD, descriptions",
        "Stratégie d'acquisition d'avis 5 étoiles éthique et conforme aux guidelines Google",
        "Inscription dans 50+ annuaires locaux avec NAP (Nom, Adresse, Téléphone) cohérent",
        "Contenu géo-localisé : articles SEO avec mots-clés locaux pointant vers votre fiche",
        "Monitoring quotidien des positions et réponses aux avis clients incluses",
        "Garantie Top 5 ou remboursement partiel après 6 mois (hors secteurs impossibles)",
        "ROI moyen +525% calculé sur les appels et visites générés via Google Maps",
        "Sans engagement : résiliable à tout moment après les 6 premiers mois",
      ]}
    />
  );
}
