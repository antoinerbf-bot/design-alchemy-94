import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, FolderKanban, Globe, BarChart3, Star } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ProofSection() {
  const { t } = useLanguage();

  const stats = [
    { value: "250+", label: t("proof.clients"), icon: Users },
    { value: "800+", label: t("proof.projects"), icon: FolderKanban },
    { value: "32", label: t("proof.countries"), icon: Globe },
    { value: "420%", label: t("proof.roi"), icon: BarChart3 },
  ];

  const testimonials = [
    {
      name: "Sophie L.",
      role: "Restaurant Le Jardin, Paris",
      text: t("testimonials.sophie"),
      rating: 5,
    },
    {
      name: "Marc D.",
      role: "E-commerce Tech, Lyon",
      text: t("testimonials.marc"),
      rating: 5,
    },
    {
      name: "Aisha K.",
      role: "Cabinet Juridique, Dubai",
      text: t("testimonials.aisha"),
      rating: 5,
    },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border">
      <div className="glow-orb left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 animate-pulse-glow bg-glow-blue" style={{ opacity: 0.06 }} />

      <div className="container-custom section-padding relative z-10">
        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-20 text-center"
        >
          <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">
            {t("proof.title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-12 text-lg text-muted-foreground">
            {t("proof.subtitle")}
          </motion.p>

          <motion.div variants={stagger} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={fadeUp} className="glass-card p-8 text-center">
                  <Icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                  <p className="mb-2 text-3xl font-extrabold text-foreground sm:text-4xl">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h3 variants={fadeUp} className="mb-8 text-center text-2xl font-bold text-foreground">
            {t("proof.testimonialsTitle")}
          </motion.h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((tm, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-card-hover p-6">
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: tm.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground italic">
                  "{tm.text}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{tm.name}</p>
                  <p className="text-xs text-muted-foreground">{tm.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
