import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyB2emZbmeyGWvpTGJ3BfMz_8HgacDecjec";
const genAI = new GoogleGenerativeAI(API_KEY);

const systemInstruction = `You are XR Assistant, the official AI chatbot for XRAGENCY, a premium digital innovation agency.
Your ONLY purpose is to answer questions related to our agency, our services, digital marketing, web development, SEO, and AI automation.
Our core services are:
1. Web Design (Premium high-converting websites, e-commerce)
2. SEO Armada (Dominating Google ranking, sustainable organic traffic)
3. Branding (Logos, visual identity, brand books)
4. AI & Automation (Smart chatbots, CRM integrations, process automation)
5. Google Maps (Local SEO domination, getting into the Top 3 Local Pack)

Pricing rule: 
- Don't give exact prices unless asked. If they want to buy multiple services, mention our Pack System (2 services = -10%, 3 = -15%, 4+ = -20%). 
- Encourage them to try the Smart Configurator on the homepage or reach out via WhatsApp.

CRITICAL RULE: DO NOT answer questions outside the scope of web development, marketing, XRAGENCY, or AI. If asked about unrelated things (like recipes, general knowledge, history, unrelated code), reply politely that you are only here to help with XRAGENCY's digital services.
Keep your answers brief, professional, and luxurious. Reply in the language the user speaks to you in.`;

interface ChatMessage {
    role: "user" | "model";
    text: string;
}

export default function FloatingChatbot() {
    const { lang, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const initialGreeting = {
        fr: "Bonjour ! Je suis l'assistant IA de XRAGENCY. Posez-moi vos questions sur nos services web, SEO ou automatisation.",
        en: "Hello! I am the XRAGENCY AI Assistant. Ask me anything about our web, SEO, or automation services.",
        vn: "Xin chào! Tôi là Trợ lý AI của XRAGENCY. Hãy hỏi tôi về các dịch vụ web, SEO hoặc tự động hóa của chúng tôi.",
        es: "¡Hola! Soy el asistente de IA de XRAGENCY. Pregúntame sobre nuestros servicios web, SEO o de automatización.",
        ru: "Здравствуйте! Я ИИ-ассистент XRAGENCY. Спрашивайте меня о наших веб-сервисах, SEO или автоматизации.",
        ar: "مرحباً! أنا مساعد الذكاء الاصطناعي لـ XRAGENCY. اسألني عن خدمات الويب ومحركات البحث والأتمتة."
    };

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ role: "model", text: initialGreeting[lang as keyof typeof initialGreeting] || initialGreeting.en }]);
        }
    }, [lang, messages.length]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", text: userText }]);
        setIsLoading(true);

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                systemInstruction: systemInstruction,
            });

            // Prepare history format for Gemini, omitting the initial model greeting
            const history = messages.slice(1).map((m) => ({
                role: m.role,
                parts: [{ text: m.text }],
            }));

            const chat = model.startChat({ history });
            const result = await chat.sendMessage(userText);
            const responseText = result.response.text();

            setMessages((prev) => [...prev, { role: "model", text: responseText }]);
        } catch (error: any) {
            console.error("Gemini AI Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "model", text: "Error: " + (error?.message || "Unknown error occurred.") },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all hover:scale-110 md:bottom-8 md:left-8 ${isOpen ? "hidden" : "flex"
                    }`}
            >
                <MessageSquare className="h-6 w-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 left-6 z-[110] flex h-[500px] w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-surface-glass-border bg-card shadow-2xl md:bottom-8 md:left-8"
                    >
                        {/* Header */}
                        <div className="flex shrink-0 items-center justify-between bg-primary p-4 text-primary-foreground">
                            <div className="flex items-center gap-2">
                                <Bot className="h-5 w-5" />
                                <div>
                                    <span className="block font-semibold leading-none">XR Assistant</span>
                                    <span className="text-xs text-primary-foreground/80">Powered by Gemini AI</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-secondary text-foreground" : "bg-primary/20 text-primary"}`}>
                                        {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-secondary text-foreground rounded-tl-none border border-border"}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-2 flex-row">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="flex items-center justify-center rounded-xl rounded-tl-none border border-border bg-secondary px-4 py-3 text-sm">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="shrink-0 border-t border-border bg-card p-3">
                            <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={
                                        lang === "fr" ? "Écrivez votre message..." :
                                            lang === "vn" ? "Nhập tin nhắn..." :
                                                "Type your message..."
                                    }
                                    className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
