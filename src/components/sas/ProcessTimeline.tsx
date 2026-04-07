import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface TimelineStep {
  number: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

interface ProcessTimelineProps {
  title: string;
  subtitle: string;
  steps: TimelineStep[];
  gradient: string;
}

export default function ProcessTimeline({ title, subtitle, steps, gradient }: ProcessTimelineProps) {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className={`glow-orb -left-32 top-1/3 h-80 w-80 bg-gradient-to-br ${gradient}`} style={{ opacity: 0.06 }} />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-surface-glass-border bg-secondary/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("sas.process")}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:left-1/2" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative mb-12 flex items-start gap-6 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`ml-20 flex-1 md:ml-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                <div className="glass-card-hover p-6">
                  <span className="mb-1 block text-2xl">{step.icon}</span>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mb-3 text-sm text-muted-foreground">{step.description}</p>
                  <span className={`inline-block rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-semibold text-foreground`}>
                    {step.duration}
                  </span>
                </div>
              </div>

              {/* Number circle */}
              <div className="absolute left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary md:left-1/2 md:-translate-x-1/2">
                {step.number}
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
