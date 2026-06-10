import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Calculate if open at current local time
    // Lunedi closed, Tuesday-Sunday 12:00-15:00 and 19:00-23:30
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday...
      if (day === 1) {
        setIsOpenNow(false);
        return;
      }
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeVal = hours * 60 + minutes;

      const isLunch = timeVal >= 12 * 60 && timeVal <= 15 * 60;
      const isDinner = timeVal >= 19 * 60 && timeVal <= 23.5 * 60;
      setIsOpenNow(isLunch || isDinner);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Chi Siamo', href: '#chi-siamo' },
    { name: 'Contatti', href: '#contatti' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-brand-dark/95 backdrop-blur-md border-b border-white/5 py-4 shadow-lg'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* LEFT: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-12 text-[11px] uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="font-sans text-[11px] tracking-[0.2em] text-brand-offwhite/80 hover:text-white uppercase transition-colors duration-300 relative py-1 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* LEFT: Mobile Logo brand */}
          <div className="flex flex-col items-start cursor-pointer md:hidden" onClick={() => handleLinkClick('#home')}>
            <span className="font-serif text-2xl font-light tracking-[0.2em] text-white">
              KOMÌ
            </span>
            <span className="font-mono text-[8px] text-brand-gold tracking-[0.3em] uppercase -mt-0.5">
              CREMONA
            </span>
          </div>

          {/* CENTER: Desktop Brand Logo */}
          <div 
            className="hidden md:flex flex-col items-center cursor-pointer text-center absolute left-1/2 transform -translate-x-1/2" 
            onClick={() => handleLinkClick('#home')}
          >
            <span className="font-serif text-3xl tracking-[0.3em] font-light text-white transition-opacity hover:opacity-90">
              KOMÌ
            </span>
            <span className="font-mono text-[9px] tracking-[0.5em] mt-1 text-brand-gold uppercase">
              CREMONA
            </span>
          </div>

          {/* RIGHT: Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Open Close Badge */}
            <div className="flex items-center space-x-2 bg-brand-coal border border-white/5 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.2em] font-mono">
              <span className={`h-2.5 w-2.5 rounded-full ${isOpenNow ? 'bg-emerald-600 animate-pulse' : 'bg-brand-red'}`} />
              <span className={isOpenNow ? 'text-emerald-400' : 'text-brand-gold/75'}>
                {isOpenNow ? 'Aperto' : 'Chiuso'}
              </span>
            </div>

            {/* Main Reservation CTA - Lacquer Red */}
            <button
              onClick={onOpenBooking}
              className="bg-brand-red hover:bg-[#8B1717] text-white font-sans text-[11px] font-semibold tracking-[0.2em] uppercase py-3 px-8 rounded-none transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-white/80" />
              Prenota
            </button>
          </div>

          {/* Mobile Menu Trigger & Mini CTA */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={onOpenBooking}
              className="bg-brand-red text-white py-2 px-4 text-[10px] tracking-[0.2em] font-bold uppercase rounded-none cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              Prenota
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-offwhite hover:text-brand-gold focus:outline-none cursor-pointer p-1"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] bg-brand-dark/98 backdrop-blur-xl z-40 border-b border-white/5 md:hidden flex flex-col px-6 py-8 space-y-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left font-serif text-lg tracking-wider text-brand-offwhite hover:text-brand-gold py-2 border-b border-white/5 uppercase transition-colors"
                >
                  <span className="font-mono text-brand-gold/40 text-[11px] mr-3">0{idx + 1}</span>
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-4 flex flex-col space-y-4">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className={`h-2 w-2 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-brand-red'}`} />
                <span className={isOpenNow ? 'text-emerald-400' : 'text-brand-gold/80'}>
                  {isOpenNow ? 'Siamo aperti per cena/pranzo' : 'Locale Chiuso al momento'}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-brand-red hover:bg-[#8B1717] text-white py-3 text-xs tracking-widest font-semibold uppercase rounded-none text-center shadow-lg cursor-pointer"
              >
                Prenota un Tavolo
              </button>
              <a
                href="tel:3889967668"
                className="w-full border border-white/5 hover:border-brand-gold text-brand-gold py-3 text-xs tracking-widest font-semibold uppercase rounded-none text-center flex justify-center items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Chiama Ristorante
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
