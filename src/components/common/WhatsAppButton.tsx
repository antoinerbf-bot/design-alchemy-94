import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "33600000000";
const DEFAULT_MESSAGE = "Je veux plus de clients";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-shadow hover:shadow-xl"
      style={{
        background: "linear-gradient(135deg, #25d366, #128c7e)",
      }}
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" fill="white" />
      {/* Pulse ring */}
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" style={{ animationDuration: "3s" }} />
    </motion.a>
  );
}
