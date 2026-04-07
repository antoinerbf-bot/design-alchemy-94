import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface ProofResultsProps {
  title: string;
  subtitle: string;
  stats: Stat[];
  gradient: string;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-foreground md:text-5xl">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function ProofResults({ title, subtitle, stats, gradient }: ProofResultsProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className={`glow-orb left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br ${gradient}`} style={{ opacity: 0.05 }} />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
