import ServicePageTemplate from "@/components/common/ServicePageTemplate";
import { Palette } from "lucide-react";

export default function Branding() {
  return (
    <ServicePageTemplate
      serviceKey="branding"
      icon={<Palette className="h-8 w-8 text-foreground" />}
      gradient="from-pink-500 to-rose-400"
      features={[
        "3 propositions de logo originales avec 2 révisions incluses",
        "Charte graphique complète : palette couleurs, typographies, guidelines",
        "Fichiers haute résolution : PNG, SVG, PDF en versions couleur, N&B, monochrome",
        "Document de marque PDF 10-15 pages avec règles d'usage et zones de protection",
        "Questionnaire créatif détaillé pour capturer l'essence de votre marque",
        "Identité visuelle mémorable adaptée à votre secteur et votre positionnement",
        "Kit réseaux sociaux : templates Instagram, Facebook, LinkedIn",
        "Livraison en 5-12 jours ouvrés selon la formule choisie",
      ]}
    />
  );
}
