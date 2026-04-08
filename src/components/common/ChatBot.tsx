import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatBot() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "bot", content: t("chatbot.welcome") }]);
    }
  }, [open, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const quickReplies: string[] = (t("chatbot.quickReplies") as any) || [];

  const getResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    const responses: Record<string, string> = t("chatbot.responses") as any;
    if (lower.includes("prix") || lower.includes("price") || lower.includes("tarif") || lower.includes("سعر") || lower.includes("цена") || lower.includes("precio") || lower.includes("giá"))
      return responses.pricing;
    if (lower.includes("seo") || lower.includes("google") || lower.includes("search"))
      return responses.seo;
    if (lower.includes("web") || lower.includes("site") || lower.includes("design") || lower.includes("موقع") || lower.includes("сайт") || lower.includes("trang"))
      return responses.web;
    if (lower.includes("ia") || lower.includes("ai") || lower.includes("bot") || lower.includes("automat") || lower.includes("ذكاء") || lower.includes("ИИ"))
      return responses.ai;
    if (lower.includes("brand") || lower.includes("logo") || lower.includes("marque") || lower.includes("شعار") || lower.includes("бренд") || lower.includes("thương hiệu"))
      return responses.branding;
    if (lower.includes("map") || lower.includes("local") || lower.includes("خرائط") || lower.includes("карт") || lower.includes("bản đồ"))
      return responses.maps;
    return responses.default;
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: getResponse(text) }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all"
        style={{ background: "var(--gradient-primary)" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageCircle className="h-6 w-6 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-surface-glass-border shadow-2xl"
            style={{ background: "hsl(240 8% 6% / 0.97)", backdropFilter: "blur(20px)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-5 py-4" style={{ background: "var(--gradient-primary)" }}>
              <Bot className="h-6 w-6 text-primary-foreground" />
              <div>
                <p className="text-sm font-bold text-primary-foreground">{t("chatbot.title")}</p>
                <p className="text-xs text-primary-foreground/70">{t("chatbot.subtitle")}</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-primary" : "bg-accent"}`}>
                      {msg.role === "user" ? <User className="h-3.5 w-3.5 text-primary-foreground" /> : <Bot className="h-3.5 w-3.5 text-accent-foreground" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent">
                    <Bot className="h-3.5 w-3.5 text-accent-foreground" />
                  </div>
                  <div className="rounded-2xl bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.div key={d} className="h-2 w-2 rounded-full bg-muted-foreground/50" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.15 }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
                {quickReplies.map((q, i) => (
                  <button key={i} onClick={() => send(q)} className="rounded-full border border-surface-glass-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-border px-4 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chatbot.placeholder")}
                className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button type="submit" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:opacity-90">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
