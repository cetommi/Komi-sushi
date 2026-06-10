import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const heroImg = "/src/assets/images/komi_sushi_hero_1781081858564.png";


interface HeroProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
}

export default function Hero({ onOpenBooking, onExploreMenu }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-brand-dark overflow-hidden py-24 md:py-0"
    >
      {/* Background Cinematic Image with dark gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Nigiri di Tonno Komi Sushi Cremona"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scaling-animation opacity-45 md:opacity-55"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-brand-dark/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-dark to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-dark to-transparent" />
      </div>

      {/* Decorative Traditional Japanese Letters in background (Watermarked) */}
      <div className="absolute right-8 md:right-16 top-1/4 z-10 select-none pointer-events-none hidden md:flex flex-col items-center">
        <span className="font-serif text-brand-gold/5 text-8xl tracking-widest leading-none [writing-mode:vertical-rl] select-none">職人精神</span>
      </div>

      <div className="absolute left-8 md:left-16 bottom-1/4 z-10 select-none pointer-events-none hidden lg:flex flex-col items-start">
        <span className="font-serif text-brand-gold/5 text-8xl tracking-widest leading-none [writing-mode:vertical-rl] select-none">新鮮な味</span>
      </div>

      {/* Core Hero Content Container */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full">
        <div className="max-w-2xl text-left space-y-8">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-[1px] bg-brand-gold/60" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-brand-gold uppercase font-medium">
              Authentic Omakase • Cremona
            </span>
          </motion.div>

          {/* Heading Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-brand-offwhite font-light"
            >
              Precisione.<br />
              Freschezza.<br />
              <span className="italic font-light text-brand-gold">Silenzio.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-brand-offwhite/70 font-sans text-sm md:text-base leading-relaxed tracking-wide font-light max-w-sm pt-2"
            >
              Un rituale quotidiano dedicato alla materia prima. Lo Chef Hiroshi seleziona personalmente il pescato per offrire l'essenza del Giappone a Cremona.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8 pt-4"
          >
            <button
              onClick={onOpenBooking}
              className="bg-brand-red hover:bg-[#8B1717] text-white px-8 py-4 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase rounded-none transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-2xl"
            >
              <Calendar className="w-4 h-4 text-white/90" />
              Prenota un Tavolo
            </button>
            <button
              onClick={onExploreMenu}
              className="border-b border-brand-gold py-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-white hover:text-brand-gold transition-colors duration-300 cursor-pointer"
            >
              Scopri il Menu
            </button>
          </motion.div>

          {/* Opening Info Card - quick glance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 border-t border-brand-gold/10 max-w-lg"
          >
            <div>
              <p className="font-mono text-[9px] text-brand-gold/50 uppercase tracking-widest">Indirizzo</p>
              <p className="text-xs text-brand-offwhite/90 font-light mt-1">Via F. Novati 2, Cremona</p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-brand-gold/50 uppercase tracking-widest">Contatto</p>
              <p className="text-xs text-brand-offwhite/90 font-light mt-1">388 996 7668</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="font-mono text-[9px] text-brand-gold/50 uppercase tracking-widest">Specialità</p>
              <p className="text-xs text-brand-gold font-light mt-1">Nigiri ed Omakase</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          onClick={onExploreMenu}
          className="text-brand-offwhite/40 hover:text-brand-gold transition-colors duration-300 animate-bounce flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase">Scorri</span>
          <ChevronDown className="w-4 h-4 text-brand-gold" />
        </button>
      </div>
    </section>
  );
}
