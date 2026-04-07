import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Star, Navigation, Store, Shield, TrendingUp, Users } from "lucide-react";
import DiagnosticQuiz from "@/components/sas/DiagnosticQuiz";
import ProcessTimeline from "@/components/sas/ProcessTimeline";
import BeforeAfter from "@/components/sas/BeforeAfter";
import ServicePricing from "@/components/sas/ServicePricing";
import UpsellSection from "@/components/sas/UpsellSection";
import WhyUsSection from "@/components/sas/WhyUsSection";
import ProofResults from "@/components/sas/ProofResults";

const GRADIENT = "from-amber-500 to-orange-400";

export default function GoogleMaps() {
  const { t, price } = useLanguage();

  return (
    <>
      {/* HERO — LOCAL DOMINATION MAP */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20">
        <div className={`glow-orb -right-40 top-10 h-[600px] w-[600px] bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.12 }} />
        <div className={`glow-orb -left-32 bottom-10 h-80 w-80 bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.06 }} />
        {/* Simulated map pins */}
        <div className="parallax-layer depth-blur-far">
          {[
            { x: "20%", y: "30%", delay: 0 },
            { x: "70%", y: "25%", delay: 0.5 },
            { x: "60%", y: "55%", delay: 1 },
            { x: "35%", y: "65%", delay: 1.5 },
          ].map((pin, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: pin.delay }}
              className="absolute"
              style={{ left: pin.x, top: pin.y }}
            >
              <MapPin className="h-6 w-6 text-amber-500/30" />
            </motion.div>
          ))}
        </div>

        <div className="container-custom relative z-10 px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} shadow-xl`}>
              <MapPin className="h-8 w-8 text-foreground" />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t("services.maps.tagline")}</p>
            <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl lg:text-7xl">{t("services.maps.name")}</h1>
            <p className="mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("services.maps.description")}</p>
            <p className="mb-8 max-w-2xl text-base text-muted-foreground/80">
              46% des recherches Google ont une intention locale. "Restaurant près de moi" = 12 millions de recherches par mois en France. Les 3 premiers résultats captent 80% des clics.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary-glow gap-2">{t("hero.cta")} <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/pricing" className="btn-ghost-glow">{t("nav.audit")}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GOOGLE MAPS PACK SIMULATION */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Le Pack Local Google Maps</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Voilà ce que vos clients voient quand ils cherchent vos services.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-xl">
            <div className="glass-card overflow-hidden">
              <div className={`bg-gradient-to-r ${GRADIENT} px-6 py-3`}>
                <p className="flex items-center gap-2 text-sm font-bold text-foreground"><Navigation className="h-4 w-4" /> Pack Local (Google Maps)</p>
              </div>
              {[
                { name: "Votre Entreprise", stars: 5, reviews: 127, rank: "TOP 1 🏆", highlight: true },
                { name: "Concurrent A", stars: 4, reviews: 89, rank: "TOP 2", highlight: false },
                { name: "Concurrent B", stars: 4, reviews: 65, rank: "TOP 3", highlight: false },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`flex items-center justify-between border-b border-surface-glass-border px-6 py-4 ${item.highlight ? "bg-primary/5" : ""}`}
                >
                  <div>
                    <p className={`font-semibold ${item.highlight ? "text-primary" : "text-foreground"}`}>{item.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {Array.from({ length: item.stars }).map((_, si) => (
                        <Star key={si} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1">({item.reviews})</span>
                      <span className="ml-2">• Ouvert • 2.3 km</span>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.highlight ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                    {item.rank}
                  </span>
                </motion.div>
              ))}
              <div className="px-6 py-4">
                <p className="text-center text-xs text-muted-foreground">👆 Ces 3 établissements captent 80% des clics. Les autres sont invisibles.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIAGNOSTIC */}
      <DiagnosticQuiz
        gradient={GRADIENT}
        steps={[
          { question: "Votre secteur d'activité ?", options: [
            { icon: "🍴", label: "Restaurant / Bar" }, { icon: "🏥", label: "Santé (dentiste, kiné)" },
            { icon: "🔧", label: "Artisan (plombier, électricien)" }, { icon: "💇", label: "Bien-être (coiffeur, spa)" }
          ]},
          { question: "Taille de votre ville ?", options: [
            { icon: "🏘️", label: "< 50 000 habitants" }, { icon: "🏙️", label: "50-200 000 habitants" },
            { icon: "🌆", label: "> 200 000 habitants" }, { icon: "🗼", label: "Paris / Lyon / Marseille" }
          ]},
          { question: "Votre position Google Maps actuelle ?", options: [
            { icon: "🔴", label: "Non classé" }, { icon: "🟠", label: "Top 10-20" },
            { icon: "🟡", label: "Top 4-10" }, { icon: "🟢", label: "Déjà Top 3" }
          ]},
        ]}
        resultTitle="Devis personnalisé prêt"
        resultDescription="Selon votre secteur et votre ville, nous estimons un investissement de 999-1 899€/an avec un ROI de +525% après 6 mois."
        resultCta="Recevoir mon devis exact (gratuit)"
      />

      {/* BEFORE / AFTER */}
      <BeforeAfter
        gradient={GRADIENT}
        title="L'impact du Top 3 Google Maps"
        beforeTitle="Invisible sur la carte"
        afterTitle="Top 3 avec XRAGENCY"
        beforeItems={[
          "Fiche Google Business incomplète ou inexistante",
          "0-5 avis Google (ou négatifs non gérés)",
          "NAP incohérent entre les annuaires",
          "Aucune photo professionnelle",
          "Les concurrents captent 80% des recherches locales",
          "Perte de 120+ appels clients potentiels/mois",
        ]}
        afterItems={[
          "Fiche Google optimisée à 100% (catégories, photos HD, descriptions)",
          "50+ avis 5 étoiles (stratégie éthique conforme Google)",
          "NAP cohérent sur 50+ annuaires locaux",
          "Photos professionnelles + visite virtuelle",
          "Top 3 local : vous captez les clics de vos concurrents",
          "+120 appels/mois supplémentaires mesurés",
        ]}
      />

      {/* PROCESS */}
      <ProcessTimeline
        gradient={GRADIENT}
        title="Comment on atteint le Top 3"
        subtitle="Un processus en 5 étapes éprouvé sur 200+ entreprises locales."
        steps={[
          { number: 1, icon: "📋", title: "Optimisation Fiche Google", description: "Catégories, horaires, photos HD, descriptions optimisées, attributs, zone de service. Score de complétion 100%.", duration: "J+0 à J+7" },
          { number: 2, icon: "⭐", title: "Stratégie Avis Clients", description: "Campagne d'acquisition d'avis 5 étoiles éthique et conforme aux guidelines Google. Templates de demande d'avis.", duration: "J+7 à M+2" },
          { number: 3, icon: "📍", title: "Citations & NAP", description: "Inscription dans 50+ annuaires locaux avec Nom, Adresse, Téléphone parfaitement cohérents.", duration: "M+1 à M+2" },
          { number: 4, icon: "📝", title: "Contenu Géo-Localisé", description: "Articles SEO avec mots-clés locaux pointant vers votre fiche. Renforcement de l'autorité locale.", duration: "M+2 à M+4" },
          { number: 5, icon: "📊", title: "Monitoring & Ajustements", description: "Suivi quotidien des positions. Réponses aux avis clients incluses. Optimisations continues.", duration: "M+3 à M+6" },
        ]}
      />

      {/* ROI CALCULATION */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Calcul ROI : Restaurant Nice</h2>
            <p className="text-muted-foreground">Un exemple concret et vérifiable.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-lg">
            <div className="glass-card overflow-hidden">
              <div className="space-y-0">
                {[
                  { label: "Investissement XRAGENCY", value: price(1799) + "/an", highlight: false },
                  { label: "Appels/mois (Google Maps)", value: "+120", highlight: false },
                  { label: "Taux conversion appel → réservation", value: "40%", highlight: false },
                  { label: "Réservations supplémentaires/mois", value: "+48", highlight: false },
                  { label: "Panier moyen", value: price(65), highlight: false },
                  { label: "Revenu additionnel/mois", value: "+" + price(936), highlight: true },
                  { label: "ROI annuel", value: "+525%", highlight: true },
                ].map((row, i) => (
                  <div key={i} className={`flex items-center justify-between border-b border-surface-glass-border px-6 py-4 ${row.highlight ? "bg-primary/5" : ""}`}>
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className={`font-bold ${row.highlight ? "text-primary" : "text-foreground"}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4">
                <p className="text-center text-xs text-muted-foreground">💡 Rentabilité dès le 2ème mois. Sur 12 mois : +{price(11232)} de revenu pour {price(1799)} investis.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY US */}
      <WhyUsSection
        gradient={GRADIENT}
        title="Nos garanties Google Maps"
        subtitle="Des engagements concrets, pas des promesses vagues."
        items={[
          { icon: <Shield className="h-6 w-6 text-foreground" />, title: "Top 5 ou Remboursé", description: "Pas dans le Top 5 après 6 mois ? Remboursement 50% (hors secteurs impossibles)." },
          { icon: <TrendingUp className="h-6 w-6 text-foreground" />, title: "ROI +525%", description: "ROI moyen calculé sur les appels et visites réellement générés via Google Maps." },
          { icon: <Phone className="h-6 w-6 text-foreground" />, title: "Sans Engagement", description: "Résiliable à tout moment après les 6 premiers mois. Pas de pénalité." },
          { icon: <Users className="h-6 w-6 text-foreground" />, title: "Support Dédié", description: "Call mensuel + réponse aux avis clients inclus. Vous n'avez rien à gérer." },
        ]}
      />

      {/* PROOF */}
      <ProofResults
        gradient={GRADIENT}
        title="Résultats Google Maps vérifiés"
        subtitle="Performance moyenne sur nos clients en référencement local."
        stats={[
          { value: 525, suffix: "%", label: "ROI moyen" },
          { value: 200, suffix: "+", label: "Entreprises accompagnées" },
          { value: 120, suffix: "", label: "Appels/mois générés (moy.)" },
          { value: 92, suffix: "%", label: "Top 3 atteint en 6 mois" },
        ]}
      />

      {/* PRICING */}
      <ServicePricing
        gradient={GRADIENT}
        title="Tarification transparente"
        subtitle="Prix basé sur votre ville et votre secteur. Devis exact gratuit en 24h."
        tiers={[
          {
            name: "Ville Petite",
            price: 999,
            period: "an",
            features: [
              { text: "Villes < 50 000 habitants", included: true },
              { text: "Optimisation complète fiche Google", included: true },
              { text: "Stratégie d'acquisition d'avis", included: true },
              { text: "50+ citations locales", included: true },
              { text: "Monitoring quotidien", included: true },
              { text: "Contenu géo-localisé premium", included: false },
            ],
          },
          {
            name: "Ville Moyenne",
            price: 1299,
            period: "an",
            popular: true,
            features: [
              { text: "Villes 50-200 000 habitants", included: true },
              { text: "Optimisation complète fiche Google", included: true },
              { text: "Stratégie d'acquisition d'avis", included: true },
              { text: "50+ citations locales", included: true },
              { text: "Monitoring quotidien", included: true },
              { text: "Contenu géo-localisé (4 articles/mois)", included: true },
            ],
          },
          {
            name: "Grande Ville",
            price: 1899,
            period: "an",
            features: [
              { text: "Paris, Lyon, Marseille, grandes villes", included: true },
              { text: "Optimisation premium fiche Google", included: true },
              { text: "Stratégie d'avis intensive", included: true },
              { text: "100+ citations locales", included: true },
              { text: "Monitoring temps réel", included: true },
              { text: "Contenu géo-localisé premium (8 articles/mois)", included: true },
            ],
          },
        ]}
      />

      {/* UPSELLS */}
      <UpsellSection
        gradient={GRADIENT}
        title="Amplifiez votre domination locale"
        subtitle="Le Top 3 Google Maps est encore plus puissant combiné avec d'autres services."
        items={[
          { icon: "🔍", title: "SEO Armada", description: "Dominez aussi les résultats organiques pour un monopole total sur Google.", price: 199, period: "mois", link: "/services/seo" },
          { icon: "💻", title: "Site Web Performance", description: "Un site professionnel convertit 3x mieux les visiteurs Google Maps.", price: 799, link: "/services/web-design" },
          { icon: "🤖", title: "Chatbot IA", description: "Qualifiez automatiquement les leads générés par Google Maps 24/7.", price: 399, link: "/services/ai-automation" },
        ]}
      />

      {/* CTA FINAL */}
      <section className="section-padding relative overflow-hidden">
        <div className={`glow-orb left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br ${GRADIENT}`} style={{ opacity: 0.1 }} />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">{t("cta.subtitle")}</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/contact" className="btn-primary-glow gap-2 text-lg">{t("cta.button")} <ArrowRight className="h-5 w-5" /></Link>
              <Link to="/pricing" className="btn-ghost-glow">{t("cta.buttonSecondary")}</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
