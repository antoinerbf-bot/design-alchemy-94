import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

type Tab = "web" | "seo" | "branding" | "ai" | "maps";

interface Plan {
  name: string;
  price: number;
  period?: string;
  popular?: boolean;
  features: Array<{ text: string; included: boolean }>;
}

const pricingData: Record<Tab, { label: string; plans: Plan[] }> = {
  web: {
    label: "Création Sites",
    plans: [
      {
        name: "Essentiel",
        price: 499,
        features: [
          { text: "4 pages professionnelles", included: true },
          { text: "Design responsive mobile-first", included: true },
          { text: "Google Maps intégré", included: true },
          { text: "Formulaire de contact", included: true },
          { text: "SEO technique de base", included: true },
          { text: "Blog", included: false },
          { text: "E-commerce", included: false },
        ],
      },
      {
        name: "Performance",
        price: 799,
        popular: true,
        features: [
          { text: "5-7 pages optimisées", included: true },
          { text: "Blog complet + 3 articles SEO", included: true },
          { text: "CMS avancé", included: true },
          { text: "Newsletter (Mailchimp/Brevo)", included: true },
          { text: "SEO avancé (schema.org)", included: true },
          { text: "Formulaires multiples", included: true },
          { text: "E-commerce", included: false },
        ],
      },
      {
        name: "Expérience",
        price: 1099,
        features: [
          { text: "Architecture sur-mesure (15+ pages)", included: true },
          { text: "E-commerce complet (Stripe, PayPal)", included: true },
          { text: "Réservations en ligne", included: true },
          { text: "Espace client personnalisé", included: true },
          { text: "API réseaux sociaux + CRM", included: true },
          { text: "Analytics avancé (GA4, Hotjar)", included: true },
          { text: "Support prioritaire", included: true },
        ],
      },
    ],
  },
  seo: {
    label: "SEO Armada",
    plans: [
      {
        name: "Local",
        price: 199,
        period: "/mois",
        features: [
          { text: "8 articles SEO/mois", included: true },
          { text: "Mots-clés locaux", included: true },
          { text: "Google My Business", included: true },
          { text: "Rapport mensuel", included: true },
          { text: "Netlinking", included: false },
        ],
      },
      {
        name: "Boost",
        price: 349,
        period: "/mois",
        popular: true,
        features: [
          { text: "20 articles SEO/mois", included: true },
          { text: "Mots-clés nationaux + locaux", included: true },
          { text: "Netlinking (5 backlinks/mois)", included: true },
          { text: "Rapport détaillé + call mensuel", included: true },
          { text: "Optimisation technique avancée", included: true },
        ],
      },
      {
        name: "Pro",
        price: 549,
        period: "/mois",
        features: [
          { text: "50+ articles SEO/mois", included: true },
          { text: "Stratégie internationale", included: true },
          { text: "Netlinking premium (15/mois, DA>30)", included: true },
          { text: "Support 7j/7 + rapport hebdo", included: true },
          { text: "Clusters sémantiques", included: true },
        ],
      },
    ],
  },
  branding: {
    label: "Branding",
    plans: [
      {
        name: "Logo Solo",
        price: 199,
        features: [
          { text: "3 propositions de logo", included: true },
          { text: "2 révisions incluses", included: true },
          { text: "Fichiers PNG, SVG, PDF", included: true },
          { text: "Charte graphique", included: false },
        ],
      },
      {
        name: "Charte Graphique",
        price: 499,
        popular: true,
        features: [
          { text: "Logo complet (3 propositions)", included: true },
          { text: "Palette couleurs + typographies", included: true },
          { text: "Guidelines 10-15 pages PDF", included: true },
          { text: "Kit réseaux sociaux", included: true },
        ],
      },
      {
        name: "Identité Complète",
        price: 999,
        features: [
          { text: "Tout Charte Graphique +", included: true },
          { text: "Papeterie complète", included: true },
          { text: "Templates marketing", included: true },
          { text: "Brand book 30+ pages", included: true },
        ],
      },
    ],
  },
  ai: {
    label: "IA & Automation",
    plans: [
      {
        name: "Starter",
        price: 399,
        features: [
          { text: "Chatbot IA basique", included: true },
          { text: "Intégration site web", included: true },
          { text: "FAQ automatique", included: true },
          { text: "CRM intégration", included: false },
        ],
      },
      {
        name: "Business",
        price: 899,
        popular: true,
        features: [
          { text: "Chatbot IA avancé", included: true },
          { text: "Qualification leads automatique", included: true },
          { text: "Intégration CRM (HubSpot)", included: true },
          { text: "Automatisations email", included: true },
        ],
      },
      {
        name: "Enterprise",
        price: 1499,
        features: [
          { text: "Assistant IA sur-mesure", included: true },
          { text: "Analyse prédictive", included: true },
          { text: "Automatisation complète", included: true },
          { text: "Dashboard temps réel", included: true },
        ],
      },
    ],
  },
  maps: {
    label: "Google Maps",
    plans: [
      {
        name: "Ville Standard",
        price: 999,
        period: "/an",
        features: [
          { text: "Optimisation Google Business", included: true },
          { text: "Stratégie avis clients", included: true },
          { text: "50+ citations locales", included: true },
          { text: "Monitoring positions", included: true },
        ],
      },
      {
        name: "Grande Ville",
        price: 1599,
        period: "/an",
        popular: true,
        features: [
          { text: "Tout Standard +", included: true },
          { text: "Contenu géo-localisé avancé", included: true },
          { text: "Réponse aux avis incluse", included: true },
          { text: "Call mensuel stratégique", included: true },
        ],
      },
      {
        name: "Métropole",
        price: 2399,
        period: "/an",
        features: [
          { text: "Tout Grande Ville +", included: true },
          { text: "Stratégie multi-zones", included: true },
          { text: "Netlinking local premium", included: true },
          { text: "Garantie Top 5 ou remboursé", included: true },
        ],
      },
    ],
  },
};

