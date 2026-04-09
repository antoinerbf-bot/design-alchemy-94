import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { XCircle, Frown, Lightbulb, Rocket } from "lucide-react";

const steps = [
  { icon: XCircle, color: "text-destructive", bgColor: "bg-destructive/10" },
  { icon: Frown, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { icon: Lightbulb, color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Rocket, color: "text-emerald-400", bgColor: "bg-emerald-400/10" },
];

export default function StorytellingSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  const storyKeys = ["problem", "frustration", "solution", "transformation"] as const;

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="glow-orb -left-40 top-1/3 h-96 w-96 animate-pulse-glow bg-glow-blue" style={{ opacity: 0.06 }} />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">
            {t("story.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("story.subtitle")}
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          {/* Animated vertical line */}
          <div className="absolute left-8 top-0 h-full w-px bg-border md:left-1/2">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-destructive via-primary to-emerald-400"
            />
          </div>

          {storyKeys.map((key, i) => {
            const Step = steps[i];
            const Icon = Step.icon;
            const isRight = i % 2 !== 0;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative mb-16 flex items-start gap-6 last:mb-0 ${isRight ? "md:flex-row-reverse md:text-right" : ""}`}
              >
                {/* Icon node */}
                <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${Step.bgColor}`}>
                  <Icon className={`h-7 w-7 ${Step.color}`} />
                </div>

                {/* Content */}
                <div className="glass-card flex-1 p-6">
                  <p className={`mb-1 text-xs font-semibold uppercase tracking-widest ${Step.color}`}>
                    {t(`story.${key}.label`)}
                  </p>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {t(`story.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`story.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
