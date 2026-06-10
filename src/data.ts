import { MenuItem, Review, BusinessHours } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // NIGIRI (2 pezzi)
  {
    id: 'n1',
    name: 'Nigiri Sake',
    description: 'Polpettina di riso lavorata a mano sormontata da freschissimo filetto di salmone.',
    price: 4.50,
    category: 'nigiri',
    isGlutenFree: true,
    isPopular: true
  },
  {
    id: 'n2',
    name: 'Nigiri Maguro',
    description: 'Polpettina di riso guarnita con pregiato filetto di tonno rosso pinna gialla.',
    price: 5.00,
    category: 'nigiri',
    isGlutenFree: true
  },
  {
    id: 'n3',
    name: 'Nigiri Ebi',
    description: 'Nigiri con gambero cotto a vapore, adagiato su riso aromatizzato.',
    price: 4.50,
    category: 'nigiri'
  },
  {
    id: 'n4',
    name: 'Nigiri Suzuki',
    description: 'Bianco branzino fresco tagliato sottile e spennellato con salsa nikiri dello Chef.',
    price: 4.50,
    category: 'nigiri',
    isGlutenFree: true
  },

  // SASHIMI
  {
    id: 's1',
    name: 'Sashimi Misto',
    description: 'Selezione pregiata di fette di salmone, tonno e branzino crudi serviti con daikon e zenzero.',
    price: 16.00,
    category: 'sashimi',
    isGlutenFree: true,
    isPopular: true
  },
  {
    id: 's2',
    name: 'Carpaccio Di Salmone',
    description: 'Sottili fettine di salmone freschissimo marinate con salsa ponzu leggermente agrumata ed erba cipollina.',
    price: 12.00,
    category: 'sashimi',
    isGlutenFree: true
  },
  {
    id: 's3',
    name: 'Tartare Di Salmone',
    description: 'Salmone fresco battuto al coltello, servito con crema di avocado, tobiko e salsa di yuzu.',
    price: 11.00,
    category: 'sashimi',
    isGlutenFree: true,
    isPopular: true
  },
  {
    id: 's4',
    name: 'Tartare Al Salmone Con Mango E Philadelphia',
    description: 'Tartare di salmone marinata, mango fresco, Philadelphia, servita in coppa con salsa teriyaki.',
    price: 12.50,
    category: 'sashimi'
  },
  {
    id: 's5',
    name: 'Scampi Crudi',
    description: 'Scampi freschissimi marinati nel limone e olio extravergine con fiocchi di sale di Maldon.',
    price: 15.00,
    category: 'sashimi',
    isGlutenFree: true
  },

  // MAKI (Hosomaki, 6 pezzi)
  {
    id: 'm1',
    name: 'Hosomaki Sake',
    description: 'Rotolo di alga nori esterno con ripieno di salmone fresco e riso.',
    price: 5.00,
    category: 'maki',
    isGlutenFree: true
  },
  {
    id: 'm2',
    name: 'Hosomaki Kappa',
    description: 'Rotolo vegetariano ripieno di cetriolo fresco croccante e semi di sesamo tostato.',
    price: 4.00,
    category: 'maki',
    isGlutenFree: true
  },
  {
    id: 'm3',
    name: 'Hosomaki Tuna',
    description: 'Rotolo di alga nori ripieno di squisito filetto di tonno rosso.',
    price: 6.00,
    category: 'maki',
    isGlutenFree: true
  },

  // URAMAKI (8 pezzi)
  {
    id: 'u1',
    name: 'Uramaki Tonno E Avocado',
    description: 'Riso all\'esterno con sesamo, all\'interno tonno fresco e avocado cremoso.',
    price: 10.00,
    category: 'uramaki',
    isGlutenFree: true,
    isPopular: true
  },
  {
    id: 'u2',
    name: 'Tiger Roll',
    description: 'Uramaki farcito con gambero in tempura sormontato da fettine di salmone scozzese scottato e salsa maionese piccante.',
    price: 12.00,
    category: 'uramaki',
    isSpicy: true,
    isPopular: true
  },
  {
    id: 'u3',
    name: 'California Special Roll',
    description: 'Polpa di granchio reale, maionese giapponese, avocado, cetriolo sormontato da tobiko arancione.',
    price: 9.50,
    category: 'uramaki'
  },
  {
    id: 'u4',
    name: 'Rainbow Roll',
    description: 'Uramaki ripieno di avocado e granchio, avvolto all\'esterno da un arcobaleno di salmone, tonno e branzino.',
    price: 13.00,
    category: 'uramaki',
    isGlutenFree: true
  },

  // TEMAKI (1 pezzo)
  {
    id: 't1',
    name: 'Temaki Spicy Tuna',
    description: 'Cono di alga nori ripieno di riso, tonno marinato con salsa sriracha piccante, avocado ed erba cipollina.',
    price: 5.50,
    category: 'temaki',
    isSpicy: true
  },
  {
    id: 't2',
    name: 'Temaki Ebi Ten',
    description: 'Cono ripieno di gambero in tempura croccante ripieno di riso, cetriolo e salsa teriyaki dolce.',
    price: 5.50,
    category: 'temaki'
  },

  // ZUPPE / ANTIPASTI / DIM SUM
  {
    id: 'z1',
    name: 'Miso Shiru',
    description: 'Zuppa di miso tradizionale con tofu saporito, alghe wakame nutrienti e cipollotto fresco scalogno.',
    price: 4.50,
    category: 'zuppe',
    isGlutenFree: true
  },
  {
    id: 'z2',
    name: 'Gyoza Gamberi E Manzo',
    description: 'Ravioli tradizionali giapponesi ripieni di gamberi tritati e tenero manzo, cotti alla griglia e vapore.',
    price: 6.50,
    category: 'zuppe',
    isPopular: true
  },
  {
    id: 'z3',
    name: 'Ravioli Al Nero Di Seppia',
    description: 'Ravioli di sfoglia nera alla seppia cotti al vapore con un ripieno succoso di frutti di mare e zenzero.',
    price: 7.00,
    category: 'zuppe',
    isPopular: true
  },

  // BEVANDE
  {
    id: 'b1',
    name: 'Sake Tokubetsu Junmai',
    description: 'Pregiato sake giapponese servito caldo o freddo, dal gusto morbido con note floreali dolci.',
    price: 8.00,
    category: 'bevande'
  },
  {
    id: 'b2',
    name: 'Birra Asahi Super Dry (50cl)',
    description: 'La celebre birra lager giapponese dal finale pulito e incredibilmente secco ed extra rinfrescante.',
    price: 5.50,
    category: 'bevande'
  },
  {
    id: 'b3',
    name: 'Japanese Selected Tea Oolong',
    description: 'Pregiato tè verde oolong tradizionale tostato, ideale come abbinamento durante tutto il pasto.',
    price: 4.00,
    category: 'bevande'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev1',
    author: 'Alice Dossena',
    rating: 4,
    text: 'Il personale è gentile e il servizio rapido. I piatti sono serviti con cura, l\'ambiente è accogliente e perfetto per rilassarsi a pranzo gustando del buon sushi crudo tagliato al momento.',
    relativeTime: '5 mesi fa',
    tag: 'Local Guide'
  },
  {
    id: 'rev2',
    author: 'Roby',
    rating: 5,
    text: 'Ottimo cibo servito in un contesto molto accogliente... Ci sono stata con i miei colleghi per un pranzo di lavoro ed il servizio è stato impeccabile, con portate deliziose ed ingredienti freschi.',
    relativeTime: '3 mesi fa',
    tag: 'Local Guide'
  },
  {
    id: 'rev3',
    author: 'Davide Murari',
    rating: 5,
    text: 'Komi cibo davvero buono. Personale cordiale e rapido nel consigliare le specialità. Ho provato gli uramaki con mango, squisiti! Gradevole anche lo spazio veranda esterno nei mesi caldi.',
    relativeTime: '9 mesi fa',
    tag: 'Local Guide'
  }
];

export const COMMITTED_HOURS: BusinessHours[] = [
  { day: 'Lunedì', lunch: 'Chiuso', dinner: 'Chiuso', closed: true },
  { day: 'Martedì', lunch: '12:00 - 15:00', dinner: '19:00 - 23:30', closed: false },
  { day: 'Mercoledì', lunch: '12:00 - 15:00', dinner: '19:00 - 23:30', closed: false },
  { day: 'Giovedì', lunch: '12:00 - 15:00', dinner: '19:00 - 23:30', closed: false },
  { day: 'Venerdì', lunch: '12:00 - 15:00', dinner: '19:00 - 23:30', closed: false },
  { day: 'Sabato', lunch: '12:00 - 15:00', dinner: '19:00 - 23:30', closed: false },
  { day: 'Domenica', lunch: '12:00 - 15:00', dinner: '19:00 - 23:30', closed: false }
];
