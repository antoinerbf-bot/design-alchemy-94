import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Eye, Layers, Sparkles, Heart, Zap, Shield } from "lucide-react";
import DiagnosticQuiz from "@/components/sas/DiagnosticQuiz";
import ProcessTimeline from "@/components/sas/ProcessTimeline";
import BeforeAfter from "@/components/sas/BeforeAfter";
import ServicePricing from "@/components/sas/ServicePricing";
import UpsellSection from "@/components/sas/UpsellSection";
import WhyUsSection from "@/components/sas/WhyUsSection";
import ProofResults from "@/components/sas/ProofResults";

const GRADIENT = "from-pink-500 to-rose-400";

export default function Branding() {
  const { t } = useLanguage();

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20">
        <div className={`glow-orb -right-40 top-10 h-[500px] w-[500px] bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.12 }} />
        <div className={`glow-orb -left-32 bottom-20 h-80 w-80 bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.06 }} />
        {/* Floating brand elements */}
        <div className="parallax-layer depth-blur-far">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute right-[12%] top-[35%] h-24 w-24 rounded-3xl border border-pink-500/10 bg-pink-500/5 opacity-40" />
          <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute left-[8%] top-[55%] h-16 w-16 rounded-full border border-rose-400/10 bg-rose-400/5 opacity-30" />
        </div>

        <div className="container-custom relative z-10 px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} shadow-xl`}>
              <Palette className="h-8 w-8 text-foreground" />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t("services.branding.tagline")}</p>
            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl lg:text-7xl">{t("services.branding.name")}</h1>
            <p className="mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("services.branding.description")}</p>
            <p className="mb-8 max-w-2xl text-base text-muted-foreground/80">
              Votre logo est la première impression que vous donnez. En 0.05 seconde, un client potentiel juge votre crédibilité sur votre identité visuelle. Investir dans un branding professionnel, c'est investir dans la confiance.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary-glow gap-2">{t("hero.cta")} <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/pricing" className="btn-ghost-glow">{t("nav.pricing")}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIAGNOSTIC */}
      <DiagnosticQuiz
        gradient={GRADIENT}
        steps={[
          { question: "Avez-vous déjà un logo ?", options: [
            { icon: "❌", label: "Non, aucun" }, { icon: "😐", label: "Oui, mais amateur" },
            { icon: "🔄", label: "Oui, mais obsolète" }, { icon: "✅", label: "Oui, professionnel" }
          ]},
          { question: "Quel style vous attire ?", options: [
            { icon: "⚡", label: "Minimaliste / Modern" }, { icon: "🎩", label: "Luxe / Élégant" },
            { icon: "🎨", label: "Créatif / Coloré" }, { icon: "🏛️", label: "Classique / Corporate" }
          ]},
          { question: "Quels supports avez-vous besoin ?", options: [
            { icon: "📱", label: "Digital uniquement" }, { icon: "🖨️", label: "Digital + Print" },
            { icon: "📦", label: "Packaging inclus" }, { icon: "🌐", label: "Identité complète" }
          ]},
        ]}
        resultTitle="Charte Graphique Complète recommandée"
        resultDescription="D'après vos besoins, la Charte Graphique Complète à 499€ vous donnera une identité visuelle cohérente sur tous vos supports."
        resultCta="Démarrer mon branding"
      />

      {/* BEFORE / AFTER */}
      <BeforeAfter
        gradient={GRADIENT}
        title="L'impact d'un branding professionnel"
        beforeTitle="Image amateur"
        afterTitle="Image XRAGENCY"
        beforeItems={[
          "Logo fait sur Canva ou par un ami",
          "Couleurs choisies au hasard, incohérentes",
          "Typographies différentes partout",
          "Carte de visite qui ne fait pas professionnel",
          "Réseaux sociaux visuellement désordonnés",
          "Les clients ne vous prennent pas au sérieux",
        ]}
        afterItems={[
          "Logo professionnel mémorable et unique",
          "Palette couleurs cohérente et mémorisable",
          "Typographies assorties (titre, texte, web)",
          "Supports print premium (cartes, flyers)",
          "Templates réseaux sociaux harmonisés",
          "Crédibilité instantanée dès le premier regard",
        ]}
      />

      {/* PROCESS */}
      <ProcessTimeline
        gradient={GRADIENT}
        title="Notre processus créatif en 5 étapes"
        subtitle="De l'inspiration à la livraison, chaque étape est pensée pour capturer l'essence de votre marque."
        steps={[
          { number: 1, icon: "💬", title: "Brief Créatif", description: "Questionnaire approfondi : valeurs, cible, concurrence, style, inspirations. Appel 30 min pour comprendre votre vision.", duration: "J+0" },
          { number: 2, icon: "🔍", title: "Recherche & Moodboard", description: "Analyse du secteur, tendances visuelles, benchmark concurrence. Moodboard de direction artistique soumis.", duration: "J+1 à J+2" },
          { number: 3, icon: "🎨", title: "Propositions Créatives", description: "3 propositions de logo uniques avec justification de chaque choix. Présentation en contexte (mockup).", duration: "J+3 à J+5" },
          { number: 4, icon: "✏️", title: "Révisions & Affinement", description: "2 tours de révisions inclus. Ajustements couleurs, proportions, typographies jusqu'à votre satisfaction.", duration: "J+5 à J+7" },
          { number: 5, icon: "📦", title: "Livraison Finale", description: "Fichiers HD (PNG, SVG, PDF). Versions couleur, N&B, monochrome. Charte graphique PDF si applicable.", duration: "J+7 à J+12" },
        ]}
      />

      {/* WHY US */}
      <WhyUsSection
        gradient={GRADIENT}
        title="Pourquoi notre branding est différent"
        subtitle="Pas de templates. Pas de logos génériques. Chaque identité est unique."
        items={[
          { icon: <Eye className="h-6 w-6 text-foreground" />, title: "100% Original", description: "Aucun template. Chaque logo est créé from scratch spécifiquement pour votre marque." },
          { icon: <Layers className="h-6 w-6 text-foreground" />, title: "Multi-Format", description: "PNG, SVG, PDF haute résolution. Versions pour web, print, réseaux sociaux, favicon." },
          { icon: <Sparkles className="h-6 w-6 text-foreground" />, title: "Direction Artistique", description: "Un directeur artistique senior supervise chaque projet. Pas de juniors sans expérience." },
          { icon: <Heart className="h-6 w-6 text-foreground" />, title: "Satisfaction Garantie", description: "2 révisions incluses. Nous ne livrons pas tant que vous n'êtes pas 100% satisfait." },
        ]}
      />

      {/* PROOF */}
      <ProofResults
        gradient={GRADIENT}
        title="L'impact en chiffres"
        subtitle="Le branding professionnel est un investissement, pas une dépense."
        stats={[
          { value: 420, suffix: "+", label: "Identités créées" },
          { value: 100, suffix: "%", label: "Clients satisfaits" },
          { value: 7, suffix: "j", label: "Délai moyen" },
          { value: 80, suffix: "%", label: "Augmentation crédibilité perçue" },
        ]}
      />

      {/* PRICING */}
      <ServicePricing
        gradient={GRADIENT}
        title="Formules Branding"
        subtitle="Investissement unique. Fichiers sources inclus. Propriété intellectuelle transférée."
        tiers={[
          {
            name: "Logo Solo",
            price: 199,
            features: [
              { text: "3 propositions de logo originales", included: true },
              { text: "2 révisions incluses", included: true },
              { text: "Fichiers PNG, SVG, PDF (haute résolution)", included: true },
              { text: "Versions couleur, N&B, monochrome", included: true },
              { text: "Charte graphique PDF", included: false },
              { text: "Kit réseaux sociaux", included: false },
            ],
          },
          {
            name: "Charte Graphique",
            price: 499,
            popular: true,
            features: [
              { text: "Logo complet (3 propositions + 2 révisions)", included: true },
              { text: "Palette couleurs (primaires + secondaires)", included: true },
              { text: "Typographies (titres + texte + web)", included: true },
              { text: "Guidelines (espacements, usages interdits)", included: true },
              { text: "Document PDF 10-15 pages", included: true },
              { text: "Kit réseaux sociaux", included: false },
            ],
          },
          {
            name: "Identité Complète",
            price: 999,
            features: [
              { text: "Charte graphique complète", included: true },
              { text: "Kit réseaux sociaux (Instagram, LinkedIn, Facebook)", included: true },
              { text: "Templates email signature", included: true },
              { text: "Carte de visite design", included: true },
              { text: "Papier à en-tête et documents type", included: true },
              { text: "Brand book 25+ pages", included: true },
            ],
          },
        ]}
      />

      {/* UPSELLS */}
      <UpsellSection
        gradient={GRADIENT}
        title="Prolongez votre identité"
        subtitle="Votre branding prend vie sur tous vos supports digitaux."
        items={[
          { icon: "💻", title: "Site Web Assorti", description: "Un site web qui reflète parfaitement votre nouvelle identité. Design cohérent garanti.", price: 499, link: "/services/web-design" },
          { icon: "📱", title: "Community Management", description: "Déployez votre branding sur les réseaux sociaux avec une stratégie cohérente.", price: 299, period: "mois", link: "/contact" },
          { icon: "🔍", title: "SEO + Branding", description: "Associez visibilité Google et image de marque forte pour dominer votre marché.", price: 199, period: "mois", link: "/services/seo" },
        ]}
      />

      {/* CTA FINAL */}
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
