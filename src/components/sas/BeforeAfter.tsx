import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, Check } from "lucide-react";

interface BeforeAfterProps {
  title: string;
  beforeTitle: string;
  afterTitle: string;
  beforeItems: string[];
  afterItems: string[];
  gradient: string;
}

export default function BeforeAfter({ title, beforeTitle, afterTitle, beforeItems, afterItems, gradient }: BeforeAfterProps) {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className={`glow-orb right-1/4 top-1/2 h-96 w-96 bg-gradient-to-br ${gradient}`} style={{ opacity: 0.06 }} />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-surface-glass-border bg-secondary/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("sas.transformation")}
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card border-destructive/20 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20">
                <X className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{beforeTitle}</h3>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/60" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card border-emerald-500/20 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <Check className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{afterTitle}</h3>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
