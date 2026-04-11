import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const serviceLinks = [
  { path: "/services/web-design", key: "services.webDesign.name" },
  { path: "/services/seo", key: "services.seo.name" },
  { path: "/services/google-maps", key: "services.maps.name" },
  { path: "/services/branding", key: "services.branding.name" },
  { path: "/services/ai-automation", key: "services.ai.name" },
];

export default function Header() {
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/portfolio", label: t("nav.portfolio") || "Portfolio" },
    { path: "/contact", label: t("nav.contact") || "Contact" },
  ];

  const isDarkBg = location.pathname === "/" && !scrolled;
  const logoText = isDarkBg ? "text-white" : "text-foreground";
  const logoMuted = isDarkBg ? "text-gray-300" : "text-muted-foreground";
  const navText = isDarkBg ? "text-gray-200 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:bg-primary/10 hover:text-primary";
  const iconColor = isDarkBg ? "text-white hover:bg-white/10" : "text-foreground hover:bg-primary/10";

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${scrolled
          ? "border-b border-surface-glass-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
          }`}
      >
        <div className="container-custom flex h-16 items-center justify-between px-6 md:h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-1">
            <span className={`text-xl font-extrabold tracking-tight transition-colors group-hover:text-primary md:text-2xl ${logoText}`}>
              XR
            </span>
            <span className={`text-xl font-light tracking-tight transition-colors md:text-2xl ${logoMuted}`}>
              AGENCY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${location.pathname.startsWith("/services") ? (isDarkBg ? "text-white" : "text-primary") : navText
                  }`}
              >
                {t("nav.solutions")}
                <ChevronDown className="h-3 w-3" />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl border border-surface-glass-border bg-card/95 shadow-2xl backdrop-blur-xl"
                  >
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.path}
                        to={s.path}
                        className="flex items-center gap-3 px-5 py-3.5 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        {t(s.key)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${location.pathname === link.path ? (isDarkBg ? "text-white" : "text-primary") : navText
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSelector isDarkBg={isDarkBg} />
            <Link
              to="/contact"
              className="hidden btn-primary-glow px-5 py-2.5 text-sm md:inline-flex"
            >
              {t("nav.createProject") || "Create my project"}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className={`rounded-lg p-2 transition-colors lg:hidden ${iconColor}`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="text-xl font-extrabold text-foreground">
                XR<span className="font-light text-muted-foreground">AGENCY</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col px-6 pt-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="pb-2 pt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t("nav.solutions")}
                </p>
                {serviceLinks.map((s) => (
                  <Link
                    key={s.path}
                    to={s.path}
                    className="block py-3 text-base text-secondary-foreground transition-colors hover:text-primary"
                  >
                    {t(s.key)}
                  </Link>
                ))}
              </motion.div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="block border-b border-border py-4 text-lg font-medium text-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="pb-2 pt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t("nav.solutions")}
                </p>
                {serviceLinks.map((s) => (
                  <Link
                    key={s.path}
                    to={s.path}
                    className="block py-3 text-base text-secondary-foreground transition-colors hover:text-primary"
                  >
                    {t(s.key)}
                  </Link>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-8"
              >
                <Link
                  to="/contact"
                  className="btn-primary-glow w-full text-center"
                >
                  {t("nav.createProject") || "Create my project"}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
