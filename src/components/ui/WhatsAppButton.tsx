import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatsAppButton() {
    const { t, lang } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Use the requested message or translated based on language
    const getMessage = () => {
        switch (lang) {
            case "fr":
                return "Bonjour, j'aimerais développer mon entreprise avec une solution sur mesure.";
            case "es":
                return "Hola, me gustaría hacer crecer mi negocio con una solución a medida.";
            case "vn":
                return "Xin chào, tôi muốn phát triển doanh nghiệp của mình với một giải pháp tùy chỉnh.";
            case "ru":
                return "Здравствуйте, я хотел бы развивать свой бизнес с помощью индивидуального решения.";
            case "ar":
                return "مرحباً، أود تنمية عملي بحل مخصص.";
            case "en":
            default:
                return "Hello, I would like to grow my business with a tailored solution.";
        }
    };

    const whatsappLink = `https://wa.me/33600000000?text=${encodeURIComponent(getMessage())}`;

    return (
        <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
                y: isVisible ? 0 : 50,
                pointerEvents: isVisible ? "auto" : "none"
            }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 hover:shadow-2xl md:bottom-8 md:right-8 lg:h-16 lg:w-16"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle className="h-7 w-7 lg:h-8 lg:w-8" />
            <span className="absolute -top-2 -right-2 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500"></span>
            </span>
        </motion.a>
    );
}
