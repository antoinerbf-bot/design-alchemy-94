import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServicePageProps {
  serviceKey: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
}

export default function ServicePageTemplate({ serviceKey, icon, gradient, features }: ServicePageProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-20">
        <div className={`glow-orb -right-32 top-20 h-96 w-96 animate-pulse-glow ${gradient}`} />
        <div className={`glow-orb -left-32 bottom-10 h-80 w-80 animate-pulse-glow ${gradient}`} style={{ animationDelay: "2s", opacity: 0.1 }} />

        <div className="container-custom relative z-10 px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-xl`}>
              {icon}
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {t(`services.${serviceKey}.tagline`)}
            </p>

            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl">
              {t(`services.${serviceKey}.name`)}
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t(`services.${serviceKey}.description`)}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary-glow gap-2">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="btn-ghost-glow">
                {t("nav.pricing")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="glass-card-hover p-8"
              >
                <div className={`mb-4 h-2 w-12 rounded-full bg-gradient-to-r ${gradient}`} />
                <p className="text-foreground">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className={`glow-orb left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow ${gradient}`} style={{ opacity: 0.1 }} />
        <div className="container-custom relative z-10 text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            {t("cta.subtitle")}
          </p>
          <Link to="/contact" className="btn-primary-glow gap-2 text-lg">
            {t("cta.button")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
