import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { displayPrice } from "@/lib/currency";
import { Check, X, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingTier {
  name: string;
  price: number;
  period?: string;
  popular?: boolean;
  features: { text: string; included: boolean }[];
}

interface ServicePricingProps {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
  gradient: string;
}

export default function ServicePricing({ title, subtitle, tiers, gradient }: ServicePricingProps) {
  const { t, lang, price } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className={`glow-orb left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-gradient-to-br ${gradient}`} style={{ opacity: 0.06 }} />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-surface-glass-border bg-secondary/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("sas.pricing")}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className={`grid grid-cols-1 gap-6 ${tiers.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass-card relative p-8 transition-all duration-500 ${tier.popular
                ? "border-primary/40 shadow-[var(--shadow-glow-md)]"
                : "hover:border-primary/20"
                }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${gradient} px-4 py-1.5 text-xs font-bold text-foreground`}>
                    <Star className="h-3 w-3" />
                    {t("sas.bestChoice")}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold text-foreground">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">
                    {price(tier.price)}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-muted-foreground">/{tier.period}</span>
                  )}
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {tier.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground/50"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={async () => {
                  try {
                    const response = await fetch("https://xrserver.netlify.app/api/create-checkout-session", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: tier.name,
                        amount: tier.price * 100 // Stripe uses cents 
                      }),
                    });

                    if (!response.ok) {
                      const errData = await response.json();
                      throw new Error(errData.error || "Server returned " + response.status);
                    }

                    const session = await response.json();

                    if (session.url) {
                      window.location.href = session.url;
                    } else {
                      throw new Error("No session URL returned from backend");
                    }
                  } catch (e: any) {
                    console.error(e);
                    alert("Error: " + (e.message || "Failed to connect to backend"));
                  }
                }}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-all duration-300 ${tier.popular
                  ? "btn-primary-glow"
                  : "btn-ghost-glow"
                  }`}
              >
                {t("sas.choose")} {tier.name}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
