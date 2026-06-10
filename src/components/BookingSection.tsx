import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, AlertTriangle, CheckCircle, Mail, Phone, ChevronRight, HelpCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Reservation } from '../types';
import { COMMITTED_HOURS } from '../data';

interface BookingSectionProps {
  onSuccessNotification?: (msg: string) => void;
}

const TIME_SLOTS_LUNCH = ['12:00', '12:30', '13:00', '13:30', '14:00'];
const TIME_SLOTS_DINNER = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

export default function BookingSection({ onSuccessNotification }: BookingSectionProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');
  const [existingBookings, setExistingBookings] = useState<Reservation[]>([]);
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState<number>(2);
  const [session, setSession] = useState<'lunch' | 'dinner' | ''>('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // UI States
  const [errorMessage, setErrorMessage] = useState('');
  const [successBooking, setSuccessBooking] = useState<Reservation | null>(null);

  // Load existing bookings on mount
  useEffect(() => {
    const saved = localStorage.getItem('komi_reservations');
    if (saved) {
      try {
        setExistingBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading reservations", e);
      }
    }
  }, []);

  // Update localStorage helper
  const saveToLocalStorage = (list: Reservation[]) => {
    localStorage.setItem('komi_reservations', JSON.stringify(list));
    setExistingBookings(list);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessBooking(null);

    // Basic validation
    if (!name || !phone || !email || !date || !time) {
      setErrorMessage("Si prega di compilare tutti i campi obbligatori per completare la prenotazione.");
      return;
    }

    // Phone / Email basic checks
    if (phone.trim().length < 8) {
      setErrorMessage("Si prega di inserire un numero di telefono valido per essere ricontattati (es. 388 996 7668).");
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage("Si prega di inserire un indirizzo email sintatticamente corretto.");
      return;
    }

    // Validate date (must not be past and must not be Monday)
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (selectedDate < today) {
      setErrorMessage("Non è possibile effettuare prenotazioni retroattive. Selezionare una data futura.");
      return;
    }

    const dayOfWeek = selectedDate.getDay(); // 0 is Sunday, 1 is Monday
    if (dayOfWeek === 1) { // Monday closed
      setErrorMessage("Komi Sushi è chiuso il Lunedì. Scegliere un giorno da Martedì a Domenica.");
      return;
    }

    // Success configuration
    const newReservation: Reservation = {
      id: 'res_' + Math.random().toString(36).substr(2, 9),
      name,
      phone,
      email,
      date,
      time,
      guests,
      notes,
      createdAt: new Date().toISOString()
    };

    const updatedList = [newReservation, ...existingBookings];
    saveToLocalStorage(updatedList);
    setSuccessBooking(newReservation);
    
    // Clear inputs
    setName('');
    setPhone('');
    setEmail('');
    setDate('');
    setGuests(2);
    setSession('');
    setTime('');
    setNotes('');

    if (onSuccessNotification) {
      onSuccessNotification(`Tavolo per ${newReservation.guests} persone prenotato con successo!`);
    }
  };

  const cancelReservation = (id: string) => {
    const updated = existingBookings.filter(r => r.id !== id);
    saveToLocalStorage(updated);
  };

  // Helper date inputs formatting: minimum is today
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSessionChange = (type: 'lunch' | 'dinner') => {
    setSession(type);
    setTime('');
  };

  return (
    <section id="prenotazioni" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden border-t border-white/5">
      {/* Visual background accents */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] rounded-full bg-brand-gold/2 filter blur-3xl pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Grid: Booking Panel on Left, Opening Hours/Stats on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left: The Reservation Engine */}
          <div className="lg:col-span-7 bg-brand-coal/50 border border-white/5 p-8 md:p-12 relative flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-brand-red" />

            <div>
              {/* Tab Selector */}
              <div className="flex space-x-6 border-b border-white/5 pb-4 mb-8">
                <button
                  type="button"
                  onClick={() => { setActiveTab('form'); setSuccessBooking(null); }}
                  className={`font-serif text-sm uppercase tracking-widest pb-2 border-b transition-colors cursor-pointer ${
                    activeTab === 'form' ? 'border-brand-gold text-brand-gold font-medium' : 'border-transparent text-brand-offwhite/50 hover:text-brand-offwhite'
                  }`}
                >
                  Prenota un Tavolo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className={`font-serif text-sm uppercase tracking-widest pb-2 border-b transition-colors cursor-pointer relative ${
                    activeTab === 'list' ? 'border-brand-gold text-brand-gold font-medium' : 'border-transparent text-brand-offwhite/50 hover:text-brand-offwhite'
                  }`}
                >
                  Mie Prenotazioni ({existingBookings.length})
                  {existingBookings.length > 0 && (
                    <span className="absolute -top-1.5 -right-3.5 bg-brand-red text-white text-[9px] font-mono h-4 w-4 rounded-full flex items-center justify-center">
                      {existingBookings.length}
                    </span>
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'form' ? (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Success Screen */}
                    {successBooking ? (
                      <div className="space-y-6 text-center py-8">
                        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-serif text-2xl text-brand-offwhite font-medium">Tavolo Aperto con Successo!</h3>
                          <p className="text-sm text-brand-offwhite/60">
                            La tua prenotazione a nome <strong>{successBooking.name}</strong> è stata confermata ed inserita nel nostro registro.
                          </p>
                        </div>

                        {/* Booking Summary Box */}
                        <div className="bg-brand-dark/80 p-6 border border-brand-gold/20 max-w-sm mx-auto text-left space-y-3 rounded-none font-mono text-xs">
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-brand-gold/60">Codice Booking:</span>
                            <span className="text-brand-offwhite font-semibold">{successBooking.id.toUpperCase()}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-brand-gold/60">Data:</span>
                            <span className="text-brand-offwhite">{successBooking.date}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-brand-gold/60">Orario:</span>
                            <span className="text-brand-offwhite">{successBooking.time}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-brand-gold/60">Coperti:</span>
                            <span className="text-brand-offwhite">{successBooking.guests} Persone</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-brand-gold/60">Email:</span>
                            <span className="text-brand-offwhite font-sans">{successBooking.email}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-brand-offwhite/50 italic">
                          Ti verrà inviata una mail di promemoria 2 ore prima dell'appuntamento. Per variazioni, contattaci telefonicamente.
                        </p>

                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => setSuccessBooking(null)}
                            className="bg-brand-gold text-brand-dark px-6 py-2.5 font-sans font-bold text-xs uppercase tracking-wider cursor-pointer"
                          >
                            Prenota un altro tavolo
                          </button>
                          <button
                            onClick={() => setActiveTab('list')}
                            className="border border-brand-gold text-brand-gold px-6 py-2.5 font-sans font-semibold text-xs uppercase tracking-wider cursor-pointer"
                          >
                            Vedi le mie prenotazioni
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-6">
                        {errorMessage && (
                          <div className="bg-brand-red/10 border border-brand-red text-brand-offwhite text-xs p-4 rounded-none flex items-start gap-2.5">
                            <AlertTriangle className="w-5 h-5 text-brand-red flex-shrink-0" />
                            <span>{errorMessage}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Name Input */}
                          <div className="space-y-2">
                            <label className="block text-xs uppercase font-mono tracking-widest text-[#E4E4E4]/65">Nome Completo *</label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              placeholder="Esempio: Marco Rossi"
                              className="w-full bg-[#0A0A0A] border border-white/5 focus:border-brand-gold/40 text-brand-offwhite text-sm px-4 py-3 focus:outline-none transition-colors"
                            />
                          </div>

                          {/* Phone Input */}
                          <div className="space-y-2">
                            <label className="block text-xs uppercase font-mono tracking-widest text-[#E4E4E4]/65">Telefono Cellulare *</label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              placeholder="Esempio: 388 996 7668"
                              className="w-full bg-[#0A0A0A] border border-white/5 focus:border-brand-gold/40 text-brand-offwhite text-sm px-4 py-3 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Email Input */}
                          <div className="space-y-2">
                            <label className="block text-xs uppercase font-mono tracking-widest text-[#E4E4E4]/65">Email di Contatto *</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="Esempio: mail@esempio.it"
                              className="w-full bg-[#0A0A0A] border border-white/5 focus:border-brand-gold/40 text-brand-offwhite text-sm px-4 py-3 focus:outline-none transition-colors"
                            />
                          </div>

                          {/* Guests select slider */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="block text-xs uppercase font-mono tracking-widest text-[#E4E4E4]/65">Numero Ospiti (Coperti)</label>
                              <span className="font-mono text-xs text-brand-gold font-bold">{guests} Persone</span>
                            </div>
                            <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 px-4 py-2.5">
                              <Users className="w-4 h-4 text-brand-gold/60" />
                              <input
                                type="range"
                                min="1"
                                max="10"
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                className="w-full accent-brand-gold cursor-pointer bg-brand-coal/90 h-1"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Date Picking */}
                          <div className="space-y-2">
                            <label className="block text-xs uppercase font-mono tracking-widest text-[#E4E4E4]/65">Data Desiderata *</label>
                            <div className="relative">
                              <input
                                type="date"
                                value={date}
                                min={getTodayDateString()}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="w-full bg-[#0A0A0A] border border-white/5 focus:border-brand-gold/40 text-brand-offwhite text-sm px-4 py-3 focus:outline-none transition-colors"
                              />
                            </div>
                          </div>

                          {/* Session Lunch/Dinner Selection */}
                          <div className="space-y-2">
                            <label className="block text-xs uppercase font-mono tracking-widest text-[#E4E4E4]/65">Sessione Pranzo/Cena *</label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => handleSessionChange('lunch')}
                                className={`py-3 text-xs font-mono uppercase border tracking-wider transition-all cursor-pointer ${
                                  session === 'lunch'
                                    ? 'bg-brand-gold/5 border-brand-gold text-brand-gold'
                                    : 'bg-[#0A0A0A] border-white/5 text-brand-offwhite/50 hover:text-brand-offwhite'
                                }`}
                              >
                                Pranzo (12-15)
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSessionChange('dinner')}
                                className={`py-3 text-xs font-mono uppercase border tracking-wider transition-all cursor-pointer ${
                                  session === 'dinner'
                                    ? 'bg-brand-gold/5 border-brand-gold text-brand-gold'
                                    : 'bg-[#0A0A0A] border-white/5 text-brand-offwhite/50 hover:text-brand-offwhite'
                                }`}
                              >
                                Cena (19-23.5)
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Timeslot pick based on Lunch or Dinner */}
                        {session && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-2"
                          >
                            <label className="block text-xs uppercase font-mono tracking-widest text-[#E4E4E4]/65 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-brand-gold" />
                              <span>Seleziona Orario d'Arrivo *</span>
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 bg-[#0A0A0A] p-3 border border-white/5">
                              {(session === 'lunch' ? TIME_SLOTS_LUNCH : TIME_SLOTS_DINNER).map((slot) => (
                                <button
                                  type="button"
                                  key={slot}
                                  onClick={() => setTime(slot)}
                                  className={`py-2 text-xs font-mono text-center border cursor-pointer transition-colors ${
                                    time === slot
                                      ? 'bg-brand-red text-white border-brand-red font-semibold'
                                      : 'bg-brand-coal border-white/5 text-brand-offwhite/70 hover:border-brand-gold/40 hover:text-brand-gold'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Allergies and Special requests notes text area */}
                        <div className="space-y-2">
                          <label className="block text-xs uppercase font-mono tracking-widest text-[#E4E4E4]/65 font-medium">Allergeni o richieste speciali (Opzionale)</label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Es: intolleranze al glutine, seggiolone per bambini, o posizionamento veranda..."
                            rows={3}
                            className="w-full bg-[#0A0A0A] border border-white/5 focus:border-brand-gold/40 text-brand-offwhite text-sm px-4 py-3 focus:outline-none transition-colors font-sans"
                          />
                        </div>

                        {/* Submission confirmation triggers */}
                        <button
                          type="submit"
                          className="w-full bg-brand-red hover:bg-[#8B1717] text-white font-semibold font-sans text-xs tracking-widest uppercase py-4 rounded-none shadow-2xl transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
                        >
                          Invia Richiesta di Prenotazione
                        </button>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking-list"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {existingBookings.length > 0 ? (
                      <div className="space-y-4">
                        <p className="text-xs text-brand-offwhite/50 font-mono">
                          Di seguito sono visualizzate le prenotazioni salvate localmente per questa sessione. Puoi annullarle in qualsiasi momento.
                        </p>
                        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                          {existingBookings.map((res) => (
                            <div
                              key={res.id}
                              className="bg-brand-dark/65 border border-brand-gold/15 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-brand-dark"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-serif text-base text-brand-offwhite font-medium">{res.name}</span>
                                  <span className="font-mono text-[9px] bg-brand-gold/25 text-brand-gold border border-brand-gold/20 px-2 py-0.5 uppercase tracking-widest font-bold">
                                    Confermato
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-offwhite/60 font-light">
                                  <div className="flex items-center space-x-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                                    <span>{res.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-1.5">
                                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                                    <span>{res.time}</span>
                                  </div>
                                  <div className="flex items-center space-x-1.5">
                                    <Users className="w-3.5 h-3.5 text-brand-gold" />
                                    <span>{res.guests} Coperti</span>
                                  </div>
                                </div>
                                {res.notes ? (
                                  <p className="text-[11px] text-brand-offwhite/45 italic pt-1 font-sans">
                                    "Note: {res.notes}"
                                  </p>
                                ) : null}
                              </div>

                              <button
                                onClick={() => cancelReservation(res.id)}
                                className="text-[10px] font-mono text-brand-red bg-brand-red/5 hover:bg-brand-red/10 border border-brand-red/20 hover:border-brand-red/45 px-3 py-1.5 uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Annulla Tavolo
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 space-y-4 border border-dashed border-brand-gold/15">
                        <Users className="w-8 h-8 text-brand-gold/40 mx-auto" />
                        <h4 className="font-serif text-lg text-brand-offwhite">Nessuna Prenotazione Attiva</h4>
                        <p className="text-xs text-brand-offwhite/50 max-w-sm mx-auto font-light leading-relaxed">
                          La tua lista di prenotazioni locali è vuota. Utilizza il modulo per creare un nuovo tavolo per pranzo o cena.
                        </p>
                        <button
                          onClick={() => setActiveTab('form')}
                          className="mt-2 bg-brand-gold/15 border border-brand-gold text-brand-gold text-xs font-mono uppercase tracking-widest px-4 py-2 hover:bg-brand-gold/30 transition-colors cursor-pointer"
                        >
                          Prenota Ora
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Opening Hours & Information Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Business Hours Panel */}
            <div className="border border-white/5 bg-brand-coal p-8 relative">
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl text-brand-offwhite font-light uppercase tracking-wide">Orari di Apertura</h3>
                  <p className="font-mono text-[9px] text-brand-gold uppercase tracking-[0.3em]">Rituali del Giorno</p>
                </div>

                <div className="space-y-3.5 font-mono text-xs">
                  {COMMITTED_HOURS.map((oh) => (
                    <div
                      key={oh.day}
                      className={`flex justify-between items-center pb-2.5 border-b border-white/5 ${
                        oh.closed ? 'text-brand-red' : 'text-brand-offwhite/90'
                      }`}
                    >
                      <span className="font-sans font-light">{oh.day}</span>
                      {oh.closed ? (
                        <span className="uppercase tracking-widest text-[10px] bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 font-semibold">Chiuso</span>
                      ) : (
                        <div className="flex flex-col items-end text-neutral-400 font-light text-[11px] font-sans">
                          <span>Pranzo: {oh.lunch}</span>
                          <span>Cena: {oh.dinner}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Offline-First / OpenTable alternative informational widget */}
            <div className="border border-white/5 p-6 bg-brand-coal/30 space-y-4">
              <h4 className="font-mono text-[10px] text-brand-gold uppercase tracking-widest font-semibold flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Hai un conto aziendale?</span>
              </h4>
              <p className="text-xs text-[#E4E4E4]/60 leading-relaxed font-light">
                Per banchetti privati, eventi oltre 12 persone, compleanni guidati od opzioni catering su misura nella provincia di Cremona, vi invitiamo a contattare direttamente la segreteria del ristorante per telefono o tramite email.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <a
                  href="tel:3889967668"
                  className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold hover:underline uppercase"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>388 996 7668</span>
                </a>
                <a
                  href="mailto:prenotazioni@komisushicremona.it"
                  className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold hover:underline uppercase"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Staff</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
