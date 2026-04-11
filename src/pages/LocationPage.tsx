import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, MapPin, TrendingUp, Users, Search } from "lucide-react";
import heroBg from "@/assets/hero.mp4"; // Placeholder background

export default function LocationPage() {
    const { service, city } = useParams();
    const { t } = useLanguage();

    // Helper to format city and service names nicely
    const formatText = (text?: string) => {
        if (!text) return "";
        return text.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    };

    const formattedCity = formatText(city);
    const formattedService = formatText(service);

    const title = `${formattedService} ${formattedCity} | Expert Agency`;

    // Dynamic SEO h1
    const h1Text = `${formattedService} at ${formattedCity} - Dominate Your Market`;

    return (
        <>
            <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 bg-background/90 z-0" />
                <img src={heroBg} className="absolute inset-0 z-[-1] object-cover opacity-20" alt="seo background" />
                <div className="glow-orb -left-32 top-20 h-96 w-96 animate-pulse-glow bg-glow-blue" />

                <div className="container-custom relative z-10 px-6 py-24 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">
                            <MapPin className="h-3 w-3" /> Local Market Expert
                        </span>
                        <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl">
                            {h1Text}
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Are you looking for the best {formattedService.toLowerCase()} agency in {formattedCity}?
                            We help local businesses scale aggressively using targeted AI methodologies and premium design.
                        </p>

                        <div className="mt-8 flex justify-center gap-4">
                            <Link to="/contact" className="btn-primary-glow gap-2">
                                Grow in {formattedCity} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="glass-card p-8">
                            <Search className="mx-auto mb-4 h-8 w-8 text-primary" />
                            <h3 className="mb-2 text-xl font-bold">Local Visibility</h3>
                            <p className="text-muted-foreground">Rank #1 in {formattedCity} queries and outperform your local competitors.</p>
                        </div>
                        <div className="glass-card p-8">
                            <Users className="mx-auto mb-4 h-8 w-8 text-primary" />
                            <h3 className="mb-2 text-xl font-bold">More Leads</h3>
                            <p className="text-muted-foreground">Turn {formattedCity} traffic into loyal, paying customers consistently.</p>
                        </div>
                        <div className="glass-card p-8">
                            <TrendingUp className="mx-auto mb-4 h-8 w-8 text-primary" />
                            <h3 className="mb-2 text-xl font-bold">Highest ROI</h3>
                            <p className="text-muted-foreground">Our data-driven approach ensures maximum returns for your investment.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden py-24 text-center">
                <div className="glow-orb left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow bg-glow-purple" />
                <div className="container-custom relative z-10">
                    <h2 className="mb-6 text-3xl font-extrabold text-foreground sm:text-5xl">Capture the {formattedCity} Market Today</h2>
                    <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
                        Don't let your competitors take your customers. It's time to build a digital presence that converts.
                    </p>
                    <Link to="/contact" className="btn-primary-glow mx-auto gap-2">
                        Talk to an Expert <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </section>
        </>
    );
}
