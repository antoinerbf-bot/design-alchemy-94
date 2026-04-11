import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const projects = [
    { id: 1, name: "Aura Luxury", industry: "Hotel & Spa", image: "" },
    { id: 2, name: "Neon Tech", industry: "SaaS", image: "" },
    { id: 3, name: "Culinary Flow", industry: "Restaurant", image: "" },
    { id: 4, name: "Vogue Store", industry: "E-Commerce", image: "" },
    { id: 5, name: "Elite Health", industry: "Medical", image: "" },
    { id: 6, name: "Urban Build", industry: "Real Estate", image: "" },
];

export default function Portfolio() {
    const { t } = useLanguage();

    return (
        <>
            <section className="relative overflow-hidden pt-20">
                <div className="glow-orb -right-32 top-20 h-96 w-96 animate-pulse-glow bg-glow-blue" />
                <div className="container-custom relative z-10 px-6 py-24 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="mb-6 text-4xl font-extrabold text-foreground sm:text-6xl">
                            {t("nav.portfolio") || "Our Portfolio"}
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            A selection of our finest digital experiences. Premium, high-converting platforms built to dominate.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding pt-0">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {projects.map((project) => (
                            <motion.div key={project.id} variants={fadeUp}>
                                <Link to="/contact" className="group block h-full">
                                    <div className="glass-card-hover relative h-full overflow-hidden p-3">
                                        <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
                                            <div className="absolute inset-0 z-10 bg-black/20 transition-opacity group-hover:opacity-0" />
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 transition-transform duration-700 group-hover:scale-105" />
                                            )}
                                            <div className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                                                <ArrowUpRight className="h-5 w-5 text-white" />
                                            </div>
                                        </div>

                                        <div className="px-3 pb-3">
                                            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                                                {project.industry}
                                            </p>
                                            <h3 className="text-xl font-bold text-foreground">
                                                {project.name}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA at end of portfolio */}
                    <div className="mt-20 text-center">
                        <Link to="/contact" className="btn-primary-glow gap-2">
                            {t("cta.button") || "Start your project"}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
