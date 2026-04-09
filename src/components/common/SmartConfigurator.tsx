import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Store,
  Factory,
  Monitor,
  ShoppingCart,
  Layers,
  Search,
  MapPin,
  Bot,
  Users,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface ConfigResult {
  mainService: string;
  pack: string;
  basePrice: number;
  extras: Array<{ name: string; price: number }>;
  discount: number;
  totalBefore: number;
  totalAfter: number;
}

const STEPS = 3;

const businessTypes = [
  { key: "artisan", icon: Store, color: "from-amber-500 to-orange-400" },
  { key: "pme", icon: Building2, color: "from-blue-500 to-cyan-400" },
  { key: "enterprise", icon: Factory, color: "from-violet-500 to-purple-400" },
];

const siteTypes = [
  { key: "vitrine", icon: Monitor, basePrice: 499 },
  { key: "vitrineAdv", icon: Layers, basePrice: 799 },
  { key: "ecommerce", icon: ShoppingCart, basePrice: 1099 },
];

const objectives = [
  { key: "seo", icon: Search, price: 299, period: "/mois" },
  { key: "maps", icon: MapPin, price: 999, period: "/an" },
  { key: "ai", icon: Bot, price: 399, period: "" },
  { key: "social", icon: Users, price: 199, period: "/mois" },
];

