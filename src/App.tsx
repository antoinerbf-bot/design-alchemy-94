import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Pricing from "@/pages/Pricing";
import WebDesign from "@/pages/services/WebDesign";
import SEO from "@/pages/services/SEO";
import Branding from "@/pages/services/Branding";
import AIAutomation from "@/pages/services/AIAutomation";
import GoogleMaps from "@/pages/services/GoogleMaps";
import NotFound from "@/pages/NotFound";
import Portfolio from "@/pages/Portfolio";
import LocationPage from "@/pages/LocationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services/web-design" element={<WebDesign />} />
              <Route path="/services/seo" element={<SEO />} />
              <Route path="/services/branding" element={<Branding />} />
              <Route path="/services/ai-automation" element={<AIAutomation />} />
              <Route path="/services/google-maps" element={<GoogleMaps />} />
              <Route path="/location/:service/:city" element={<LocationPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
