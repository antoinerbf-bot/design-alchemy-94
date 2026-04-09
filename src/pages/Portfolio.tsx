import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ExternalLink, TrendingUp, Target, Award } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

interface CaseStudy {
  client: string;
  sector: string;
  objective: string;
  result: string;
  metrics: Array<{ label: string; value: string }>;
  services: string[];
  gradient: string;
}

export default function Portfolio() {
  const { t } = useLanguage();

  const cases: CaseStudy[] = [
    {
      client: "Le Jardin Gourmand",
      sector: t("portfolio.sector.restaurant"),
      objective: t("portfolio.case1.objective"),
      result: t("portfolio.case1.result"),
      metrics: [
        { label: t("portfolio.metric.calls"), value: "+240%" },
        { label: t("portfolio.metric.reservations"), value: "+180%" },
        { label: "Google Maps", value: "Top 1" },
      ],
      services: ["Google Maps", "SEO", t("services.webDesign.name")],
      gradient: "from-amber-500 to-orange-400",
    },
    {
      client: "TechFlow SaaS",
      sector: "SaaS B2B",
      objective: t("portfolio.case2.objective"),
      result: t("portfolio.case2.result"),
      metrics: [
        { label: t("portfolio.metric.traffic"), value: "+520%" },
        { label: t("portfolio.metric.leads"), value: "+340%" },
        { label: "ROI", value: "890%" },
      ],
      services: [t("services.webDesign.name"), "SEO Armada", t("services.ai.name")],
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      client: "Maison Éclat",
      sector: t("portfolio.sector.luxury"),
      objective: t("portfolio.case3.objective"),
      result: t("portfolio.case3.result"),
      metrics: [
        { label: t("portfolio.metric.brand"), value: "+300%" },
        { label: t("portfolio.metric.conversion"), value: "+210%" },
        { label: t("portfolio.metric.revenue"), value: "+450%" },
      ],
      services: [t("services.branding.name"), t("services.webDesign.name"), "SEO"],
      gradient: "from-pink-500 to-rose-400",
    },
    {
      client: "Cabinet Moreau & Associés",
      sector: t("portfolio.sector.legal"),
      objective: t("portfolio.case4.objective"),
      result: t("portfolio.case4.result"),
      metrics: [
        { label: t("portfolio.metric.visibility"), value: "+600%" },
        { label: t("portfolio.metric.clients"), value: "+45/mois" },
        { label: "Google Maps", value: "Top 3" },
      ],
      services: ["SEO", "Google Maps", t("services.ai.name")],
      gradient: "from-violet-500 to-purple-400",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden pt-20">
        <div className="glow-orb -right-32 top-20 h-96 w-96 animate-pulse-glow bg-glow-purple" style={{ opacity: 0.1 }} />
        <div className="container-custom relative z-10 px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              {t("portfolio.badge")}
            </p>
            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl">
              {t("portfolio.title")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("portfolio.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-12"
          >
            {cases.map((cs, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Left: visual accent */}
                  <div className={`flex items-center justify-center bg-gradient-to-br ${cs.gradient} p-8 lg:col-span-2`}>
                    <div className="text-center">
                      <Award className="mx-auto mb-4 h-16 w-16 text-white/80" />
                      <p className="text-3xl font-extrabold text-white">{cs.client}</p>
                      <p className="mt-2 text-sm text-white/70">{cs.sector}</p>
                    </div>
                  </div>

                  {/* Right: details */}
                  <div className="p-8 lg:col-span-3">
                    <div className="mb-6">
                      <div className="mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                          {t("portfolio.objectiveLabel")}
                        </span>
                      </div>
                      <p className="text-foreground">{cs.objective}</p>
                    </div>

                    <div className="mb-6">
                      <div className="mb-3 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-emerald-400" />
                        <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                          {t("portfolio.resultLabel")}
                        </span>
                      </div>
                      <p className="text-foreground">{cs.result}</p>
                    </div>

                    {/* Metrics */}
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      {cs.metrics.map((m, j) => (
                        <div key={j} className="rounded-xl bg-primary/5 p-4 text-center">
                          <p className="text-2xl font-extrabold gradient-text">{m.value}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {cs.services.map((s, j) => (
                        <span key={j} className="rounded-full border border-surface-glass-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="glow-orb left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow bg-glow-blue" style={{ opacity: 0.08 }} />
        <div className="container-custom relative z-10 py-24 text-center md:py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-6 text-3xl font-extrabold text-foreground sm:text-5xl">
              {t("portfolio.ctaTitle")}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              {t("portfolio.ctaSubtitle")}
            </p>
            <Link to="/contact" className="btn-primary-glow gap-2 text-lg">
              {t("portfolio.ctaButton")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
