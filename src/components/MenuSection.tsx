import React, { useState, useMemo } from 'react';
import { Search, Flame, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

const menuSideImg = "/src/assets/images/komi_sushi_menu_1781081874493.png";


interface MenuSectionProps {
  onOpenBooking: () => void;
}

const CATEGORIES = [
  { id: 'all', name: 'Tutto' },
  { id: 'nigiri', name: 'Nigiri', desc: 'Riso lavorato e pesce fresco sfilettato' },
  { id: 'sashimi', name: 'Sashimi & Crudi', desc: 'Tagli puri di pesce senza riso' },
  { id: 'maki', name: 'Hosomaki', desc: 'Eleganti roll tradizionali sottili' },
  { id: 'uramaki', name: 'Uramaki', desc: 'Roll con riso all\'esterno' },
  { id: 'temaki', name: 'Temaki', desc: 'Coni d\'alga farciti a mano' },
  { id: 'zuppe', name: 'Zuppe & Dim Sum', desc: 'Zuppe calde e ravioli artigianali' },
  { id: 'bevande', name: 'Bevande & Sake', desc: 'Tè, birre e sake selezionati' }
];

export default function MenuSection({ onOpenBooking }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [glutenFreeOnly, setGlutenFreeOnly] = useState<boolean>(false);
  const [vegetarianOnly, setVegetarianOnly] = useState<boolean>(false);

  // Filter items dynamically
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category Match
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      // Search Match
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Dietary checks
      const matchesGlutenFree = !glutenFreeOnly || item.isGlutenFree;
      
      // Vegetarian check (for our simplicity, Kappa Maki, Wakame, etc.)
      const isVeg = item.name.toLowerCase().includes('kappa') || item.name.toLowerCase().includes('cetriolo') || item.name.toLowerCase().includes('miso');
      const matchesVegetarian = !vegetarianOnly || isVeg;

      return matchesCategory && matchesSearch && matchesGlutenFree && matchesVegetarian;
    });
  }, [selectedCategory, searchQuery, glutenFreeOnly, vegetarianOnly]);

  const activeCategoryDetail = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <section id="menu" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden border-t border-brand-gold/5">
      {/* Background radial soft gold gradients */}
      <div className="absolute left-[10%] top-[40%] w-[350px] h-[350px] rounded-full bg-brand-gold/3 filter blur-[120px] pointer-events-none select-none" />
      <div className="absolute right-[5%] bottom-[10%] w-[400px] h-[400px] rounded-full bg-brand-red/2 filter blur-[150px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <span className="font-mono text-[11px] tracking-[0.3em] text-brand-gold uppercase">La nostra eccellenza</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-offwhite font-light">
              Il Menu <span className="text-brand-gold italic">KOMÌ</span>
            </h2>
            <div className="w-16 h-[1px] bg-brand-red mt-2" />
          </div>
          
          <p className="max-w-md text-sm text-brand-offwhite/60 font-light leading-relaxed">
            Ogni portata rispetta una sequenza precisa. Seleziona la categoria ed esplora i nostri rituali di gusto. Ogni pietanza è preparata espressa al bancone.
          </p>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Search Input Bar */}
          <div className="lg:col-span-5 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-brand-gold/60" />
            <input
              type="text"
              placeholder="Cerca piatto (es. salmone, ravioli...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-coal/80 border border-white/5 text-brand-offwhite text-sm font-sans pl-12 pr-6 py-3.5 focus:outline-none focus:border-brand-gold transition-colors duration-300"
            />
          </div>

          {/* Filter Toggles */}
          <div className="lg:col-span-7 flex flex-wrap items-center gap-4 lg:justify-end">
            <button
              onClick={() => setGlutenFreeOnly(!glutenFreeOnly)}
              className={`flex items-center space-x-2 text-xs font-mono py-2.5 px-4 uppercase border transition-all duration-300 cursor-pointer ${
                glutenFreeOnly
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-white/5 text-brand-offwhite/70 hover:border-brand-gold/30'
              }`}
            >
              <span>Senza Glutine</span>
              <span className="text-[10px] bg-brand-coal/90 px-1.5 py-0.5 border border-white/5">GF</span>
            </button>

            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`flex items-center space-x-2 text-xs font-mono py-2.5 px-4 uppercase border transition-all duration-300 cursor-pointer ${
                vegetarianOnly
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-white/5 text-brand-offwhite/70 hover:border-brand-gold/30'
              }`}
            >
              <span>Opzioni vegetariane</span>
              <span className="text-[10px] bg-brand-coal/90 px-1.5 py-0.5 border border-white/5">VG</span>
            </button>

            {/* Clear Filters indicator */}
            {(glutenFreeOnly || vegetarianOnly || searchQuery !== '') && (
              <button
                onClick={() => {
                  setGlutenFreeOnly(false);
                  setVegetarianOnly(false);
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-mono text-brand-red hover:underline uppercase tracking-wider py-2"
              >
                Resetta Filtri
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Category Nav */}
        <div className="flex border-b border-white/5 overflow-x-auto pb-4 mb-10 no-scrollbar select-none gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap px-6 py-3 font-serif text-sm tracking-wider uppercase transition-all duration-300 border-b-2 cursor-pointer ${
                selectedCategory === category.id
                  ? 'border-brand-gold text-brand-gold font-semibold bg-brand-coal/50'
                  : 'border-transparent text-brand-offwhite/50 hover:text-brand-offwhite'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Active Category Meta */}
        {activeCategoryDetail && activeCategoryDetail.id !== 'all' && (
          <div className="mb-8 p-4 bg-brand-coal/30 border-l border-brand-gold font-mono text-xs text-brand-gold/85">
            <span className="uppercase font-semibold tracking-widest">{activeCategoryDetail.name}:</span> {activeCategoryDetail.desc}
          </div>
        )}

        {/* Layout Grid: Menu Items Left side, Big Photo Right side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Menu Items list */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item, idx) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                      className="bg-brand-coal/30 hover:bg-brand-coal/70 border border-white/5 hover:border-brand-gold/20 p-6 rounded-none transition-all duration-300 flex flex-col justify-between group relative h-full"
                    >
                      {/* Ribbon icons for Popular */}
                      {item.isPopular && (
                        <div className="absolute top-2 right-2 flex items-center space-x-1 font-mono text-[9px] bg-brand-gold/10 text-brand-gold px-2.5 py-0.5 border border-brand-gold/25 uppercase tracking-widest rounded-none">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Popolare</span>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-serif text-lg text-brand-offwhite font-light tracking-wide group-hover:text-brand-gold transition-colors duration-300">
                            {item.name}
                          </h3>
                          <span className="font-mono text-sm text-brand-gold font-medium">
                            €{item.price.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-xs text-brand-offwhite/60 font-light leading-relaxed max-w-sm">
                          {item.description}
                        </p>
                      </div>

                      {/* Item Bottom tags */}
                      <div className="flex items-center space-x-3 pt-4 mt-4 border-t border-white/5 flex-wrap gap-y-2">
                        {item.isGlutenFree && (
                          <span className="bg-emerald-950/10 text-emerald-400 text-[10px] font-mono px-2 py-0.5 border border-emerald-500/10 uppercase tracking-wider rounded-none">
                            Senza Glutine
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="bg-brand-red/5 text-brand-red text-[10px] font-mono px-2 py-0.5 border border-brand-red/10 uppercase tracking-wider rounded-none flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5" />
                            <span>Piccante</span>
                          </span>
                        )}
                        {/* Allergen hint */}
                        <div className="text-[10px] text-brand-offwhite/45 font-serif italic tracking-wide ml-auto">
                          Soya, sesamo, pesce
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-brand-coal/30 border border-dashed border-brand-gold/15 p-12 text-center text-brand-offwhite/65 space-y-4"
                >
                  <AlertCircle className="w-8 h-8 text-brand-gold/60 mx-auto" />
                  <p className="font-serif text-lg">Nessun piatto soddisfa i requisiti.</p>
                  <p className="text-xs font-light text-brand-offwhite/45 max-w-md mx-auto">
                    Prova a deselezionare i filtri di intolleranze alimentari o modifica le parole chiave nella stringa di ricerca.
                  </p>
                  <button
                    onClick={() => {
                      setGlutenFreeOnly(false);
                      setVegetarianOnly(false);
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-4 border border-brand-gold/45 text-brand-gold text-xs font-mono uppercase tracking-widest px-4 py-2 cursor-pointer hover:bg-brand-gold/10 transition-colors"
                  >
                    Resetta tutto
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Premium Visual Cards sidebar */}
          <div className="lg:col-span-4 space-y-8 sticky top-28 hidden lg:block">
            
            {/* Visual Photo Card */}
            <div className="group border border-white/5 bg-brand-coal/50 overflow-hidden relative">
              <div className="overflow-hidden aspect-[4/3] relative">
                <img
                  src={menuSideImg}
                  alt="Uramaki e Sashimi d'alta classe"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <p className="font-mono text-[9px] text-brand-gold uppercase tracking-[0.3em]">Ispirazione</p>
                <h4 className="font-serif text-lg text-brand-offwhite font-light">Il Percorso dello Chef</h4>
                <p className="text-xs text-brand-offwhite/60 font-light leading-relaxed">
                  Lasciati stupire dal nostro cammino sensoriale. Gli ingredienti seguono il ritmo delle stagioni coniugando sapori audaci e rigore estetico del sol levante.
                </p>
              </div>
            </div>

            {/* Information Warning Box */}
            <div className="border border-white/5 p-6 bg-brand-coal/30 relative">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-brand-red" />
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-brand-red/90">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">Note sugli Allergeni</span>
                </div>
                <p className="text-[11px] text-[#E4E4E4]/50 leading-relaxed font-light">
                  Alcuni ingredienti includono soia, senape, sesamo e crostacei. Per qualsiasi intolleranza grave o richiesta di piatti senza glutine, si prega di informare anticipatamente il personale in cassa o di scriverlo nelle note al momento della prenotazione.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="text-[10px] font-mono text-brand-gold hover:text-brand-gold/80 hover:underline uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Segnala con booking →</span>
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