export default function SmartConfigurator() {
  const { t, price, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState<number | null>(null);
  const [siteType, setSiteType] = useState<number | null>(null);
  const [selectedObjectives, setSelectedObjectives] = useState<number[]>([]);

  const labels = useMemo(() => ({
    title: t("configurator.title"),
    subtitle: t("configurator.subtitle"),
    step1: t("configurator.step1"),
    step2: t("configurator.step2"),
    step3: t("configurator.step3"),
    artisan: t("configurator.artisan"),
    pme: t("configurator.pme"),
    enterprise: t("configurator.enterprise"),
    vitrine: t("configurator.vitrine"),
    vitrineAdv: t("configurator.vitrineAdv"),
    ecommerce: t("configurator.ecommerce"),
    seo: t("configurator.seo"),
    maps: t("configurator.maps"),
    ai: t("configurator.ai"),
    social: t("configurator.social"),
    result: t("configurator.result"),
    resultDesc: t("configurator.resultDesc"),
    recommended: t("configurator.recommended"),
    bundleDiscount: t("configurator.bundleDiscount"),
    total: t("configurator.total"),
    cta: t("configurator.cta"),
    ctaWhatsapp: t("configurator.ctaWhatsapp"),
    back: t("sas.back"),
    next: t("sas.next"),
  }), [t, lang]);

  const toggleObjective = (i: number) => {
    setSelectedObjectives((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const result: ConfigResult | null = useMemo(() => {
    if (siteType === null) return null;
    const site = siteTypes[siteType];
    const extras = selectedObjectives.map((i) => ({
      name: (labels as any)[objectives[i].key],
      price: objectives[i].price,
    }));
    const subtotal = site.basePrice + extras.reduce((s, e) => s + e.price, 0);
    const discount = extras.length >= 2 ? 0.1 : extras.length >= 1 ? 0.05 : 0;
    const total = Math.round(subtotal * (1 - discount));
    return {
      mainService: (labels as any)[siteTypes[siteType].key],
      pack: businessTypes[business ?? 0].key,
      basePrice: site.basePrice,
      extras,
      discount,
      totalBefore: subtotal,
      totalAfter: total,
    };
  }, [siteType, selectedObjectives, business, labels]);

  const canNext =
    (step === 0 && business !== null) ||
    (step === 1 && siteType !== null) ||
    step === 2;

  const showResult = step === STEPS;

  return (
    <section className="section-padding relative overflow-hidden" id="configurator">
      <div className="glow-orb left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 animate-pulse-glow bg-glow-purple" style={{ opacity: 0.08 }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            {labels.title}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-5xl">
            {labels.subtitle}
          </h2>
        </motion.div>

        {/* Progress bar */}
        {!showResult && (
          <div className="mx-auto mb-10 flex max-w-md items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "bg-primary" : "bg-muted"}`} />
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {i === 0 ? labels.step1 : i === 1 ? labels.step2 : labels.step3}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Steps */}
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                {businessTypes.map((bt, i) => {
                  const Icon = bt.icon;
                  return (
                    <button
                      key={bt.key}
                      onClick={() => setBusiness(i)}
                      className={`glass-card-hover p-8 text-center transition-all ${business === i ? "border-primary ring-2 ring-primary/30" : ""}`}
                    >
                      <div className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${bt.color}`}>
                        <Icon className="h-7 w-7 text-foreground" />
                      </div>
                      <p className="text-lg font-bold text-foreground">{(labels as any)[bt.key]}</p>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                {siteTypes.map((st, i) => {
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.key}
                      onClick={() => setSiteType(i)}
                      className={`glass-card-hover p-8 text-center transition-all ${siteType === i ? "border-primary ring-2 ring-primary/30" : ""}`}
                    >
                      <Icon className="mx-auto mb-4 h-10 w-10 text-primary" />
                      <p className="mb-2 text-lg font-bold text-foreground">{(labels as any)[st.key]}</p>
                      <p className="text-2xl font-extrabold gradient-text">{price(st.basePrice)}</p>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {objectives.map((obj, i) => {
                  const Icon = obj.icon;
                  const selected = selectedObjectives.includes(i);
                  return (
                    <button
                      key={obj.key}
                      onClick={() => toggleObjective(i)}
                      className={`glass-card-hover flex items-center gap-4 p-6 text-left transition-all ${selected ? "border-primary ring-2 ring-primary/30" : ""}`}
                    >
                      <Icon className="h-8 w-8 shrink-0 text-primary" />
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{(labels as any)[obj.key]}</p>
                        <p className="text-sm text-muted-foreground">
                          +{price(obj.price)}{obj.period}
                        </p>
                      </div>
                      {selected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {showResult && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 sm:p-12"
              >
                <div className="mb-6 flex items-center gap-3">
                  <Zap className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{labels.result}</h3>
                    <p className="text-sm text-muted-foreground">{labels.resultDesc}</p>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-medium text-foreground">{result.mainService}</span>
                    <span className="font-bold text-foreground">{price(result.basePrice)}</span>
                  </div>
                  {result.extras.map((e, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">{e.name}</span>
                      <span className="text-foreground">+{price(e.price)}</span>
                    </div>
                  ))}
                  {result.discount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>{labels.bundleDiscount}</span>
                      <span>-{Math.round(result.discount * 100)}%</span>
                    </div>
                  )}
                </div>

                <div className="mb-8 rounded-xl bg-primary/10 p-6 text-center">
                  {result.discount > 0 && (
                    <p className="mb-1 text-sm text-muted-foreground line-through">
                      {price(result.totalBefore)}
                    </p>
                  )}
                  <p className="text-4xl font-extrabold gradient-text">
                    {price(result.totalAfter)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{labels.recommended}</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/contact" className="btn-primary-glow flex-1 gap-2 text-center">
                    {labels.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://wa.me/33600000000?text=Je%20veux%20plus%20de%20clients"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-glow flex-1 gap-2 text-center"
                  >
                    {labels.ctaWhatsapp}
                  </a>
                </div>

                <button
                  onClick={() => { setStep(0); setBusiness(null); setSiteType(null); setSelectedObjectives([]); }}
                  className="mx-auto mt-6 block text-sm text-muted-foreground hover:text-primary"
                >
                  ↻ {labels.back}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {!showResult && (
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
                {labels.back}
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext}
                className="btn-primary-glow gap-2 px-6 py-3 text-sm disabled:opacity-40"
              >
                {step === 2 ? labels.result : labels.next}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
