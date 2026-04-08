import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const serviceLinks = [
    { path: "/services/web-design", label: t("services.webDesign.name") },
    { path: "/services/seo", label: t("services.seo.name") },
    { path: "/services/google-maps", label: t("services.maps.name") },
    { path: "/services/branding", label: t("services.branding.name") },
    { path: "/services/ai-automation", label: t("services.ai.name") },
  ];

  const companyLinks = [
    { path: "/about", label: t("nav.about") },
    { path: "/references", label: t("nav.references") },
    { path: "/webcare", label: t("nav.webcare") },
    { path: "/pricing", label: t("nav.pricing") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="relative border-t border-border bg-card">
      {/* Glow */}
      <div className="glow-orb -top-40 left-1/4 h-80 w-80 bg-glow-blue" />

      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-extrabold text-foreground">XR</span>
              <span className="text-2xl font-light text-muted-foreground">AGENCY</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("footer.slogan")}
            </p>
            <p className="text-xs font-medium text-primary">
              🌍 {t("footer.locations")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              {t("footer.services")}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-muted-foreground">{t("footer.privacy")}</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">{t("footer.terms")}</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">{t("footer.mentions")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} XRAGENCY. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            {["LinkedIn", "Instagram", "X"].map((s) => (
              <span
                key={s}
                className="text-xs text-muted-foreground transition-colors hover:text-primary cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
