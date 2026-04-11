import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Lenis from "lenis";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import FloatingChatbot from "@/components/ui/FloatingChatbot";

export default function Layout() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <FloatingChatbot />
    </div>
  );
}
