import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Smartphone, Globe, ShoppingCart, Zap, Shield, HeadphonesIcon, Award } from "lucide-react";
import DiagnosticQuiz from "@/components/sas/DiagnosticQuiz";
import ProcessTimeline from "@/components/sas/ProcessTimeline";
import BeforeAfter from "@/components/sas/BeforeAfter";
import ServicePricing from "@/components/sas/ServicePricing";
import UpsellSection from "@/components/sas/UpsellSection";
import WhyUsSection from "@/components/sas/WhyUsSection";
import ProofResults from "@/components/sas/ProofResults";

const GRADIENT = "from-blue-500 to-cyan-400";

export default function WebDesign() {
  const { t, price } = useLanguage();

  return (
    <>
      {/* HERO 3D IMMERSIF */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20">
        <div className={`glow-orb -right-32 top-20 h-[500px] w-[500px] animate-pulse bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.12, animationDuration: "6s" }} />
        <div className={`glow-orb -left-40 bottom-0 h-96 w-96 bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.08, animationDelay: "3s" }} />
        {/* Parallax floating elements */}
        <div className="parallax-layer depth-blur-far">
          <div className="absolute right-[15%] top-[30%] h-20 w-20 rounded-2xl border border-primary/10 bg-primary/5" />
          <div className="absolute left-[10%] top-[60%] h-16 w-16 rounded-full border border-accent/10 bg-accent/5" />
        </div>
        <div className="parallax-layer depth-blur-mid">
          <div className="absolute right-[25%] top-[55%] h-12 w-12 rounded-xl border border-primary/20 bg-primary/10" />
        </div>

        <div className="container-custom relative z-10 px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} shadow-xl`}>
              <Code className="h-8 w-8 text-foreground" />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {t("services.webDesign.tagline")}
            </p>
            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl lg:text-7xl">
              {t("services.webDesign.name")}
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("services.webDesign.description")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary-glow gap-2">{t("hero.cta")} <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/pricing" className="btn-ghost-glow">{t("nav.pricing")}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIAGNOSTIC QUIZ */}
      <DiagnosticQuiz
        gradient={GRADIENT}
        steps={[
          { question: "Quel type de site recherchez-vous ?", options: [
            { icon: "🏪", label: "Site vitrine" }, { icon: "🛒", label: "E-commerce" },
            { icon: "📝", label: "Blog / Média" }, { icon: "🏢", label: "Site corporate" }
          ]},
          { question: "Combien de pages estimez-vous ?", options: [
            { icon: "📄", label: "1-4 pages" }, { icon: "📑", label: "5-10 pages" },
            { icon: "📚", label: "10-20 pages" }, { icon: "🗃️", label: "20+ pages" }
          ]},
          { question: "Quel est votre objectif principal ?", options: [
            { icon: "👁️", label: "Visibilité" }, { icon: "💰", label: "Ventes en ligne" },
            { icon: "📞", label: "Générer des leads" }, { icon: "🎨", label: "Image de marque" }
          ]},
        ]}
        resultTitle="Pack Performance recommandé"
        resultDescription="D'après vos réponses, le Pack Performance à 799€ est idéal pour votre projet. Site 5-7 pages avec blog SEO intégré."
        resultCta="Recevoir un devis personnalisé"
      />

      {/* BEFORE / AFTER */}
      <BeforeAfter
        gradient={GRADIENT}
        title="La transformation digitale en action"
        beforeTitle="Avant XRAGENCY"
        afterTitle="Après 30 jours"
        beforeItems={[
          "Site obsolète ou inexistant",
          "Non responsive (50% du trafic perdu)",
          "Temps de chargement > 5 secondes",
          "0 formulaire de contact fonctionnel",
          "Aucune optimisation SEO",
          "Image de marque non professionnelle",
        ]}
        afterItems={[
          "Site premium, design sur-mesure",
          "100% responsive (mobile-first)",
          "Google PageSpeed > 90/100",
          "Formulaires avec validation et feedback",
          "SEO technique complet (meta, sitemap, schema.org)",
          "Image professionnelle qui inspire confiance",
        ]}
      />

      {/* PROCESS TIMELINE */}
      <ProcessTimeline
        gradient={GRADIENT}
        title="Notre processus en 6 étapes"
        subtitle="De la première idée à la mise en ligne, chaque étape est pensée pour la performance."
        steps={[
          { number: 1, icon: "📋", title: "Brief & Audit", description: "Analyse de votre secteur, concurrence, cibles. Questionnaire détaillé pour capturer votre vision.", duration: "J+0 à J+1" },
          { number: 2, icon: "🎨", title: "Maquettes UI/UX", description: "2 propositions de design. Wireframes + maquettes haute-fidélité. Validation client avant développement.", duration: "J+2 à J+4" },
          { number: 3, icon: "⚡", title: "Développement", description: "Intégration pixel-perfect. Code optimisé, responsive mobile-first, animations fluides.", duration: "J+5 à J+8" },
          { number: 4, icon: "📝", title: "Contenu & SEO", description: "Rédaction ou intégration de votre contenu. Optimisation meta tags, images, structure sémantique.", duration: "J+7 à J+9" },
          { number: 5, icon: "🧪", title: "Tests & QA", description: "Tests cross-browser, responsive, performance. Google PageSpeed > 90 garanti. Corrections illimitées.", duration: "J+9 à J+10" },
          { number: 6, icon: "🚀", title: "Lancement & Formation", description: "Mise en ligne, configuration DNS, SSL. Formation 30 min incluse pour gérer votre contenu.", duration: "J+10 à J+12" },
        ]}
      />

      {/* WHY US */}
      <WhyUsSection
        gradient={GRADIENT}
        title="Pourquoi nous confier votre site"
        subtitle="Ce qui rend nos sites web incomparables sur le marché."
        items={[
          { icon: <Smartphone className="h-6 w-6 text-foreground" />, title: "Mobile-First", description: "320px à 1920px, chaque breakpoint est optimisé. 60% du trafic est mobile." },
          { icon: <Zap className="h-6 w-6 text-foreground" />, title: "Performance > 90", description: "Google PageSpeed Score garanti. Chaque milliseconde compte pour le SEO et la conversion." },
          { icon: <Shield className="h-6 w-6 text-foreground" />, title: "Sécurité SSL/HTTPS", description: "Certificat SSL, sauvegardes automatiques, monitoring 24/7. Votre site est protégé." },
          { icon: <HeadphonesIcon className="h-6 w-6 text-foreground" />, title: "Support Réactif", description: "Réponse sous 24h. Équipes sur 4 fuseaux horaires pour une disponibilité maximale." },
        ]}
      />

      {/* PROOF RESULTS */}
      <ProofResults
        gradient={GRADIENT}
        title="Résultats concrets de nos clients"
        subtitle="Des chiffres vérifiables qui démontrent notre impact."
        stats={[
          { value: 347, suffix: "+", label: "Sites livrés" },
          { value: 95, suffix: "%", label: "Taux satisfaction" },
          { value: 92, suffix: "/100", label: "PageSpeed moyen" },
          { value: 3, suffix: "j", label: "Délai moyen livraison" },
        ]}
      />

      {/* PRICING */}
      <ServicePricing
        gradient={GRADIENT}
        title="Choisissez votre formule"
        subtitle="3 packs adaptés à votre besoin. Investissement unique, pas d'abonnement caché."
        tiers={[
          {
            name: "Essentiel",
            price: 499,
            features: [
              { text: "4 pages (Accueil, Services, Galerie, Contact)", included: true },
              { text: "Design responsive mobile-first", included: true },
              { text: "Formulaire de contact fonctionnel", included: true },
              { text: "Google Maps intégré", included: true },
              { text: "SEO technique de base", included: true },
              { text: "Blog intégré", included: false },
              { text: "E-commerce", included: false },
              { text: "Espace client", included: false },
            ],
          },
          {
            name: "Performance",
            price: 799,
            popular: true,
            features: [
              { text: "5-7 pages complètes", included: true },
              { text: "Blog avec 3 articles SEO rédigés", included: true },
              { text: "CMS avancé (WordPress/Webflow)", included: true },
              { text: "Formulaires multiples", included: true },
              { text: "Intégration newsletter", included: true },
              { text: "SEO avancé (schema.org, breadcrumbs)", included: true },
              { text: "E-commerce", included: false },
              { text: "Espace client", included: false },
            ],
          },
          {
            name: "Expérience",
            price: 1099,
            features: [
              { text: "Pages illimitées (jusqu'à 15)", included: true },
              { text: "E-commerce complet (Stripe, PayPal)", included: true },
              { text: "Réservations en ligne", included: true },
              { text: "Espace client personnalisé", included: true },
              { text: "Connexions API (CRM, réseaux sociaux)", included: true },
              { text: "Analytics avancé (GA4, Hotjar)", included: true },
              { text: "A/B testing", included: true },
              { text: "Support prioritaire 7j/7", included: true },
            ],
          },
        ]}
      />

      {/* UPSELLS */}
      <UpsellSection
        gradient={GRADIENT}
        title="Maximisez l'impact de votre site"
        subtitle="Ajoutez des services complémentaires pour un ROI décuplé."
        items={[
          { icon: "🔍", title: "SEO Armada", description: "Attirez du trafic organique qualifié. 8 à 50+ articles SEO par mois.", price: 199, period: "mois", link: "/services/seo" },
          { icon: "🗺️", title: "Google Maps Top 3", description: "Dominez les recherches locales 'près de chez moi'. +60% de visibilité.", price: 999, period: "an", link: "/services/google-maps" },
          { icon: "🤖", title: "IA & Automatisation", description: "Chatbot 24/7 pour qualifier vos leads. Économie : 2 200€/mois vs humain.", price: 399, link: "/services/ai-automation" },
        ]}
      />

      {/* CTA FINAL CINÉMATIQUE */}
      <section className="section-padding relative overflow-hidden">
        <div className={`glow-orb left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.1 }} />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">{t("cta.subtitle")}</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/contact" className="btn-primary-glow gap-2 text-lg">{t("cta.button")} <ArrowRight className="h-5 w-5" /></Link>
              <Link to="/pricing" className="btn-ghost-glow">{t("cta.buttonSecondary")}</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
