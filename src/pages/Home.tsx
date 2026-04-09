import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Sparkles, Code, Search, Palette, Bot, MapPin } from "lucide-react";
import StorytellingSection from "@/components/home/StorytellingSection";
import ProofSection from "@/components/home/ProofSection";
import SmartConfigurator from "@/components/common/SmartConfigurator";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const services = [
  { key: "webDesign", icon: Code, path: "/services/web-design", gradient: "from-blue-500 to-cyan-400" },
  { key: "seo", icon: Search, path: "/services/seo", gradient: "from-emerald-500 to-teal-400" },
  { key: "branding", icon: Palette, path: "/services/branding", gradient: "from-pink-500 to-rose-400" },
  { key: "ai", icon: Bot, path: "/services/ai-automation", gradient: "from-violet-500 to-purple-400" },
  { key: "maps", icon: MapPin, path: "/services/google-maps", gradient: "from-amber-500 to-orange-400" },
];

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ═══════════ HERO — VIDEO/PARALLAX ═══════════ */}
      <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Parallax BG */}
        <motion.div style={{ y: heroY }} className="parallax-layer">
          <img src={heroBg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-background/75" />
        </motion.div>

        {/* Depth orbs */}
        <div className="glow-orb -left-32 top-20 h-96 w-96 animate-pulse-glow bg-glow-blue" />
        <div className="glow-orb -right-32 bottom-20 h-80 w-80 animate-pulse-glow bg-glow-purple" style={{ animationDelay: "2s" }} />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              Paris · New York · London · Tokyo
            </motion.p>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {t("hero.hook1")}
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-xl font-medium leading-relaxed text-primary sm:text-2xl">
              {t("hero.hook2")}
            </p>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#configurator" className="btn-primary-glow gap-2 text-base">
                {t("hero.ctaPotential")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/contact" className="btn-ghost-glow text-base">
                {t("hero.ctaCreate")}
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
              className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 p-1"
            >
              <div className="mx-auto h-2 w-1 rounded-full bg-muted-foreground/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ STORYTELLING ═══════════ */}
      <StorytellingSection />

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb -right-40 top-0 h-96 w-96 animate-pulse-glow bg-glow-purple" style={{ opacity: 0.06 }} />
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">
              {t("services.title")}
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-muted-foreground">
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
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.key} variants={fadeUp}>
                  <Link to={service.path} className="group block">
                    <div className="glass-card-hover p-8">
                      <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                        <Icon className="h-7 w-7 text-foreground" />
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
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CONFIGURATEUR INTELLIGENT ═══════════ */}
      <SmartConfigurator />

      {/* ═══════════ PREUVES ═══════════ */}
      <ProofSection />

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="glow-orb left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow bg-glow-blue" style={{ opacity: 0.08 }} />
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
              <a
                href="https://wa.me/33600000000?text=Je%20veux%20plus%20de%20clients"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-glow text-lg"
              >
                {t("cta.buttonWhatsapp")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
