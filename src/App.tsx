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
import WebCare from "@/pages/WebCare";
import References from "@/pages/References";
import WebDesign from "@/pages/services/WebDesign";
import SEO from "@/pages/services/SEO";
import Branding from "@/pages/services/Branding";
import AIAutomation from "@/pages/services/AIAutomation";
import GoogleMaps from "@/pages/services/GoogleMaps";
import ChatBot from "@/components/common/ChatBot";
import NotFound from "@/pages/NotFound";

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
              <Route path="/services/web-design" element={<WebDesign />} />
              <Route path="/services/seo" element={<SEO />} />
              <Route path="/services/branding" element={<Branding />} />
              <Route path="/services/ai-automation" element={<AIAutomation />} />
              <Route path="/services/google-maps" element={<GoogleMaps />} />
              <Route path="/webcare" element={<WebCare />} />
              <Route path="/references" element={<References />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
