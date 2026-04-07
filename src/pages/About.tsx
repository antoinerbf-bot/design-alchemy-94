import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Globe, Zap, Award, ArrowRight } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function About() {
  const { t } = useLanguage();

  const values = [
    { icon: Zap, title: "Innovation", desc: "Nous repoussons les limites de la technologie pour créer des solutions qui n'existaient pas hier. L'IA, le machine learning et l'automatisation sont au cœur de notre ADN." },
    { icon: Users, title: "Excellence", desc: "Chaque projet est traité comme s'il était le plus important. Nos équipes de designers, développeurs et stratèges travaillent en synergie pour livrer un résultat irréprochable." },
    { icon: Globe, title: "Présence mondiale", desc: "Avec des bureaux à Paris, New York, London et Tokyo, nous offrons une réactivité 24h/24 grâce à nos équipes réparties sur 4 continents et 12 fuseaux horaires." },
    { icon: Award, title: "Résultats garantis", desc: "Nous ne vendons pas des promesses, nous livrons des résultats mesurables. Chaque euro investi est tracé, analysé et optimisé pour maximiser votre retour sur investissement." },
  ];

  return (
    <>
      <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-20">
        <div className="glow-orb -right-32 top-20 h-96 w-96 animate-pulse-glow bg-glow-blue" />
        <div className="container-custom relative z-10 px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">XRAGENCY</p>
            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl">
              {t("nav.about")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              XRAGENCY est une agence digitale internationale positionnée sur le segment premium. Nous combinons intelligence artificielle, créativité humaine et stratégie business pour transformer votre présence digitale en machine à croissance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="glass-card-hover p-8">
                  <Icon className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">{v.title}</h3>
                  <p className="text-muted-foreground">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow bg-glow-purple" style={{ opacity: 0.1 }} />
        <div className="container-custom relative z-10 text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">{t("cta.title")}</h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">{t("cta.subtitle")}</p>
          <Link to="/contact" className="btn-primary-glow gap-2 text-lg">
            {t("cta.button")} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
