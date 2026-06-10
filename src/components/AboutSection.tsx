import React from 'react';
import { ChefHat, ShieldCheck, Soup, Award } from 'lucide-react';

const chefImg = "/src/assets/images/komi_chef_craft_1781081893123.png";


export default function AboutSection() {
  return (
    <section id="chi-siamo" className="relative py-24 md:py-36 bg-brand-coal overflow-hidden border-t border-brand-gold/5">
      {/* Background Japanese Watermarks */}
      <div className="absolute left-10 bottom-1/4 z-0 pointer-events-none select-none opacity-5 hidden lg:block">
        <span className="font-serif text-[280px] text-brand-gold leading-none">職</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* About Main Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Column 1: Image Frame - styled beautifully with precise borders */}
          <div className="lg:col-span-6 relative">
            
            {/* Elegant framing border around the image */}
            <div className="absolute -inset-4 border border-white/5 pointer-events-none z-10" />
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-brand-gold/30 pointer-events-none z-20" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-brand-gold/30 pointer-events-none z-20" />

            {/* Main high quality photorealistic Chef slicing Salmon image */}
            <div className="overflow-hidden bg-brand-dark aspect-[4/3] shadow-2xl relative">
              <img
                src={chefImg}
                alt="Sushi Master preparatore del pesce Komi Cremona"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-[2000s] scale-100 object-center hover:scale-105 filter brightness-90 grayscale-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
            </div>

            {/* Quick Caption on image corner */}
            <div className="absolute bottom-4 right-4 bg-[#0A0A0A] backdrop-blur border border-white/5 px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-[#E4E4E4]/80">
              Chef Hiroshi • Maestro Zen
            </div>
          </div>

          {/* Column 2: Content Text with beautiful typography spacing */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs tracking-[0.4em] text-brand-gold uppercase">La Nostra Filosofia</span>
              <h2 className="font-serif text-3xl md:text-5xl text-brand-offwhite font-medium leading-tight">
                L’energia vitale nel rispetto del tempo.
              </h2>
              <div className="w-16 h-[1.5px] bg-brand-red mt-2" />
            </div>

            <div className="space-y-6 text-brand-offwhite/75 font-sans text-sm md:text-base font-light leading-relaxed">
              <p>
                A <strong className="text-brand-gold font-medium">Komi</strong> non serviamo semplicemente cibo, ma compiamo un antico rituale. La nostra filosofia poggia su tre pilastri: la freschezza assoluta della materia prima, il gesto preciso appreso in decenni di dedizione e l’armonia pacifica dell’attesa.
              </p>
              <p>
                Il pesce azzurro viene abbattuto a temperature rigide per preservare intatte le fibre ed i sapori naturali. Il riso, elemento cardine e segreto del perfetto sushi, viene cotto e condito con aceto di riso puro, zucchero biologico e kombu, mantenuto tiepido fino al momento esatto del servizio per amalgamarsi perfettamente nel palato.
              </p>
            </div>

            {/* Value Props Stats/Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-dark border border-white/5 text-brand-gold">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-brand-offwhite font-semibold">Origine Certificata</h4>
                  <p className="text-xs text-[#E4E4E4]/60 font-light mt-1 leading-relaxed">
                    Pesce pescato da fonti sostenibili e tracciato rigorosamente, certificato contro batteri e parassiti.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-dark border border-white/5 text-brand-gold">
                  <ChefHat className="w-5 h-5 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-brand-offwhite font-semibold">Esperienza Decennale</h4>
                  <p className="text-xs text-[#E4E4E4]/60 font-light mt-1 leading-relaxed">
                    Il nostro Chef ha appreso i segreti del riso e del taglio dai migliori maestri della prefettura di Fukuoka.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Section 2 inside About: Quality callout */}
        <div className="mt-20 p-8 border border-white/5 bg-brand-dark relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/2 rounded-full filter blur-xl" />
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif text-xl text-brand-gold font-light italic">"Il Sushi è un’esperienza intima tra te ed il sapore sincero della natura."</h3>
            <p className="text-xs text-brand-offwhite/55 font-mono">Chef Hiroshi, Komi Sushi Cremona</p>
          </div>
          <button
            onClick={() => {
              const element = document.querySelector('#menu');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="whitespace-nowrap border-b border-brand-gold hover:border-brand-gold/80 text-brand-gold text-[10px] font-mono uppercase tracking-[0.2em] pb-1 cursor-pointer transition-colors"
          >
            Vedi le Specialità dello Chef →
          </button>
        </div>

      </div>
    </section>
  );
}
