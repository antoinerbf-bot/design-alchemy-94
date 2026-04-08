import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Zap, Crown, Check, X, ArrowRight, Server, RefreshCw, HeadphonesIcon, BarChart3, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function WebCare() {
  const { t, price } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const plans = [
    {
      name: t("webcare.essential.name"),
      price: 29,
      period: t("sas.month"),
      icon: Shield,
      gradient: "from-emerald-500 to-teal-400",
      target: t("webcare.essential.target"),
      features: [
        { text: t("webcare.essential.f1"), included: true },
        { text: t("webcare.essential.f2"), included: true },
        { text: t("webcare.essential.f3"), included: true },
        { text: t("webcare.essential.f4"), included: true },
        { text: t("webcare.essential.f5"), included: true },
        { text: t("webcare.essential.f6"), included: false },
        { text: t("webcare.essential.f7"), included: false },
      ],
    },
    {
      name: t("webcare.business.name"),
      price: 59,
      period: t("sas.month"),
      icon: Zap,
      gradient: "from-blue-500 to-cyan-400",
      popular: true,
      target: t("webcare.business.target"),
      features: [
        { text: t("webcare.business.f1"), included: true },
        { text: t("webcare.business.f2"), included: true },
        { text: t("webcare.business.f3"), included: true },
        { text: t("webcare.business.f4"), included: true },
        { text: t("webcare.business.f5"), included: true },
        { text: t("webcare.business.f6"), included: true },
        { text: t("webcare.business.f7"), included: true },
      ],
    },
    {
      name: t("webcare.unlimited.name"),
      price: 99,
      period: t("sas.month"),
      icon: Crown,
      gradient: "from-amber-500 to-orange-400",
      target: t("webcare.unlimited.target"),
      features: [
        { text: t("webcare.unlimited.f1"), included: true },
        { text: t("webcare.unlimited.f2"), included: true },
        { text: t("webcare.unlimited.f3"), included: true },
        { text: t("webcare.unlimited.f4"), included: true },
        { text: t("webcare.unlimited.f5"), included: true },
        { text: t("webcare.unlimited.f6"), included: true },
        { text: t("webcare.unlimited.f7"), included: true },
      ],
    },
  ];

  const benefits = [
    { icon: Server, title: t("webcare.benefit1.title"), desc: t("webcare.benefit1.desc") },
    { icon: RefreshCw, title: t("webcare.benefit2.title"), desc: t("webcare.benefit2.desc") },
    { icon: HeadphonesIcon, title: t("webcare.benefit3.title"), desc: t("webcare.benefit3.desc") },
    { icon: BarChart3, title: t("webcare.benefit4.title"), desc: t("webcare.benefit4.desc") },
  ];

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="parallax-layer">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        </motion.div>
        <div className="glow-orb left-1/4 top-20 h-96 w-96 animate-pulse-glow bg-glow-blue" />
        <div className="glow-orb right-1/4 bottom-20 h-80 w-80 animate-pulse-glow bg-glow-purple" style={{ animationDelay: "2s" }} />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 px-6 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg">
            <Clock className="h-10 w-10 text-foreground" />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-foreground sm:text-6xl">
            {t("webcare.hero.title")}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{t("webcare.hero.subtitle")}</p>
        </motion.div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="glass-card-hover p-6 text-center">
                  <Icon className="mx-auto mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb left-1/2 top-0 h-96 w-96 -translate-x-1/2 animate-pulse-glow bg-glow-purple" />
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">{t("webcare.pricing.title")}</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground">{t("webcare.pricing.subtitle")}</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div key={i} variants={fadeUp} className={`glass-card-hover relative p-8 ${plan.popular ? "border-primary/40 ring-1 ring-primary/20" : ""}`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-1 text-xs font-bold text-foreground">
                      {t("sas.bestChoice")}
                    </span>
                  )}
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.gradient}`}>
                    <Icon className="h-7 w-7 text-foreground" />
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="mb-4 text-xs text-muted-foreground">{plan.target}</p>
                  <p className="mb-6 text-3xl font-extrabold text-foreground">
                    {price(plan.price)}
                    <span className="text-base font-normal text-muted-foreground">/{plan.period}</span>
                  </p>
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm">
                        {f.included ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />}
                        <span className={f.included ? "text-foreground" : "text-muted-foreground/50"}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all ${plan.popular ? "btn-primary-glow" : "btn-ghost-glow"}`}>
                    {t("sas.choose")} <ArrowRight className="h-4 w-4" />
                  </Link>
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
            <h2 className="mb-6 text-3xl font-extrabold text-foreground sm:text-5xl">{t("webcare.cta.title")}</h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">{t("webcare.cta.subtitle")}</p>
            <Link to="/contact" className="btn-primary-glow gap-2 text-lg">
              {t("webcare.cta.button")} <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
