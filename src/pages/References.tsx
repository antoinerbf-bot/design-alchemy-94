import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ExternalLink, TrendingUp, Globe, Code, Search, Palette, Bot, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const serviceIcons: Record<string, any> = {
  web: Code, seo: Search, branding: Palette, ai: Bot, maps: MapPin,
};

export default function References() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [filter, setFilter] = useState("all");

  const projects: Array<{
    name: string; industry: string; service: string;
    result: string; kpi: string; description: string;
  }> = t("references.projects") as any;

  const filters = [
    { key: "all", label: t("references.filterAll") },
    { key: "web", label: t("references.filterWeb") },
    { key: "seo", label: t("references.filterSeo") },
    { key: "branding", label: t("references.filterBranding") },
    { key: "ai", label: t("references.filterAi") },
    { key: "maps", label: t("references.filterMaps") },
  ];

  const filtered = filter === "all" ? projects : projects.filter((p) => p.service === filter);

  const stats = [
    { value: "250+", label: t("references.statClients") },
    { value: "98%", label: t("references.statSatisfaction") },
    { value: "420%", label: t("references.statRoi") },
    { value: "32", label: t("references.statCountries") },
  ];

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="parallax-layer">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        </motion.div>
        <div className="glow-orb -left-32 top-20 h-96 w-96 animate-pulse-glow bg-glow-purple" />
        <div className="glow-orb right-0 bottom-10 h-80 w-80 animate-pulse-glow bg-glow-blue" style={{ animationDelay: "2s" }} />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 px-6 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-foreground sm:text-6xl">{t("references.hero.title")}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{t("references.hero.subtitle")}</p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden border-y border-border">
        <div className="container-custom section-padding relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-card p-8 text-center">
                <p className="mb-2 text-3xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb left-1/3 top-0 h-64 w-64 animate-pulse-glow bg-glow-blue" />
        <div className="container-custom relative z-10">
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "border border-surface-glass-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* PROJECTS GRID */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => {
              const Icon = serviceIcons[project.service] || Globe;
              return (
                <motion.div key={i} variants={fadeUp} layout className="glass-card-hover group relative overflow-hidden p-8">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <Icon className="h-8 w-8 text-primary" />
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                        <TrendingUp className="h-3 w-3" /> {project.kpi}
                      </span>
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-foreground">{project.name}</h3>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">{project.industry}</p>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                    <p className="text-sm font-semibold text-primary">{project.result}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="glow-orb left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow bg-glow-blue" />
        <div className="container-custom relative z-10 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-6 text-3xl font-extrabold text-foreground sm:text-5xl">{t("references.cta.title")}</h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">{t("references.cta.subtitle")}</p>
            <Link to="/contact" className="btn-primary-glow gap-2 text-lg">
              {t("references.cta.button")} <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
