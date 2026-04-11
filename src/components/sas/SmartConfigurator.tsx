import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ArrowLeft, CheckCircle2, Monitor, MapPin, Bot, Search, ShoppingCart, CreditCard, ChevronRight } from "lucide-react";

type ServiceType = "web" | "seo" | "ai" | "maps" | "branding";

interface ServiceData {
    id: ServiceType;
    name: string;
    price: number;
}

const availableServices: Record<ServiceType, ServiceData> = {
    web: { id: "web", name: "Création Site Web", price: 799 },
    seo: { id: "seo", name: "SEO Armada", price: 349 },
    ai: { id: "ai", name: "IA & Automation", price: 399 },
    maps: { id: "maps", name: "Google Maps Max", price: 999 },
    branding: { id: "branding", name: "Branding Elite", price: 499 },
};

export default function SmartConfigurator() {
    const { t, price: formatPrice } = useLanguage();

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [cart, setCart] = useState<ServiceType[]>([]);
    const [showCart, setShowCart] = useState(false);

    // Logic mapping answers to services
    const mapAnswersToServices = () => {
        const recommended: ServiceType[] = [];

        // Step 1: Website type
        if (answers[0] === "basic" || answers[0] === "advanced" || answers[0] === "ecommerce") {
            recommended.push("web");
            if (answers[0] === "ecommerce" || answers[0] === "advanced") recommended.push("branding");
        }

        // Step 2: Business type mapped to needs
        if (answers[1] === "local") {
            recommended.push("maps");
        }

        // Step 3: Goals
        if (answers[2] === "visibility") recommended.push("seo");
        if (answers[2] === "traffic") recommended.push("seo");
        if (answers[2] === "automation") recommended.push("ai");

        // Remove duplicates
        return Array.from(new Set(recommended));
    };

    const handleNext = () => {
        if (step < 2) {
            setStep(prev => prev + 1);
        } else {
            const recommended = mapAnswersToServices();
            setCart(recommended);
            setShowCart(true);
        }
    };

    const calculateTotal = (items: ServiceType[]) => {
        const rawTotal = items.reduce((acc, curr) => acc + availableServices[curr].price, 0);
        let discount = 0;

        if (items.length === 2) discount = 0.10;
        if (items.length === 3) discount = 0.15;
        if (items.length >= 4) discount = 0.20;

        const finalAmount = rawTotal * (1 - discount);
        return { rawTotal, discount, finalAmount };
    };

    const handleStripeCheckout = async () => {
        try {
            const response = await fetch("https://xrserver.netlify.app/api/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "XRAGENCY Custom Package",
                    amount: Math.round(finalAmount * 100)
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "Server returned " + response.status);
            }
            const session = await response.json();

            // Use direct url redirect instead of deprecated redirectToCheckout
            if (session.url) {
                window.location.href = session.url;
            } else {
                throw new Error("No session URL returned from backend");
            }
        } catch (e: any) {
            console.error(e);
            alert("Error: " + (e.message || "Failed to connect to backend"));
        }
    };

    const { rawTotal, discount, finalAmount } = useMemo(() => calculateTotal(cart), [cart]);

    const toggleService = (id: ServiceType) => {
        setCart(prev =>
            prev.includes(id)
                ? prev.filter(serviceId => serviceId !== id)
                : [...prev, id]
        );
    };

    const quizSteps = [
        {
            question: "What type of website do you need?",
            options: [
                { id: "basic", label: "Showcase / Basic", icon: <Monitor className="mb-2 h-6 w-6" /> },
                { id: "advanced", label: "Advanced / Custom", icon: <CheckCircle2 className="mb-2 h-6 w-6" /> },
                { id: "ecommerce", label: "E-commerce", icon: <ShoppingCart className="mb-2 h-6 w-6" /> },
            ]
        },
        {
            question: "What is your primary market?",
            options: [
                { id: "local", label: "Local (Restaurant, Artisan)", icon: <MapPin className="mb-2 h-6 w-6" /> },
                { id: "national", label: "National / Digital", icon: <Monitor className="mb-2 h-6 w-6" /> },
            ]
        },
        {
            question: "What is your main goal for the next 3 months?",
            options: [
                { id: "visibility", label: "More visibility", icon: <Search className="mb-2 h-6 w-6" /> },
                { id: "automation", label: "Automate tasks & support", icon: <Bot className="mb-2 h-6 w-6" /> },
                { id: "traffic", label: "More traffic & sales", icon: <ShoppingCart className="mb-2 h-6 w-6" /> },
            ]
        }
    ];

    return (
        <section className="relative overflow-hidden py-24" id="configurator">
            <div className="container-custom relative z-10 max-w-4xl">
                <div className="glass-card overflow-hidden p-8 shadow-2xl">

                    <AnimatePresence mode="wait">
                        {!showCart ? (
                            <motion.div
                                key={`step-${step}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                                    <h3 className="text-2xl font-bold">Smart Configurator</h3>
                                    <span className="text-sm font-medium text-muted-foreground">Step {step + 1} of 3</span>
                                </div>

                                <h4 className="mb-6 text-xl">{quizSteps[step].question}</h4>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {quizSteps[step].options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setAnswers(prev => ({ ...prev, [step]: option.id }))}
                                            className={`flex flex-col items-center rounded-xl border p-6 text-center transition-all ${answers[step] === option.id
                                                ? "border-primary bg-primary/10"
                                                : "border-white/10 hover:border-white/30"
                                                }`}
                                        >
                                            {option.icon}
                                            <span className="font-semibold">{option.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <button
                                        disabled={step === 0}
                                        onClick={() => setStep(prev => prev - 1)}
                                        className="flex items-center gap-2 text-muted-foreground disabled:opacity-50"
                                    >
                                        <ArrowLeft className="h-4 w-4" /> Back
                                    </button>
                                    <button
                                        disabled={!answers[step]}
                                        onClick={handleNext}
                                        className="btn-primary-glow flex items-center gap-2"
                                    >
                                        {step === 2 ? "Generate my plan" : "Next step"} <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="cart"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <h3 className="mb-2 text-3xl font-bold">Your Tailored Solution</h3>
                                <p className="mb-8 text-muted-foreground">
                                    A website alone is not enough. Adding visibility increases results. Here is your optimized pack.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-lg">Recommended Services</h4>
                                        {Object.values(availableServices).map((service) => {
                                            const isSelected = cart.includes(service.id);
                                            return (
                                                <div
                                                    key={service.id}
                                                    onClick={() => toggleService(service.id)}
                                                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${isSelected ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${isSelected ? "border-primary bg-primary" : "border-white/30"}`}>
                                                            {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                                                        </div>
                                                        <span className="font-medium">{service.name}</span>
                                                    </div>
                                                    <span>{formatPrice(service.price)}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-black/20 p-6">
                                        <h4 className="mb-6 font-semibold text-lg flex items-center gap-2">
                                            <ShoppingCart className="h-5 w-5" /> Summary
                                        </h4>

                                        <div className="space-y-3 border-b border-white/10 pb-6 mb-6">
                                            {cart.map(id => (
                                                <div key={id} className="flex justify-between text-sm text-foreground/80">
                                                    <span>{availableServices[id].name}</span>
                                                    <span>{formatPrice(availableServices[id].price)}</span>
                                                </div>
                                            ))}
                                            {cart.length === 0 && (
                                                <p className="text-sm text-muted-foreground italic">No services selected.</p>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-muted-foreground">
                                                <span>Subtotal</span>
                                                <span>{formatPrice(rawTotal)}</span>
                                            </div>

                                            {discount > 0 && (
                                                <div className="flex justify-between text-emerald-400">
                                                    <span>Optimization applied (-{discount * 100}%)</span>
                                                    <span>-{formatPrice(rawTotal * discount)}</span>
                                                </div>
                                            )}

                                            <div className="flex justify-between pt-4 text-xl font-bold">
                                                <span>Final Price</span>
                                                <span>{formatPrice(finalAmount)}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleStripeCheckout}
                                            disabled={cart.length === 0}
                                            className="btn-primary-glow mt-8 w-full flex justify-center gap-2 disabled:opacity-50"
                                        >
                                            <CreditCard className="h-5 w-5" /> Pay Securely via Stripe
                                        </button>

                                        <button
                                            onClick={() => { setShowCart(false); setStep(0); setCart([]); setAnswers({}); }}
                                            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-white"
                                        >
                                            Start over
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </section>
    );
}