export default function Pricing() {
  const { t, price: formatPrice } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("web");
  const data = pricingData[activeTab];

  return (
    <>
      <section className="relative overflow-hidden pt-20">
        <div className="glow-orb -right-32 top-20 h-96 w-96 animate-pulse-glow bg-glow-blue" />
        <div className="container-custom relative z-10 px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl">
              {t("nav.pricing")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Des tarifs transparents, sans frais cachés. Chaque euro investi est optimisé pour votre retour sur investissement.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          {/* Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {(Object.keys(pricingData) as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${activeTab === tab
                  ? "btn-primary-glow"
                  : "border border-surface-glass-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
              >
                {pricingData[tab].label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {data.plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`glass-card relative overflow-hidden p-8 ${plan.popular ? "border-primary/40 shadow-[var(--shadow-glow-sm)]" : ""
                  }`}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                    <Sparkles className="h-3 w-3" /> Populaire
                  </div>
                )}

                <h3 className="mb-2 text-xl font-bold text-foreground">{plan.name}</h3>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">
                    {formatPrice(plan.price)}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3">
                      {f.included ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                      )}
                      <span className={`text-sm ${f.included ? "text-foreground" : "text-muted-foreground/50"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={async () => {
                    try {
                      const response = await fetch("https://server-for-xragency.vercel.app/api/create-checkout-session", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: plan.name,
                          amount: plan.price * 100
                        }),
                      });

                      if (!response.ok) {
                        const errData = await response.json();
                        throw new Error(errData.error || "Server returned " + response.status);
                      }
                      const session = await response.json();

                      if (session.url) {
                        window.location.href = session.url;
                      } else {
                        throw new Error("No session URL returned from backend");
                      }
                    } catch (e: any) {
                      console.error(e);
                      alert("Error: " + (e.message || "Failed to connect to backend"));
                    }
                  }}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${plan.popular
                    ? "btn-primary-glow"
                    : "btn-ghost-glow"
                    }`}
                >
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
