import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Globe, Zap, Shield, Sparkles, Code, Search, Palette, Bot, MapPin, TrendingUp, Users, FolderKanban, BarChart3, Layers, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

/* ── animation variants ────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ── parallax section helper ───────────────────── */
function ParallaxSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      </motion.div>
      {children}
    </section>
  );
}

/* ── floating orb with parallax ────────────────── */
function FloatingOrb({ color, size, left, top, delay = 0 }: { color: string; size: string; left: string; top: string; delay?: number }) {
  return (
    <motion.div
      className={`glow-orb ${size} ${color} animate-pulse-glow`}
      style={{ left, top, animationDelay: `${delay}s` }}
      animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
      transition={{ repeat: Infinity, duration: 8 + delay * 2, ease: "easeInOut" }}
    />
  );
}

export default function Home() {
  const { t } = useLanguage();

  /* hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);

  const services = [
    { key: "webDesign", icon: Code, path: "/services/web-design", gradient: "from-blue-500 to-cyan-400" },
    { key: "seo", icon: Search, path: "/services/seo", gradient: "from-emerald-500 to-teal-400" },
    { key: "branding", icon: Palette, path: "/services/branding", gradient: "from-pink-500 to-rose-400" },
    { key: "ai", icon: Bot, path: "/services/ai-automation", gradient: "from-violet-500 to-purple-400" },
    { key: "maps", icon: MapPin, path: "/services/google-maps", gradient: "from-amber-500 to-orange-400" },
  ];

  const stats = [
    { value: 250, suffix: "+", label: t("proof.clients"), icon: Users },
    { value: 800, suffix: "+", label: t("proof.projects"), icon: FolderKanban },
    { value: 32, suffix: "", label: t("proof.countries"), icon: Globe },
    { value: 420, suffix: "%", label: t("proof.roi"), icon: BarChart3 },
  ];

  const whyPoints: Array<{ title: string; desc: string }> = t("why.points") as any;
  const whyIcons = [Zap, Bot, TrendingUp, Shield];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Multi-layer parallax background */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="parallax-layer">
          <img src={heroBg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </motion.div>

        {/* Floating 3D orbs */}
        <FloatingOrb color="bg-glow-blue" size="h-96 w-96" left="-10%" top="15%" />
        <FloatingOrb color="bg-glow-purple" size="h-80 w-80" left="80%" top="60%" delay={2} />
        <FloatingOrb color="bg-glow-gold" size="h-48 w-48" left="60%" top="10%" delay={4} />

        {/* Depth grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="mx-auto max-w-5xl">
            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-6 py-2.5 text-sm font-medium text-primary backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Paris · New York · London · Tokyo
            </motion.p>

            <h1 className="mb-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
              {t("hero.title")}{" "}
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" className="btn-primary-glow gap-2 text-base">
                  {t("hero.cta")} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/pricing" className="btn-ghost-glow text-base">{t("hero.ctaSecondary")}</Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/50">Scroll</span>
              <ChevronDown className="h-5 w-5 text-muted-foreground/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <ParallaxSection className="section-padding">
        <FloatingOrb color="bg-glow-purple" size="h-96 w-96" left="85%" top="-10%" delay={1} />

        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mb-16 text-center">
            <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <Layers className="h-3 w-3" /> {t("services.title")}
            </motion.div>
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">{t("services.title")}</motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("services.subtitle")}</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.key} variants={fadeUp}>
                  <Link to={service.path} className="group block">
                    <motion.div whileHover={{ y: -8, transition: { duration: 0.3 } }} className="glass-card-hover relative p-8">
                      {/* Depth light effect */}
                      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                      <div className={`relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                        <Icon className="h-7 w-7 text-foreground" />
                      </div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t(`services.${service.key}.tagline`)}</p>
                      <h3 className="mb-3 text-xl font-bold text-foreground">{t(`services.${service.key}.name`)}</h3>
                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{t(`services.${service.key}.description`)}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                        {t("sas.discover")} <ArrowRight className="h-4 w-4" />
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ═══ PROOF / STATS ═══ */}
      <ParallaxSection className="border-y border-border">
        <FloatingOrb color="bg-glow-blue" size="h-64 w-64" left="30%" top="40%" />

        <div className="container-custom section-padding relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">{t("proof.title")}</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground">{t("proof.subtitle")}</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={fadeUp}>
                  <motion.div whileHover={{ y: -6 }} className="glass-card p-8 text-center">
                    <Icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                    <p className="mb-2 text-3xl font-extrabold text-foreground sm:text-4xl">
                      {stat.value.toLocaleString()}{stat.suffix}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ═══ WHY XRAGENCY ═══ */}
      <ParallaxSection className="section-padding">
        <FloatingOrb color="bg-glow-purple" size="h-80 w-80" left="-5%" top="70%" delay={1} />

        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">{t("why.title")}</motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("why.subtitle")}</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {whyIcons.map((Icon, i) => (
              <motion.div key={i} variants={fadeUp}>
                <motion.div whileHover={{ y: -6 }} className="glass-card-hover relative p-8">
                  <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-primary/5 blur-xl" />
                  <Icon className="relative mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">{whyPoints[i]?.title}</h3>
                  <p className="text-muted-foreground">{whyPoints[i]?.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <FloatingOrb color="bg-glow-blue" size="h-[500px] w-[500px]" left="40%" top="30%" />
        <FloatingOrb color="bg-glow-purple" size="h-64 w-64" left="20%" top="60%" delay={3} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="container-custom relative z-10 py-32 text-center md:py-48">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <h2 className="mb-6 text-3xl font-extrabold text-foreground sm:text-5xl lg:text-6xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">{t("cta.subtitle")}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" className="btn-primary-glow gap-2 text-lg">
                  {t("cta.button")} <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" className="btn-ghost-glow text-lg">{t("cta.buttonSecondary")}</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
