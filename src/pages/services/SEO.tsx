import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, TrendingUp, Target, BarChart3, Zap, Globe, Award, Shield } from "lucide-react";
import DiagnosticQuiz from "@/components/sas/DiagnosticQuiz";
import ProcessTimeline from "@/components/sas/ProcessTimeline";
import BeforeAfter from "@/components/sas/BeforeAfter";
import ServicePricing from "@/components/sas/ServicePricing";
import UpsellSection from "@/components/sas/UpsellSection";
import WhyUsSection from "@/components/sas/WhyUsSection";
import ProofResults from "@/components/sas/ProofResults";

const GRADIENT = "from-emerald-500 to-teal-400";

export default function SEO() {
  const { t, price } = useLanguage();

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20">
        <div className={`glow-orb -right-40 top-10 h-[600px] w-[600px] bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.1, animationDuration: "8s" }} />
        <div className={`glow-orb -left-32 bottom-20 h-80 w-80 bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.06 }} />
        {/* Simulated search results floating */}
        <div className="parallax-layer depth-blur-far">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute right-[10%] top-[25%] glass-card w-64 p-4 opacity-30">
            <div className="mb-2 h-3 w-3/4 rounded bg-emerald-500/30" />
            <div className="mb-1 h-2 w-full rounded bg-muted/30" />
            <div className="h-2 w-2/3 rounded bg-muted/20" />
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute right-[15%] top-[50%] glass-card w-56 p-3 opacity-20">
            <div className="mb-2 h-3 w-2/3 rounded bg-primary/30" />
            <div className="h-2 w-full rounded bg-muted/20" />
          </motion.div>
        </div>

        <div className="container-custom relative z-10 px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} shadow-xl`}>
              <Search className="h-8 w-8 text-foreground" />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t("services.seo.tagline")}</p>
            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl lg:text-7xl">{t("services.seo.name")}</h1>
            <p className="mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("services.seo.description")}</p>
            <p className="mb-8 max-w-2xl text-base text-muted-foreground/80">
              70% des entreprises investissent dans Google Ads mais négligent le SEO. Résultat : dépendance totale à la publicité payante. Le SEO construit un actif durable, 10x plus rentable sur 3 ans.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary-glow gap-2">{t("hero.cta")} <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/pricing" className="btn-ghost-glow">{t("nav.audit")}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIAGNOSTIC */}
      <DiagnosticQuiz
        gradient={GRADIENT}
        steps={[
          { question: "Quel est votre secteur ?", options: [
            { icon: "🍴", label: "Restaurant / Hôtellerie" }, { icon: "🏪", label: "E-commerce" },
            { icon: "⚖️", label: "Services professionnels" }, { icon: "🏥", label: "Santé / Bien-être" }
          ]},
          { question: "Votre visibilité Google actuelle ?", options: [
            { icon: "🔴", label: "Invisible (page 5+)" }, { icon: "🟠", label: "Page 2-3" },
            { icon: "🟡", label: "Top 10 sur quelques mots" }, { icon: "🟢", label: "Déjà bien positionné" }
          ]},
          { question: "Votre budget mensuel SEO actuel ?", options: [
            { icon: "💸", label: "0€ (rien)" }, { icon: "💵", label: "< 200€/mois" },
            { icon: "💰", label: "200-500€/mois" }, { icon: "🏦", label: "> 500€/mois" }
          ]},
        ]}
        resultTitle="SEO Boost recommandé"
        resultDescription="20 articles SEO/mois + 5 backlinks qualité. ROI estimé +340% en 12 mois. Sans engagement."
        resultCta="Obtenir mon audit SEO gratuit"
      />

      {/* BEFORE / AFTER */}
      <BeforeAfter
        gradient={GRADIENT}
        title="Résultats mesurables après 6 mois"
        beforeTitle="Avant XRAGENCY"
        afterTitle="Après 6 mois SEO"
        beforeItems={[
          "Site invisible sur Google (page 5+)",
          "50 visiteurs organiques/mois",
          "0 demande de devis via Google",
          "Budget Google Ads : 800€/mois",
          "Dépendance totale à la publicité payante",
          "ROI négatif sur le digital",
        ]}
        afterItems={[
          "Top 3 Google sur 15 mots-clés stratégiques",
          "2 400 visiteurs organiques/mois (+4 700%)",
          "45 demandes de devis qualifiées/mois",
          "Budget Ads réduit à 200€/mois (-75%)",
          "Trafic organique durable et gratuit",
          "ROI : +420% vérifié et documenté",
        ]}
      />

      {/* PROCESS */}
      <ProcessTimeline
        gradient={GRADIENT}
        title="Notre méthodologie SEO en 7 étapes"
        subtitle="Une stratégie IA + humain unique sur le marché. L'IA génère massivement, l'expert révise et optimise."
        steps={[
          { number: 1, icon: "🔬", title: "Audit Technique Complet", description: "Analyse de 200+ facteurs : vitesse, architecture, crawl, Core Web Vitals. Rapport 40 pages livré.", duration: "J+0 à J+3" },
          { number: 2, icon: "🎯", title: "Recherche de Mots-Clés", description: "100+ mots-clés analysés. Sélection des 30 plus stratégiques selon volume, difficulté et intention.", duration: "J+3 à J+5" },
          { number: 3, icon: "🏗️", title: "Architecture Silo", description: "Structuration en cocons sémantiques. Maillage interne optimisé pour l'autorité thématique.", duration: "J+5 à J+7" },
          { number: 4, icon: "✍️", title: "Production de Contenu", description: "8 à 50+ articles/mois selon formule. IA génère le premier jet, expert humain révise et optimise.", duration: "M+1 continu" },
          { number: 5, icon: "🔗", title: "Netlinking Premium", description: "5 à 15 backlinks qualité/mois (DA > 30). Guest posting, digital PR, annuaires de qualité.", duration: "M+1 continu" },
          { number: 6, icon: "📊", title: "Monitoring & Ajustements", description: "Suivi quotidien des positions. Rapport mensuel détaillé : trafic, positions, concurrence, opportunités.", duration: "Continu" },
          { number: 7, icon: "🚀", title: "Scaling & Optimisation", description: "Analyse des résultats, ajustement stratégie, expansion vers nouveaux clusters sémantiques.", duration: "M+3 continu" },
        ]}
      />

      {/* WHY US */}
      <WhyUsSection
        gradient={GRADIENT}
        title="Pourquoi notre SEO est différent"
        subtitle="La combinaison IA + expertise humaine qui change la donne."
        items={[
          { icon: <TrendingUp className="h-6 w-6 text-foreground" />, title: "Volume x10", description: "L'IA produit 10x plus de contenu qu'une agence classique. L'humain garantit la qualité." },
          { icon: <Target className="h-6 w-6 text-foreground" />, title: "ROI Garanti", description: "Engagement sur résultats mesurables. Progression documentée mois par mois." },
          { icon: <BarChart3 className="h-6 w-6 text-foreground" />, title: "Data-Driven", description: "Décisions basées sur la data. Chaque action est mesurée et optimisée en continu." },
          { icon: <Globe className="h-6 w-6 text-foreground" />, title: "IA Search Ready", description: "Contenu optimisé pour Google ET les IA (ChatGPT, Gemini, Perplexity). L'avenir du search." },
        ]}
      />

      {/* PROOF */}
      <ProofResults
        gradient={GRADIENT}
        title="Résultats SEO vérifiables"
        subtitle="Moyennes calculées sur 200+ campagnes SEO actives."
        stats={[
          { value: 340, suffix: "%", label: "ROI moyen à 12 mois" },
          { value: 2400, suffix: "+", label: "Mots-clés Top 10" },
          { value: 15, suffix: "M", label: "Visiteurs générés/an" },
          { value: 98, suffix: "%", label: "Clients renouvelés" },
        ]}
      />

      {/* PRICING */}
      <ServicePricing
        gradient={GRADIENT}
        title="Formules SEO mensuelles"
        subtitle="Sans engagement. Résultats mesurables dès le 3ème mois."
        tiers={[
          {
            name: "Local",
            price: 199,
            period: "mois",
            features: [
              { text: "8 articles SEO/mois (800-1000 mots)", included: true },
              { text: "Mots-clés locaux ciblés", included: true },
              { text: "Optimisation Google My Business", included: true },
              { text: "Rapport mensuel", included: true },
              { text: "Netlinking", included: false },
              { text: "Support prioritaire", included: false },
            ],
          },
          {
            name: "Boost",
            price: 349,
            period: "mois",
            popular: true,
            features: [
              { text: "20 articles SEO/mois (800-1200 mots)", included: true },
              { text: "Mots-clés nationaux + locaux", included: true },
              { text: "Optimisation technique avancée", included: true },
              { text: "Netlinking (5 backlinks qualité/mois)", included: true },
              { text: "Call stratégique mensuel 30 min", included: true },
              { text: "Support prioritaire 7j/7", included: false },
            ],
          },
          {
            name: "Pro",
            price: 549,
            period: "mois",
            features: [
              { text: "50+ articles SEO/mois (stratégie d'autorité)", included: true },
              { text: "Stratégie internationale multilingue", included: true },
              { text: "Netlinking premium (15 backlinks/mois, DA>30)", included: true },
              { text: "Stratégie cluster et cocons sémantiques", included: true },
              { text: "Rapport hebdomadaire + call bi-mensuel", included: true },
              { text: "Support prioritaire 7j/7", included: true },
            ],
          },
        ]}
      />

      {/* UPSELLS */}
      <UpsellSection
        gradient={GRADIENT}
        title="Combinez pour un impact maximum"
        subtitle="Le SEO est encore plus puissant quand il est couplé avec d'autres leviers."
        items={[
          { icon: "🗺️", title: "Google Maps Top 3", description: "+60% de visibilité locale. Le complément parfait du SEO pour les commerces physiques.", price: 999, period: "an", link: "/services/google-maps" },
          { icon: "💻", title: "Site Web Premium", description: "Un site performant est la base d'un bon SEO. PageSpeed > 90 garanti.", price: 499, link: "/services/web-design" },
          { icon: "🤖", title: "IA & Chatbot", description: "Convertissez votre trafic SEO en leads qualifiés avec un chatbot IA 24/7.", price: 399, link: "/services/ai-automation" },
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
