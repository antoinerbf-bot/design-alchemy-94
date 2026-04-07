import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message envoyé ! Nous vous répondons sous 24h.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1500);
  };

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center overflow-hidden pt-20">
        <div className="glow-orb -left-32 top-20 h-96 w-96 animate-pulse-glow bg-glow-blue" />
        <div className="container-custom relative z-10 px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl">{t("nav.contact")}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Parlons de votre projet. Notre équipe vous répond sous 24 heures avec une analyse personnalisée et un devis détaillé.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="glass-card space-y-6 p-8 lg:col-span-3"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Nom complet</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-surface-glass-border bg-secondary/50 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-surface-glass-border bg-secondary/50 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="jean@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Téléphone</label>
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-surface-glass-border bg-secondary/50 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Votre projet</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-surface-glass-border bg-secondary/50 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Décrivez votre projet, vos objectifs et votre budget estimé..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary-glow w-full gap-2 disabled:opacity-50"
              >
                {sending ? "Envoi en cours..." : "Envoyer"}
                <Send className="h-4 w-4" />
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6 lg:col-span-2"
            >
              {[
                { icon: Mail, title: "Email", value: "hello@xragency.com" },
                { icon: Phone, title: "Téléphone", value: "+33 6 78 28 42 38" },
                { icon: MapPin, title: "Bureaux", value: "Paris · New York · London · Tokyo" },
              ].map(({ icon: Icon, title, value }) => (
                <div key={title} className="glass-card flex items-start gap-4 p-6">
                  <Icon className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                </div>
              ))}

              <div className="glass-card p-6">
                <p className="mb-2 font-semibold text-foreground">Réactivité garantie</p>
                <p className="text-sm text-muted-foreground">
                  Grâce à nos équipes réparties sur 4 continents et 12 fuseaux horaires, nous vous répondons sous 24 heures maximum, 7 jours sur 7.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
