import React from 'react';
import { Instagram, Facebook, ArrowUp, Flame, ShieldAlert, Heart, Calendar } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-brand-offwhite border-t border-white/5 py-16 relative z-10">
      
      {/* Scroll to Top Trigger floating on edge */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToTop}
          className="bg-brand-red hover:bg-[#8B1717] text-white p-3 rounded-none shadow-2xl transition-all hover:-translate-y-1 hover:scale-105 cursor-pointer border border-brand-red"
          title="Torna all'inizio"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          
          {/* Column 1: Brand Info Block */}
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <span className="font-serif text-2xl font-bold tracking-widest text-brand-offwhite">
                KOMI <span className="text-brand-gold font-light">古美</span>
              </span>
              <span className="font-mono text-[9px] text-brand-gold/80 tracking-[0.25em] uppercase -mt-1">
                Sushi Artigianale
              </span>
            </div>
            <p className="text-xs text-brand-offwhite/60 leading-relaxed font-light">
              Un omaggio rassicurante all'eleganza ed al silenzio cerimoniale giapponese. Materie prime genuine, lavorate a mano dal nostro chef nel centro di Cremona.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-light">Navigazione</h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-brand-offwhite/70">
              <a href="#home" className="hover:text-brand-gold transition-colors font-light">Home</a>
              <a href="#menu" className="hover:text-brand-gold transition-colors font-light">Il Nostro Menu</a>
              <a href="#chi-siamo" className="hover:text-brand-gold transition-colors font-light">La Filosofia</a>
              <a href="#recensioni" className="hover:text-brand-gold transition-colors font-light">Le vostre Opinioni</a>
              <a href="#contatti" className="hover:text-brand-gold transition-colors font-light">Contatti & Mappa</a>
            </div>
          </div>

          {/* Column 3: Contact & Booking details quick links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-light">Contatti Rapidi</h4>
            <div className="space-y-3 text-xs text-brand-offwhite/70 font-light">
              <p>Via Francesco Novati, 2<br />26100 Cremona CR</p>
              <p className="font-mono text-brand-gold">Tel: 388 996 7668</p>
              <button
                onClick={onOpenBooking}
                className="text-brand-gold hover:underline uppercase text-[10px] tracking-widest font-mono font-medium flex items-center gap-1.5 cursor-pointer pt-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Modulo Prenotazioni →</span>
              </button>
            </div>
          </div>

          {/* Column 4: Allergencies & Instagram Focus */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-light">Social Network</h4>
              <p className="text-[11px] text-[#E4E4E4]/50 leading-relaxed font-light">
                Per restare sempre aggiornati sui nuovi arrivi di pesce crudo e sfilettati speciali seguici su Instagram.
              </p>
            </div>
            
            {/* Social Buttons */}
            <div className="flex items-center space-x-3.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-coal hover:bg-brand-red border border-white/5 hover:border-brand-red text-[#E4E4E4]/60 hover:text-white transition-all duration-300 rounded-none cursor-pointer"
                aria-label="Seguici su Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-coal hover:bg-brand-red border border-white/5 hover:border-brand-red text-[#E4E4E4]/60 hover:text-white transition-all duration-300 rounded-none cursor-pointer"
                aria-label="Seguici su Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright notice & Credits */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-offwhite/40 font-light gap-4">
          <p className="text-center md:text-left">
            © {currentYear} Komi Sushi Cremona. Tutti i diritti riservati. P.IVA 01234567890.
          </p>
          <div className="flex items-center space-x-4 flex-wrap justify-center font-mono text-[9px] uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-brand-gold" />
              <span>Cucina Sanificata HACCP</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-brand-red animate-pulse" />
              <span>Abbattimento Rapido a -20°C</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
