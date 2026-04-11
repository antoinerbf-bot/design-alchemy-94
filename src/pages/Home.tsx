import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Globe, Zap, Shield, Sparkles, Code, Search, Palette, Bot, MapPin, TrendingUp, Users, FolderKanban, BarChart3 } from "lucide-react";
import heroVideo from "@/assets/hero.mp4";
import SmartConfigurator from "@/components/sas/SmartConfigurator";
import { ScrollSequence } from "@/components/common/ScrollSequence";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value.toLocaleString()}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

export default function Home() {
  const { t } = useLanguage();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const sequenceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sequenceProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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

  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  });
  const parallaxY1 = useTransform(servicesProgress, [0, 1], [40, -40]);
  const parallaxY2 = useTransform(servicesProgress, [0, 1], [10, -10]);
  const parallaxY3 = useTransform(servicesProgress, [0, 1], [-40, 40]);

  const proofRef = useRef<HTMLElement>(null);
  const { scrollYProgress: proofProgress } = useScroll({
    target: proofRef,
    offset: ["start end", "end start"],
  });
  const proofY1 = useTransform(proofProgress, [0, 1], [30, -30]);
  const proofY2 = useTransform(proofProgress, [0, 1], [-30, 30]);

  const whyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: whyProgress } = useScroll({
    target: whyRef,
    offset: ["start end", "end start"],
  });
  const whyY1 = useTransform(whyProgress, [0, 1], [30, -30]);
  const whyY2 = useTransform(whyProgress, [0, 1], [-30, 30]);

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden z-0 bg-black">
        {/* Parallax BG */}
        <motion.div style={{ y: heroY }} className="parallax-layer">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </motion.div>

        {/* Floating orbs */}
        <div className="glow-orb -left-32 top-20 h-96 w-96 animate-pulse-glow bg-glow-blue" />
        <div className="glow-orb -right-32 bottom-20 h-80 w-80 animate-pulse-glow bg-glow-purple" style={{ animationDelay: "2s" }} />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="container-custom relative z-10 px-6 text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              Paris · New York · London · Tokyo
            </motion.p>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t("hero.title")}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{t("hero.titleHighlight")}</span>
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col items-start justify-start gap-4 sm:flex-row">
              <Link to="/contact" className="bg-white text-black hover:bg-gray-200 inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold transition-all duration-300 gap-2 text-base">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="bg-white/10 text-white hover:bg-white/20 border border-white/20 inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold transition-all duration-300 text-base">
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-10 w-6 rounded-full border-2 border-white/30 p-1"
            >
              <div className="mx-auto h-2 w-1 rounded-full bg-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section ref={servicesRef} className="sticky top-0 z-10 w-full h-[100dvh] bg-[#f8fafc] flex flex-col justify-start pt-24 pb-12 overflow-y-auto overflow-x-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="glow-orb -right-40 top-0 h-96 w-96 animate-pulse-glow bg-glow-purple" />

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="mb-4 text-3xl font-bold text-foreground sm:text-5xl"
            >
              {t("services.title")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
            >
              {t("services.subtitle")}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              const yValue = idx % 3 === 0 ? parallaxY1 : idx % 3 === 1 ? parallaxY2 : parallaxY3;

              return (
                <motion.div key={service.key} variants={fadeUp}>
                  <motion.div style={{ y: yValue }}>
                    <Link to={service.path} className="group block">
                      <div className="glass-card-hover p-8 md:min-h-[350px]">
                        <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>

                        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {t(`services.${service.key}.tagline`)}
                        </p>

                        <h3 className="mb-3 text-xl font-bold text-foreground">
                          {t(`services.${service.key}.name`)}
                        </h3>

                        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                          {t(`services.${service.key}.description`)}
                        </p>

                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                          {t("hero.cta")}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PROOF / STATS ═══════════ */}
      <section ref={proofRef} className="sticky top-0 z-20 w-full h-[100dvh] bg-[#ecfdf5] flex flex-col justify-start pt-24 pb-12 overflow-y-auto overflow-x-hidden border-y border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="glow-orb left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 animate-pulse-glow bg-glow-blue" />

        <div className="container-custom section-padding relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">
              {t("proof.title")}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
              {t("proof.subtitle")}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              const yValue = idx % 2 === 0 ? proofY1 : proofY2;
              return (
                <motion.div key={stat.label} variants={fadeUp}>
                  <motion.div style={{ y: yValue }}>
                    <div className="glass-card p-8 text-center h-full">
                      <Icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                      <p className="mb-2 text-3xl font-extrabold text-foreground sm:text-4xl">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHY XRAGENCY ═══════════ */}
      <section ref={whyRef} className="sticky top-0 z-30 w-full h-[100dvh] bg-[#fff1f2] flex flex-col justify-start pt-24 pb-12 overflow-y-auto overflow-x-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="glow-orb -left-20 bottom-0 h-80 w-80 animate-pulse-glow bg-glow-purple" />

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">
              {t("why.title")}
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("why.subtitle")}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {[Zap, Bot, TrendingUp, Shield].map((Icon, i) => {
              const yValue = i % 2 === 0 ? whyY1 : whyY2;
              return (
                <motion.div key={i} variants={fadeUp}>
                  <motion.div style={{ y: yValue }}>
                    <div className="glass-card-hover p-8 md:min-h-[250px]">
                      <Icon className="mb-4 h-10 w-10 text-primary" />
                      <h3 className="mb-2 text-xl font-bold text-foreground">
                        {whyPoints[i]?.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {whyPoints[i]?.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SMART CONFIGURATOR ═══════════ */}
      <section className="sticky top-0 z-40 w-full h-[100dvh] bg-[#fffbeb] flex flex-col justify-start pt-24 pb-12 overflow-y-auto overflow-x-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <SmartConfigurator />
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="sticky top-0 z-50 w-full h-[100dvh] bg-[#faf5ff] flex flex-col justify-start overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="glow-orb left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow bg-glow-blue" />

        <div className="container-custom relative z-10 py-32 text-center md:py-48">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-3xl font-extrabold text-foreground sm:text-5xl lg:text-6xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary-glow gap-2 text-lg">
                {t("cta.button")}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contact" className="btn-ghost-glow text-lg">
                {t("cta.buttonSecondary")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SEQUENCE EXPLORER ═══════════ */}
      <div ref={sequenceRef} className="relative z-[60] w-full h-[300vh] bg-black">
        <section className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden">
          <ScrollSequence progress={sequenceProgress} />
        </section>
      </div>
    </>
  );
}
