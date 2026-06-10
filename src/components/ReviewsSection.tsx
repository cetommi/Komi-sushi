import React, { useState } from 'react';
import { Star, MessageSquare, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS_DATA } from '../data';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1));
  };

  // Helper to render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star
        key={idx}
        className={`w-4 h-4 ${
          idx < rating ? 'text-brand-gold fill-brand-gold' : 'text-neutral-700'
        }`}
      />
    ));
  };

  const activeReview = REVIEWS_DATA[currentIndex];

  return (
    <section id="recensioni" className="relative py-24 md:py-28 bg-brand-dark overflow-hidden border-t border-white/5">
      {/* Visual ornaments - abstract sumi ink droplets */}
      <div className="absolute right-[10%] top-1/3 w-72 h-72 rounded-full bg-brand-gold/2 filter blur-3xl pointer-events-none select-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4">
          <span className="font-mono text-xs tracking-[0.4em] text-brand-gold uppercase block">Dicono di Noi</span>
          <h2 className="font-serif text-3xl md:text-5xl text-brand-offwhite font-light">
            Fiducia & <span className="text-brand-gold italic">Recensioni</span>
          </h2>
          <div className="w-12 h-[1px] bg-brand-red mx-auto mt-2" />
        </div>

        {/* Aggregate Google rating summary card */}
        <div className="max-w-md mx-auto p-5 bg-brand-coal/35 border border-white/5 flex flex-col sm:flex-row justify-around items-center gap-4">
          <div className="text-center sm:text-left space-y-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#E4E4E4]/65 block">Rating Google</span>
            <div className="flex items-center justify-center sm:justify-start space-x-1">
              <span className="text-4xl font-serif font-bold text-brand-offwhite">4,3</span>
              <span className="text-sm text-brand-offwhite/45">/ 5</span>
            </div>
          </div>
          
          <div className="h-[1px] w-12 sm:h-12 sm:w-[1px] bg-white/5" />

          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-0.5">
              {renderStars(4)}
              <Star className="w-4 h-4 text-brand-gold fill-brand-gold/40" />
            </div>
            <p className="text-xs text-[#E4E4E4]/50 font-mono tracking-wider">448 RECENSIONI TOTALI</p>
          </div>
        </div>

        {/* Carousel testimonial quote wrapper */}
        <div className="relative max-w-3xl mx-auto py-8">
          <div className="absolute -top-4 left-4 scale-150 text-brand-gold/10 pointer-events-none select-none">
            <Quote className="w-16 h-16 fill-brand-gold/5" />
          </div>

          <div className="min-h-[180px] flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="font-serif text-lg md:text-xl lg:text-2xl text-brand-offwhite/90 leading-relaxed font-light italic max-w-2xl mx-auto">
                  "{activeReview.text}"
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-1">
                     {renderStars(activeReview.rating)}
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-serif text-sm font-light text-brand-offwhite">{activeReview.author}</span>
                    <span className="text-brand-gold/30">•</span>
                    <span className="font-mono text-[9px] bg-[#141414] border border-white/5 text-brand-gold px-2 py-0.5 uppercase tracking-widest">
                      {activeReview.tag || 'Recensione certificata'}
                    </span>
                    <span className="text-brand-gold/30">•</span>
                    <span className="text-xs text-brand-offwhite/45 font-mono">{activeReview.relativeTime}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick carousel control buttons */}
          <div className="flex justify-center items-center space-x-6 mt-8">
            <button
              onClick={prevReview}
              className="p-3 border border-white/5 hover:border-brand-gold text-brand-gold hover:bg-brand-gold/5 transition-colors cursor-pointer"
              aria-label="Recensione precedente"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-brand-gold/40">
              0{currentIndex + 1} / 0{REVIEWS_DATA.length}
            </span>
            <button
              onClick={nextReview}
              className="p-3 border border-white/5 hover:border-brand-gold text-brand-gold hover:bg-brand-gold/5 transition-colors cursor-pointer"
              aria-label="Prossima recensione"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
