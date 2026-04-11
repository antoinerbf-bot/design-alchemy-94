import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Zap, Award, HeadphonesIcon } from "lucide-react";

interface WhyUsItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface WhyUsSectionProps {
  title: string;
  subtitle: string;
  items: WhyUsItem[];
  gradient: string;
}

export default function WhyUsSection({ title, subtitle, items, gradient }: WhyUsSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className={`glow-orb left-1/4 bottom-0 h-80 w-80 bg-gradient-to-br ${gradient}`} style={{ opacity: 0.06 }} />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-surface-glass-border bg-secondary/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("sas.whyUs")}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="glass-card-hover p-6 text-center"
            >
              <div className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
