import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Language, languageFlags, languageNames } from "@/lib/translations";
import { ChevronDown } from "lucide-react";

export function LanguageSelector({ isDarkBg = false }: { isDarkBg?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages: Language[] = ["fr", "en", "es", "vn", "ru", "ar"];

  const buttonClasses = isDarkBg
    ? "border-white/30 text-white hover:bg-white/10"
    : "border-surface-glass-border text-foreground hover:border-black/20 hover:bg-black/5";

  const iconColor = isDarkBg ? "text-white" : "text-muted-foreground";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-300 ${buttonClasses}`}
      >
        <span>{languageFlags[lang]}</span>
        <span className="hidden sm:inline">{lang.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 ${iconColor}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-surface-glass-border bg-card/95 shadow-2xl backdrop-blur-xl">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-primary/10 ${lang === l ? "bg-primary/5 text-primary" : "text-foreground"}`}
              >
                <span>{languageFlags[l]}</span>
                <span>{languageNames[l]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
