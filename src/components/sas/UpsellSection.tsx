import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { displayPrice } from "@/lib/currency";
import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface UpsellItem {
  icon: string;
  title: string;
  description: string;
  price: number;
  period?: string;
  link: string;
}

interface UpsellSectionProps {
  title: string;
  subtitle: string;
  items: UpsellItem[];
  gradient: string;
}

export default function UpsellSection({ title, subtitle, items, gradient }: UpsellSectionProps) {
  const { t, language } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className={`glow-orb -right-20 bottom-0 h-64 w-64 bg-gradient-to-br ${gradient}`} style={{ opacity: 0.06 }} />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-surface-glass-border bg-secondary/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("sas.boost")}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6"
            >
              <span className="mb-3 block text-3xl">{item.icon}</span>
              <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <Plus className="h-3 w-3 text-emerald-400" />
                  <span className="font-bold text-foreground">{displayPrice(item.price, language)}</span>
                  {item.period && <span className="text-xs text-muted-foreground">/{item.period}</span>}
                </div>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {t("sas.discover")}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="glass-card mx-auto inline-block p-6">
            <p className="mb-4 text-sm text-muted-foreground">{t("sas.bundleHint")}</p>
            <Link to="/pricing" className="btn-primary-glow gap-2 px-6 py-3 text-sm">
              {t("sas.seeBundles")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
