import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Sparkles, Check, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import Custom Modular Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import BookingSection from './components/BookingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [notification, setNotification] = useState<string | null>(null);

  // SEO Optimization & HTML header injects on load
  useEffect(() => {
    // 1. Title tag setup: "[Nome Ristorante] — Sushi a [Città]"
    document.title = "Komi — Sushi Artigianale a Cremona | Esperienza Omakase";

    // 2. Meta description setup
    const updateOrCreateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateOrCreateMeta(
      "description", 
      "Sito ufficiale di Komi Sushi Cremona. Autentica cucina giapponese, nigiri artigianali sfilettati a mano e pregiato sashimi. Prenota ora il tuo tavolo in Via F. Novati 2."
    );
    updateOrCreateMeta("keywords", "Komi, Komi Sushi, Sushi Cremona, Ristorante Giapponese Cremona, Sashimi Cremona, Omakase, Prenotazioni Komi");
    updateOrCreateMeta("author", "Komi Sushi Cremona");

    // Clear notification helper after timeout
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Helper trigger to scroll smoothly to bookings
  const scrollBookingToView = () => {
    const section = document.querySelector('#prenotazioni');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper trigger to scroll smoothly to menu
  const scrollMenuToView = () => {
    const section = document.querySelector('#menu');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowNotification = (message: string) => {
    setNotification(message);
  };

  return (
    <div className="bg-brand-dark text-brand-offwhite min-h-screen relative overflow-x-hidden selection:bg-brand-red selection:text-white">
      
      {/* 1. Header Navigation Bar */}
      <Navbar onOpenBooking={scrollBookingToView} />

      {/* 2. Panoramic Hero banner */}
      <Hero 
        onOpenBooking={scrollBookingToView} 
        onExploreMenu={scrollMenuToView} 
      />

      {/* 3. Interactive Filterable Restaurant Menu */}
      <MenuSection onOpenBooking={scrollBookingToView} />

      {/* 4. Philosophy & History (Chi Siamo) */}
      <AboutSection />

      {/* 5. Real Testimonials & Aggregate ratings (Recensioni) */}
      <ReviewsSection />

      {/* 6. Dynamic Booking Form Engine with local list */}
      <BookingSection onSuccessNotification={handleShowNotification} />

      {/* 7. Contact Details, Coordinates & Interactive Map (Contatti) */}
      <ContactSection />

      {/* 8. Elegant Footer */}
      <Footer onOpenBooking={scrollBookingToView} />

      {/* Floating Action elements: Mobile quick call bar */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden flex flex-col gap-3">
        <a
          href="tel:3889967668"
          className="bg-brand-red text-white p-4 shadow-2xl rounded-full border border-white/10 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          title="Chiamata rapida"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Rich Success/Alert notification banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-brand-coal border border-brand-gold px-6 py-4 shadow-2xl flex items-center gap-3.5 max-w-md w-[90%] rounded-none"
          >
            <div className="h-8 w-8 bg-brand-gold/10 border border-brand-gold text-brand-gold rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-grow text-left">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold/60 block font-semibold leading-none">NOTIFICA KOMI</span>
              <p className="text-xs text-brand-offwhite/95 mt-1 leading-snug">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
