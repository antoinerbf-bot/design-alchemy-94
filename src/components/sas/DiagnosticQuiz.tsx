import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

interface QuizStep {
  question: string;
  options: { icon: string; label: string }[];
}

interface DiagnosticQuizProps {
  steps: QuizStep[];
  resultTitle: string;
  resultDescription: string;
  resultCta: string;
  gradient: string;
}

export default function DiagnosticQuiz({ steps, resultTitle, resultDescription, resultCta, gradient }: DiagnosticQuizProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentStep]: optionIndex }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className={`glow-orb right-0 top-0 h-96 w-96 bg-gradient-to-br ${gradient}`} style={{ opacity: 0.08 }} />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <div className="mb-8 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-surface-glass-border bg-secondary/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              {t("sas.diagnostic")}
            </span>
          </div>

          <div className="glass-card p-8 md:p-12">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                <span>{currentStep + 1}/{steps.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-6 text-xl font-bold text-foreground md:text-2xl">
                    {steps[currentStep].question}
                  </h3>

                  <div className="mb-8 grid grid-cols-2 gap-3">
                    {steps[currentStep].options.map((option, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(i)}
                        className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                          answers[currentStep] === i
                            ? "border-primary bg-primary/10 shadow-[var(--shadow-glow-sm)]"
                            : "border-surface-glass-border bg-secondary/30 hover:border-primary/30"
                        }`}
                      >
                        <span className="mb-1 block text-lg">{option.icon}</span>
                        <span className="text-sm font-medium text-foreground">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t("sas.back")}
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={answers[currentStep] === undefined}
                      className="btn-primary-glow gap-2 px-6 py-3 text-sm disabled:opacity-30"
                    >
                      {currentStep < steps.length - 1 ? t("sas.next") : t("sas.seeResult")}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className={`mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient}`}>
                    <CheckCircle2 className="h-8 w-8 text-foreground" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{resultTitle}</h3>
                  <p className="mb-6 text-muted-foreground">{resultDescription}</p>
                  <a href="/contact" className="btn-primary-glow gap-2">
                    {resultCta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
