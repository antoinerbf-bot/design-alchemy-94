import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Brain, Cpu, Workflow, Clock, TrendingDown, Sparkles, Zap } from "lucide-react";
import DiagnosticQuiz from "@/components/sas/DiagnosticQuiz";
import ProcessTimeline from "@/components/sas/ProcessTimeline";
import BeforeAfter from "@/components/sas/BeforeAfter";
import ServicePricing from "@/components/sas/ServicePricing";
import UpsellSection from "@/components/sas/UpsellSection";
import WhyUsSection from "@/components/sas/WhyUsSection";
import ProofResults from "@/components/sas/ProofResults";

const GRADIENT = "from-violet-500 to-purple-400";

export default function AIAutomation() {
  const { t } = useLanguage();

  return (
    <>
      {/* HERO — AI CONTROL ROOM VIBE */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20">
        <div className={`glow-orb -right-40 top-10 h-[600px] w-[600px] bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.12 }} />
        <div className={`glow-orb -left-32 bottom-10 h-80 w-80 bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.06 }} />
        {/* AI data streams */}
        <div className="parallax-layer depth-blur-far">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -200], opacity: [0.3, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
              className="absolute rounded-full bg-violet-500/20"
              style={{ left: `${15 + i * 18}%`, top: "70%", width: 4 + i * 2, height: 4 + i * 2 }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10 px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} shadow-xl`}>
              <Bot className="h-8 w-8 text-foreground" />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t("services.ai.tagline")}</p>
            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl lg:text-7xl">{t("services.ai.name")}</h1>
            <p className="mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("services.ai.description")}</p>
            <p className="mb-8 max-w-2xl text-base text-muted-foreground/80">
              Un chatbot IA coûte 399€/mois. Un employé dédié au support : 2 600€/mois charges comprises. L'IA travaille 24/7 sans pause, sans congé, sans erreur humaine. ROI immédiat.
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
          { question: "Quel problème voulez-vous résoudre ?", options: [
            { icon: "💬", label: "Support client 24/7" }, { icon: "📧", label: "Emails & relances auto" },
            { icon: "📊", label: "Reporting automatisé" }, { icon: "🎯", label: "Qualification de leads" }
          ]},
          { question: "Combien de demandes traitez-vous par jour ?", options: [
            { icon: "📩", label: "< 10" }, { icon: "📬", label: "10-50" },
            { icon: "📮", label: "50-200" }, { icon: "🏢", label: "200+" }
          ]},
          { question: "Utilisez-vous déjà un CRM ?", options: [
            { icon: "❌", label: "Non, aucun" }, { icon: "📋", label: "Excel / Sheets" },
            { icon: "🔧", label: "HubSpot / Pipedrive" }, { icon: "⚙️", label: "Salesforce / Custom" }
          ]},
        ]}
        resultTitle="Pack Business recommandé"
        resultDescription="Chatbot IA + intégration CRM + automatisation emails. Économie estimée : 2 200€/mois par rapport à un employé dédié."
        resultCta="Planifier une démo IA"
      />

      {/* BEFORE / AFTER */}
      <BeforeAfter
        gradient={GRADIENT}
        title="Avant et après l'automatisation IA"
        beforeTitle="Sans IA"
        afterTitle="Avec XRAGENCY IA"
        beforeItems={[
          "Réponse client en 4-24h (heures ouvrées seulement)",
          "30% des leads perdus faute de relance",
          "Reporting manuel : 8h/semaine perdues",
          "Coût support : 2 600€/mois (1 employé)",
          "Erreurs humaines dans les process répétitifs",
          "Aucune analyse prédictive",
        ]}
        afterItems={[
          "Réponse instantanée 24/7/365 (< 3 secondes)",
          "100% des leads relancés automatiquement",
          "Reporting auto en temps réel (0h de travail)",
          "Coût IA : 399€/mois (économie 85%)",
          "0 erreur sur les process automatisés",
          "Analyse prédictive des tendances clients",
        ]}
      />

      {/* PROCESS */}
      <ProcessTimeline
        gradient={GRADIENT}
        title="Déploiement en 6 étapes"
        subtitle="De l'audit à l'IA opérationnelle, un processus éprouvé et transparent."
        steps={[
          { number: 1, icon: "🔬", title: "Audit des Process", description: "Cartographie de vos workflows actuels. Identification des tâches automatisables et du ROI potentiel.", duration: "J+0 à J+3" },
          { number: 2, icon: "🏗️", title: "Architecture IA", description: "Design du système d'automatisation. Choix des modèles IA, points d'intégration, flux de données.", duration: "J+3 à J+5" },
          { number: 3, icon: "🤖", title: "Développement Chatbot", description: "Création du chatbot IA formé sur vos données. Scénarios de conversation, FAQ, qualification de leads.", duration: "J+5 à J+10" },
          { number: 4, icon: "🔗", title: "Intégration CRM", description: "Connexion avec votre CRM (HubSpot, Salesforce, Pipedrive). Synchronisation bidirectionnelle des données.", duration: "J+8 à J+12" },
          { number: 5, icon: "🧪", title: "Tests & Formation", description: "Phase de test avec votre équipe. Formation à l'utilisation du dashboard et des outils IA.", duration: "J+12 à J+14" },
          { number: 6, icon: "🚀", title: "Lancement & Monitoring", description: "Mise en production. Dashboard temps réel. Optimisation continue des performances IA.", duration: "J+14+" },
        ]}
      />

      {/* WHY US */}
      <WhyUsSection
        gradient={GRADIENT}
        title="Pourquoi notre IA est supérieure"
        subtitle="Pas de chatbot générique. Des solutions IA sur-mesure pour votre business."
        items={[
          { icon: <Brain className="h-6 w-6 text-foreground" />, title: "IA Sur-Mesure", description: "Formée sur VOS données, votre secteur, votre vocabulaire. Pas un bot générique." },
          { icon: <Clock className="h-6 w-6 text-foreground" />, title: "24/7 Sans Pause", description: "L'IA ne dort jamais. Support client et qualification de leads même à 3h du matin." },
          { icon: <TrendingDown className="h-6 w-6 text-foreground" />, title: "-85% Coûts", description: "2 200€/mois d'économie moyenne par rapport à un employé dédié au support." },
          { icon: <Cpu className="h-6 w-6 text-foreground" />, title: "Évolutif", description: "10 ou 10 000 demandes/jour : l'IA scale automatiquement sans coût supplémentaire." },
        ]}
      />

      {/* PROOF */}
      <ProofResults
        gradient={GRADIENT}
        title="Performance IA mesurée"
        subtitle="Résultats moyens sur nos déploiements IA actifs."
        stats={[
          { value: 85, suffix: "%", label: "Réduction coûts support" },
          { value: 3, suffix: "s", label: "Temps de réponse moyen" },
          { value: 2200, suffix: "€", label: "Économie mensuelle moyenne" },
          { value: 97, suffix: "%", label: "Précision des réponses IA" },
        ]}
      />

      {/* PRICING */}
      <ServicePricing
        gradient={GRADIENT}
        title="Formules IA & Automatisation"
        subtitle="Déployez l'IA dans votre business. Résultats mesurables dès le 1er mois."
        tiers={[
          {
            name: "Starter",
            price: 399,
            features: [
              { text: "Chatbot IA sur votre site web", included: true },
              { text: "FAQ automatisée (50 scénarios)", included: true },
              { text: "Qualification de leads basique", included: true },
              { text: "Dashboard statistiques", included: true },
              { text: "Intégration CRM", included: false },
              { text: "Automatisation emails", included: false },
            ],
          },
          {
            name: "Business",
            price: 899,
            popular: true,
            features: [
              { text: "Chatbot IA avancé (200+ scénarios)", included: true },
              { text: "Intégration CRM (HubSpot/Pipedrive)", included: true },
              { text: "Automatisation emails et relances", included: true },
              { text: "Reporting automatisé", included: true },
              { text: "Formation équipe (2h)", included: true },
              { text: "Analyse prédictive", included: false },
            ],
          },
          {
            name: "Enterprise",
            price: 1499,
            features: [
              { text: "IA sur-mesure formée sur vos données", included: true },
              { text: "Intégration multi-CRM / ERP", included: true },
              { text: "Automatisation complète des workflows", included: true },
              { text: "Analyse prédictive et scoring leads", included: true },
              { text: "API dédiée pour vos outils", included: true },
              { text: "Support prioritaire + account manager", included: true },
            ],
          },
        ]}
      />

      {/* UPSELLS */}
      <UpsellSection
        gradient={GRADIENT}
        title="L'IA + vos autres leviers"
        subtitle="Maximisez l'impact de l'IA en la combinant avec votre stratégie digitale."
        items={[
          { icon: "💻", title: "Site Web Optimisé", description: "Intégrez le chatbot sur un site web performant pour maximiser les conversions.", price: 499, link: "/services/web-design" },
          { icon: "🔍", title: "SEO + IA", description: "Générez du trafic SEO et laissez l'IA convertir vos visiteurs en leads qualifiés.", price: 199, period: "mois", link: "/services/seo" },
          { icon: "🗺️", title: "Google Maps", description: "Captez les recherches locales et qualifiez les leads avec votre chatbot IA.", price: 999, period: "an", link: "/services/google-maps" },
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
