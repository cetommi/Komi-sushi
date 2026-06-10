import React, { useState } from 'react';
import { MapPin, Phone, Mail, Navigation, Copy, Check, Clock, Compass } from 'lucide-react';

const sakeImg = "/src/assets/images/komi_sake_set_1781081908474.png";


export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const fullAddress = "Via Francesco Novati, 2, 26100 Cremona CR";
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Komi+Sushi+Via+Francesco+Novati+2+Cremona";

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contatti" className="relative py-24 md:py-32 bg-brand-coal overflow-hidden border-t border-white/5">
      {/* Background soft blur decoration */}
      <div className="absolute left-[30%] bottom-0 w-[500px] h-[150px] rounded-full bg-brand-gold/2 filter blur-[150px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="space-y-4 mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.4em] text-brand-gold uppercase">Vienici a Trovare</span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-offwhite font-light">
            Ubicazione & <span className="text-brand-gold italic">Contatti</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-brand-red mx-auto mt-2" />
        </div>

        {/* Grid layout spanning contacts and map showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Direct Address details, phone numbers, sake illustration */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              <p className="text-sm text-brand-offwhite/75 font-light leading-relaxed">
                Situato nel cuore accogliente ed elegante di Cremona, Komi vi aspetta in un ambiente rilassante e intimo, predisposto per coccolarvi durante pranzi di lavoro veloci o cene intime a lume di candela.
              </p>

              {/* Address Card */}
              <div className="p-6 bg-brand-dark/50 border border-white/5 space-y-4">
                
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-brand-coal border border-white/5 text-brand-gold rounded-none flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-2 flex-grow">
                     <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold/50 block">Indirizzo Ristorante</span>
                    <p className="text-sm font-serif text-brand-offwhite font-light">Via Francesco Novati, 2</p>
                    <p className="text-xs text-brand-offwhite/60 font-light mt-0.5">26100 Cremona (CR) • Italia</p>
                    
                    {/* Copy button & Maps deep link */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={copyAddressToClipboard}
                        className="text-[10px] font-mono text-brand-gold/80 hover:text-brand-gold flex items-center gap-1 cursor-pointer"
                        title="Copia indirizzo"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copiato!' : 'Copia Indirizzo'}</span>
                      </button>
                      <span className="text-[#E4E4E4]/10">|</span>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-brand-gold/80 hover:text-brand-gold flex items-center gap-1"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Apri Google Maps</span>
                      </a>
                    </div>
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* Telephone Contact card */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-brand-coal border border-white/5 text-brand-gold rounded-none flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold/50 block">Chiamaci Direttamente</span>
                    <a
                      href="tel:3889967668"
                      className="text-lg font-mono text-brand-offwhite hover:text-brand-gold font-light transition-colors cursor-pointer"
                    >
                      388 996 7668
                    </a>
                    <p className="text-[11px] text-[#E4E4E4]/40 leading-none mt-1 font-light">Disponibile negli orari di servizio</p>
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* Email Contact Card */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-brand-coal border border-white/5 text-brand-gold rounded-none flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold/50 block">Richieste via Mail</span>
                    <a
                      href="mailto:info@komisushicremona.it"
                      className="text-sm font-mono text-brand-offwhite hover:text-brand-gold transition-colors"
                    >
                      info@komisushicremona.it
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Micro aesthetic card: sake portrait layout */}
            <div className="border border-white/5 overflow-hidden bg-brand-dark/30 flex items-center p-4 gap-4">
              <div className="w-16 h-16 rounded-none overflow-hidden relative flex-shrink-0 border border-white/5">
                <img
                  src={sakeImg}
                  alt="Traditional Japanese sake cup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h5 className="font-serif text-sm text-brand-offwhite font-light">Messa in tavola & Servizio</h5>
                <p className="text-[11px] text-brand-offwhite/50 leading-relaxed font-light">
                  Serviamo l'autentica birra Asahi a freddo ed una selezione accurata di Sake Junmai caldi, ideati per pulire e armonizzare il palato.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Interactive stylized map */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* The Stylized Map Mockup with interactive zoom / directions */}
            <div className="bg-brand-dark border border-white/5 flex-grow min-h-[350px] relative overflow-hidden flex flex-col justify-between p-6">
              
              {/* Abstract Blueprint Grid lines in style of Japanese minimalist maps */}
              <div className="absolute inset-0 bg-brand-dark opacity-90" />
              <div
                className="absolute inset-0 select-none pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  opacity: 0.12
                }}
              />

              {/* Simulated stylized roads using grids */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5 pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-1/3 h-[1px] bg-white/5 pointer-events-none z-10" />
              <div className="absolute left-1/3 inset-y-0 w-[1px] bg-white/5 pointer-events-none z-10" />
              <div className="absolute left-2/3 inset-y-0 w-[1px] bg-white/5 pointer-events-none z-10" />

              {/* Point of interest floating indicators */}
              <div className="absolute top-[28%] left-[20%] text-[10px] font-mono text-brand-offwhite/30 tracking-wider">
                Cremona Centro Storico
              </div>
              <div className="absolute bottom-[25%] left-[65%] text-[10px] font-mono text-brand-offwhite/20 tracking-wider">
                Stazione Cremona
              </div>

              {/* The Central Pin for Komi Sushi */}
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                
                {/* Ripple pulsator effect */}
                <span className="absolute inline-flex h-12 w-12 rounded-full bg-brand-red/15 animate-ping" />
                <span className="absolute inline-flex h-6 w-6 rounded-full bg-brand-gold/10 animate-pulse" />
                
                {/* Center marker */}
                <div className="bg-brand-red border border-white/10 text-white p-3 shadow-2xl relative z-30">
                  <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
                </div>
                
                {/* Tooltip detail tag */}
                <div className="bg-[#0A0A0A] border border-white/5 text-center px-4 py-2 mt-3 shadow-2xl skew-x-[-2deg] flex flex-col items-center">
                  <span className="font-serif text-xs font-light text-brand-offwhite tracking-wider">KOMI SUSHI</span>
                  <span className="text-[9px] font-light text-brand-gold uppercase tracking-widest font-mono mt-0.5">Via F. Novati, 2</span>
                </div>
              </div>

              {/* Map Footer Control items */}
              <div className="relative z-20 mt-auto flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-brand-coal/90 border border-white/5 p-4 rounded-none">
                <div className="space-y-1 text-left">
                  <span className="font-mono text-[9px] text-brand-gold uppercase tracking-wider block">Calcola Percorso</span>
                  <p className="text-xs text-brand-offwhite">Ottieni istruzioni stradali in tempo reale</p>
                </div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-red hover:bg-[#8B1717] text-white px-5 py-2 text-xs font-mono font-medium tracking-widest uppercase text-center flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Avvia Navigatore</span>
                </a>
              </div>

            </div>

            {/* Quick warning list about surrounding points / parking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-white/5 p-4 bg-brand-coal/40 space-y-1 text-left">
                <h6 className="font-serif text-xs text-brand-gold font-light">Parcheggio consigliato</h6>
                <p className="text-[11px] text-brand-offwhite/50 leading-relaxed font-light">
                  Ampio parcheggio pubblico a pagamento e strisce blu lungo la strada adiacente Via Francesco Novati.
                </p>
              </div>

              <div className="border border-white/5 p-4 bg-brand-coal/40 space-y-1 text-left">
                <h6 className="font-serif text-xs text-brand-gold font-light">Asporto & Consegne</h6>
                <p className="text-[11px] text-brand-offwhite/50 leading-relaxed font-light">
                  Servizio asporto pronto in 15 minuti ed ordini telefonici veloci. Consegna senza contatto a Cremona.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
