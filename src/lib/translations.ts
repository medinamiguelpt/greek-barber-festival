export type Locale = "el" | "en" | "fr" | "es" | "de" | "ar";

export const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: "el", flag: "🇬🇷", label: "Ελληνικά" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
];

export type Translations = {
  nav: Record<string, string>;
  hero: Record<string, string>;
  about: Record<string, string>;
  edu: { title: string };
  sponsors: { title: string };
  videos: { title: string; v7: string; v6: string; v5: string };
  tickets: Record<string, string>;
  comp: {
    title: string;
    intro: string;
    cats: { name: string; time: string; desc: string }[];
    note: string;
    notes: string[];
    contactNote: string;
  };
  program: { title: string; note: string };
  photos: { title: string; text: string };
  loc: { title: string; text: string; map: string };
  contact: Record<string, string>;
  footer: { phones: string; follow: string; rights: string };
  days: string;
  hrs: string;
  notesTitle: string;
};

export const translations: Record<Locale, Translations> = {
  el: {
    nav: { home: "ΑΡΧΙΚΗ", tickets: "ΕΙΣΙΤΗΡΙΑ", program: "ΠΡΟΓΡΑΜΜΑ", competition: "ΔΙΑΓΩΝΙΣΜΟΣ", photos: "ΦΩΤΟΓΡΑΦΙΕΣ", sponsors: "ΧΟΡΗΓΟΙ", contact: "ΕΠΙΚΟΙΝΩΝΙΑ", location: "ΤΟΠΟΘΕΣΙΑ" },
    hero: { badge: "8ο GREEK BARBER FESTIVAL", date: "26–27 Απριλίου 2026", city: "ΑΘΗΝΑ", venue: 'Εργοστάσιο "Κλωσταί Πεταλούδα"', addr: "Παρ. Λεωφόρος Κηφισσού 42, Αιγάλεω", near: '(πλησίον Τεχνοχώρου "Cartel")', cta: "ΑΠΟΚΤΗΣΕ ΕΙΣΙΤΗΡΙΟ", cta2: "ΔΗΛΩΣΕ ΣΥΜΜΕΤΟΧΗ" },
    about: { title: "Το 8ο Greek Barber Festival", motto: "Εκπαίδευση — Εξέλιξη — Επιτυχία", text: 'Το 8ο Greek Barber Festival είναι το σημείο συνάντησης της barber κουλτούρας στην Ελλάδα. Για 2 μέρες οι εμβληματικοί εργοστασιακοί χώροι της ιστορικής κλωστοϋφαντουργίας "Κλωσταί Πεταλούδα" στην Αθήνα, μετατρέπονται σε κέντρο έμπνευσης εκπαίδευσης και δημιουργίας. Ζωντανές παρουσιάσεις, εκπαιδευτικά σεμινάρια και διαγωνισμοί δημιουργούν μια μοναδική εμπειρία γνώσης, έμπνευσης και επαγγελματικής εξέλιξης. Ραντεβού 26-27 Απριλίου στο 8ο Greek Barber Festival.' },
    edu: { title: "GUEST EDUCATORS 2026" },
    sponsors: { title: "SPONSORS 8th GBF" },
    videos: { title: "AFTER MOVIES", v7: "After Movie 7th Greek Barber Festival", v6: "After Movie 6th Greek Barber Festival", v5: "After Movie 5th Greek Barber Festival" },
    tickets: { title: "ΚΟΣΤΟΣ ΓΕΝΙΚΗΣ ΕΙΣΟΔΟΥ", presale: "Προπώληση έως 24 Φεβρουαρίου 2026", pro: "Επαγγελματίες", proPrice1: "160.00 €", proNote: "Ιδιοκτήτες και Υπάλληλοι Καταστημάτων, Freelancer, Απόφοιτοι ιδιωτικής δημόσιας σχολής.", student: "Σπουδαστές σχολών", studentPrice1: "40.00 €", studentNote: "*απαιτείται βεβαίωση σπουδών", crew: "Festival Crew Bonus", crew1: '3+ άτομα 160.00 € + 1 εξάδα προϊόντων "Marras Hair" bonus ανά άτομο.', crew2: '5+ άτομα 150.00 € + 2 εξάδες προϊόντων "Marras Hair" bonus ανά άτομο.', genTitle: "Γενική Είσοδος", proPrice2: "180.00 €", studentPrice2: "50.00 €", crew3: '3+ άτομα 180.00 € + 1 εξάδα προϊόντων "Marras Hair" bonus ανά άτομο.', crew4: '5+ άτομα 180.00 € + 2 εξάδες προϊόντων "Marras Hair" bonus ανά άτομο.', companion: "Σημείωση: Επιτρέπονται οι συνοδοί (Α' βαθμού συγγένειας) με γενική είσοδο 20.00 €", info: "Για περισσότερες πληροφορίες στα τηλέφωνα: 27440-66437 - 6945977046 - 6936524834 - 6946466324" },
    comp: { title: "ΔΙΑΓΩΝΙΣΤΙΚΑ ΘΕΜΑΤΑ", intro: 'Ο μεγαλύτερος διαγωνισμός στην Ελλάδα όπου συμμετέχουν οι κορυφαίοι barbers με αναγνωρισιμότητα σε παγκόσμιο επίπεδο. Ο διαγωνισμός πληρεί ευρωπαϊκές προδιαγραφές και κριτές είναι ξένοι αναγνωρισμένοι εκπαιδευτές από όλη την Ευρώπη. Δηλώστε συμμετοχή και διεκδικήστε τον τίτλο του "Best Barber of the Year 2026" και πλούσια δώρα.', cats: [{ name: "OLD SCHOOL HAIRCUT", time: "60 λεπτά", desc: "Θα διαγωνιστείς σε old school κούρεμα της επιλογής σου." }, { name: "MODERN BARBERING", time: "60 λεπτά", desc: "Θα διαγωνιστείς σε ένα modern haircut της επιλογής σου." }, { name: "FASTEST LOW FADE", time: "12 λεπτά", desc: "Αυτό το θέμα αφορά τον πιο γρήγορο και τον πιο καλό τεχνίτη." }, { name: "FREESTYLE TOTAL LOOK", time: "60 λεπτά", desc: "Θα διαγωνιστείς σε ελεύθερο θέμα χρησιμοποιώντας τη φαντασία σου." }], note: "Τα διαγωνιστικά θέματα είναι 4. Μπορείτε να δηλώσετε συμμετοχή σε ένα ή περισσότερα. Για τον τίτλο πρέπει τουλάχιστον 3 θέματα.", notes: ["Ακολουθούμε διεθνή πρότυπα. Δεν θα έχουμε καθρέπτες.", "Μοντέλα επαγγελματίες πληρώνουν γενική είσοδο.", "Μοντέλα εκτός κλάδου μπαίνουν δωρεάν.", "Δεν επιτρέπονται συνοδοί. (Α' βαθμού 20€)", "Ραντεβού με φωτογράφους σε προνομιακή τιμή.", "Δεν φέρουμε ευθύνη για απώλειες εργαλείων.", "Δικαίωμα αναδημοσίευσης φωτογραφιών.", "Δικαίωμα αλλαγής όρων."], contactNote: "Επικοινωνήστε: 27440-66437 & 6945977046 Μάρρα Ελένη" },
    program: { title: "ΠΡΟΓΡΑΜΜΑ ΚΕΝΤΡΙΚΗΣ ΣΚΗΝΗΣ", note: "*Το πρόγραμμα μπορεί να τροποποιηθεί χωρίς ειδοποίηση" },
    photos: { title: "ΦΩΤΟΓΡΑΦΙΕΣ", text: "Σας ευχαριστούμε! Κατεβάστε τις φωτογραφίες και μοιραστείτε τις. Ραντεβού στο 8ο GBF, 26-27 Απριλίου 2026, ΑΘΗΝΑ" },
    loc: { title: "ΤΟΠΟΘΕΣΙΑ", text: 'Το 8ο GBF θα πραγματοποιηθεί στους χώρους της "Κλωσταί Πεταλούδα", Παρ. Λεωφ. Κηφισσού 42, Αιγάλεω (δίπλα στο "CARTEL"). Μετρό: 11-12 λεπτά από Αιγάλεω/Ελαιώνας.', map: "Δείτε το χάρτη" },
    contact: { title: "ΕΠΙΚΟΙΝΩΝΙΑ", sub: "Επικοινωνήστε μαζί μας", info: "Greek Barber Festival\nΜάρρα Ελένη - Νεφέλη\nΤηλ. 27440 66437\nFax. 27440 66995\nΚιν. 6945 977046\ne-mail: eleni_marra@yahoo.gr", name: "Ονοματεπώνυμο", email: "E-mail", subject: "Θέμα", phone: "Τηλέφωνο", message: "Μήνυμα", send: "ΑΠΟΣΤΟΛΗ", success: "Σύντομα θα επικοινωνήσουμε!" },
    footer: { phones: "Τηλέφωνα Επικοινωνίας", follow: "Βρείτε μας & Ακολουθήστε μας", rights: "© 2026 Greek Barber Festival. Με επιφύλαξη παντός δικαιώματος." },
    days: "ΜΕΡΕΣ", hrs: "ΩΡΕΣ", notesTitle: "Σημαντικές Σημειώσεις",
  },
  en: {
    nav: { home: "HOME", tickets: "TICKETS", program: "PROGRAM", competition: "COMPETITION", photos: "PHOTOS", sponsors: "SPONSORS", contact: "CONTACT", location: "LOCATION" },
    hero: { badge: "8th GREEK BARBER FESTIVAL", date: "April 26–27, 2026", city: "ATHENS", venue: '"Kloste Petaluda" Factory', addr: "42 Par. Kifissou Ave., Egaleo", near: "(near Cartel Technospace)", cta: "GET YOUR TICKET", cta2: "ENTER COMPETITION" },
    about: { title: "The 8th Greek Barber Festival", motto: "Education — Evolution — Excellence", text: "The 8th Greek Barber Festival is the ultimate meeting point of barber culture in Greece. For 2 days, the iconic industrial spaces of the historic 'Kloste Petaluda' textile factory in Athens transform into a center of inspiration, education, and creation. Live demonstrations, educational seminars, and competitions create a unique experience of knowledge, inspiration, and professional growth." },
    edu: { title: "GUEST EDUCATORS 2026" }, sponsors: { title: "SPONSORS 8th GBF" },
    videos: { title: "AFTER MOVIES", v7: "After Movie — 7th GBF", v6: "After Movie — 6th GBF", v5: "After Movie — 5th GBF" },
    tickets: { title: "ADMISSION COST", presale: "Pre-sale until Feb 24, 2026", pro: "Professionals", proPrice1: "€160", proNote: "Shop Owners, Employees, Freelancers, Graduates.", student: "Students", studentPrice1: "€40", studentNote: "*Certificate required", crew: "Festival Crew Bonus", crew1: "3+ people €160 + 1 Marras Hair set/person", crew2: "5+ people €150 + 2 Marras Hair sets/person", genTitle: "General Admission", proPrice2: "€180", studentPrice2: "€50", crew3: "3+ people €180 + 1 set/person", crew4: "5+ people €180 + 2 sets/person", companion: "Companions (1st degree): €20", info: "Info: 27440-66437 - 6945977046" },
    comp: { title: "COMPETITION CATEGORIES", intro: 'The largest barber competition in Greece with worldwide recognition. European standards, international judges. Compete for "Best Barber of the Year 2026" and generous prizes.', cats: [{ name: "OLD SCHOOL HAIRCUT", time: "60 min", desc: "Compete with an old school haircut of your choice." }, { name: "MODERN BARBERING", time: "60 min", desc: "Compete with a modern haircut of your choice." }, { name: "FASTEST LOW FADE", time: "12 min", desc: "The fastest and most skilled craftsman." }, { name: "FREESTYLE TOTAL LOOK", time: "60 min", desc: "Compete freely using your imagination." }], note: "4 categories. Enter at least 3 for the title.", notes: ["International standards. No mirrors.", "Professional models pay admission.", "Non-industry models enter free.", "No companions. (1st degree: €20)", "Book festival photographers at special rates.", "No responsibility for tool loss.", "Photos may be used promotionally.", "Organizers may modify terms."], contactNote: "Contact: 27440-66437 & 6945977046 Marra Eleni" },
    program: { title: "MAIN STAGE PROGRAM", note: "*Program may change without notice" },
    photos: { title: "PHOTOS", text: "Thank you all! Download, like and share. See you at the 8th GBF, April 26-27, ATHENS" },
    loc: { title: "LOCATION", text: 'The 8th GBF takes place at "Kloste Petaluda" factory, 42 Par. Kifissou Ave., Egaleo. Metro: 11-12 min from Egaleo/Elaionas.', map: "View Map" },
    contact: { title: "CONTACT", sub: "Get in Touch", info: "Greek Barber Festival\nMarra Eleni - Nefeli\nTel. +30 27440 66437\nFax. +30 27440 66995\nMob. +30 6945 977046\ne-mail: eleni_marra@yahoo.gr", name: "Name", email: "E-mail", subject: "Subject", phone: "Phone", message: "Message", send: "SEND", success: "We'll contact you soon!" },
    footer: { phones: "Contact Numbers", follow: "Find & Follow us", rights: "© 2026 Greek Barber Festival. All rights reserved." },
    days: "DAYS", hrs: "HRS", notesTitle: "Important Notes",
  },
  fr: {
    nav: { home: "ACCUEIL", tickets: "BILLETS", program: "PROGRAMME", competition: "COMPÉTITION", photos: "PHOTOS", sponsors: "SPONSORS", contact: "CONTACT", location: "LIEU" },
    hero: { badge: "8e GREEK BARBER FESTIVAL", date: "26–27 Avril 2026", city: "ATHÈNES", venue: 'Usine "Kloste Petaluda"', addr: "42 Av. Par. Kifissou, Egaleo", near: "(près du Cartel)", cta: "ACHETER", cta2: "S'INSCRIRE" },
    about: { title: "Le 8e Greek Barber Festival", motto: "Éducation — Évolution — Excellence", text: "Le 8e Greek Barber Festival est le point de rencontre de la culture barbier en Grèce. Pendant 2 jours, les espaces industriels de l'usine «Kloste Petaluda» deviennent un centre d'inspiration, d'éducation et de création." },
    edu: { title: "ÉDUCATEURS INVITÉS 2026" }, sponsors: { title: "SPONSORS 8e GBF" },
    videos: { title: "AFTER MOVIES", v7: "After Movie — 7e GBF", v6: "After Movie — 6e GBF", v5: "After Movie — 5e GBF" },
    tickets: { title: "COÛT D'ENTRÉE", presale: "Prévente jusqu'au 24/02/2026", pro: "Professionnels", proPrice1: "160 €", proNote: "Propriétaires, Employés, Freelancers.", student: "Étudiants", studentPrice1: "40 €", studentNote: "*Certificat requis", crew: "Crew Bonus", crew1: "3+ pers. 160€ + 1 coffret Marras Hair", crew2: "5+ pers. 150€ + 2 coffrets Marras Hair", genTitle: "Entrée Générale", proPrice2: "180 €", studentPrice2: "50 €", crew3: "3+ pers. 180€ + 1 coffret", crew4: "5+ pers. 180€ + 2 coffrets", companion: "Accompagnants (1er degré): 20 €", info: "Info: 27440-66437" },
    comp: { title: "CATÉGORIES", intro: "Le plus grand concours barbier en Grèce. Standards européens, juges internationaux.", cats: [{ name: "OLD SCHOOL HAIRCUT", time: "60 min", desc: "Coupe old school au choix." }, { name: "MODERN BARBERING", time: "60 min", desc: "Coupe moderne au choix." }, { name: "FASTEST LOW FADE", time: "12 min", desc: "Le plus rapide et habile." }, { name: "FREESTYLE TOTAL LOOK", time: "60 min", desc: "Thème libre." }], note: "4 catégories. Min. 3 pour le titre.", notes: ["Standards internationaux, pas de miroirs.", "Modèles pro paient l'entrée.", "Modèles non-pro: gratuit.", "Pas d'accompagnants. (20€)", "Photos/vidéos disponibles.", "Aucune responsabilité pour outils.", "Photos publiables.", "Droit de modification."], contactNote: "Contact: 27440-66437 Marra Eleni" },
    program: { title: "PROGRAMME", note: "*Peut être modifié sans préavis" },
    photos: { title: "PHOTOS", text: "Merci à tous! Téléchargez et partagez. RDV au 8e GBF!" },
    loc: { title: "LIEU", text: "Le 8e GBF à l'usine «Kloste Petaluda», Egaleo. Métro accessible.", map: "Voir la carte" },
    contact: { title: "CONTACT", sub: "Contactez-nous", info: "Greek Barber Festival\nMarra Eleni\nTél. +30 27440 66437\ne-mail: eleni_marra@yahoo.gr", name: "Nom", email: "E-mail", subject: "Sujet", phone: "Téléphone", message: "Message", send: "ENVOYER", success: "Nous vous contacterons!" },
    footer: { phones: "Numéros", follow: "Suivez-nous", rights: "© 2026 Greek Barber Festival." },
    days: "JOURS", hrs: "HEURES", notesTitle: "Notes Importantes",
  },
  es: {
    nav: { home: "INICIO", tickets: "ENTRADAS", program: "PROGRAMA", competition: "COMPETICIÓN", photos: "FOTOS", sponsors: "PATROCINADORES", contact: "CONTACTO", location: "UBICACIÓN" },
    hero: { badge: "8º GREEK BARBER FESTIVAL", date: "26–27 Abril 2026", city: "ATENAS", venue: 'Fábrica "Kloste Petaluda"', addr: "42 Av. Par. Kifissou, Egaleo", near: "(cerca de Cartel)", cta: "COMPRAR", cta2: "INSCRÍBETE" },
    about: { title: "El 8º Greek Barber Festival", motto: "Educación — Evolución — Excelencia", text: "El 8º Greek Barber Festival es el punto de encuentro de la cultura barbera en Grecia. Durante 2 días, los espacios industriales de la fábrica «Kloste Petaluda» se transforman en centro de inspiración y creación." },
    edu: { title: "EDUCADORES INVITADOS 2026" }, sponsors: { title: "PATROCINADORES 8º GBF" },
    videos: { title: "AFTER MOVIES", v7: "After Movie — 7º GBF", v6: "After Movie — 6º GBF", v5: "After Movie — 5º GBF" },
    tickets: { title: "COSTE DE ENTRADA", presale: "Preventa hasta 24/02/2026", pro: "Profesionales", proPrice1: "160 €", proNote: "Propietarios, Empleados, Freelancers.", student: "Estudiantes", studentPrice1: "40 €", studentNote: "*Certificado requerido", crew: "Crew Bonus", crew1: "3+ personas 160€ + 1 set Marras Hair", crew2: "5+ personas 150€ + 2 sets Marras Hair", genTitle: "Entrada General", proPrice2: "180 €", studentPrice2: "50 €", crew3: "3+ personas 180€ + 1 set", crew4: "5+ personas 180€ + 2 sets", companion: "Acompañantes (1er grado): 20 €", info: "Info: 27440-66437" },
    comp: { title: "CATEGORÍAS", intro: "La mayor competición barbera en Grecia con reconocimiento internacional.", cats: [{ name: "OLD SCHOOL HAIRCUT", time: "60 min", desc: "Corte old school a elección." }, { name: "MODERN BARBERING", time: "60 min", desc: "Corte moderno a elección." }, { name: "FASTEST LOW FADE", time: "12 min", desc: "El más rápido y hábil." }, { name: "FREESTYLE TOTAL LOOK", time: "60 min", desc: "Tema libre." }], note: "4 categorías. Min. 3 para el título.", notes: ["Estándares internacionales, sin espejos.", "Modelos pro pagan entrada.", "Modelos no-pro: gratis.", "Sin acompañantes. (20€)", "Fotos/vídeos disponibles.", "Sin responsabilidad por herramientas.", "Fotos publicables.", "Derecho a modificar."], contactNote: "Contacto: 27440-66437 Marra Eleni" },
    program: { title: "PROGRAMA", note: "*Puede cambiar sin aviso" },
    photos: { title: "FOTOS", text: "¡Gracias! Descarguen y compartan. ¡Nos vemos en el 8º GBF!" },
    loc: { title: "UBICACIÓN", text: 'El 8º GBF en "Kloste Petaluda", Egaleo. Metro accesible.', map: "Ver mapa" },
    contact: { title: "CONTACTO", sub: "Contáctanos", info: "Greek Barber Festival\nMarra Eleni\nTel. +30 27440 66437\ne-mail: eleni_marra@yahoo.gr", name: "Nombre", email: "E-mail", subject: "Asunto", phone: "Teléfono", message: "Mensaje", send: "ENVIAR", success: "¡Pronto contactaremos!" },
    footer: { phones: "Teléfonos", follow: "Síguenos", rights: "© 2026 Greek Barber Festival." },
    days: "DÍAS", hrs: "HORAS", notesTitle: "Notas Importantes",
  },
  de: {
    nav: { home: "START", tickets: "TICKETS", program: "PROGRAMM", competition: "WETTBEWERB", photos: "FOTOS", sponsors: "SPONSOREN", contact: "KONTAKT", location: "ORT" },
    hero: { badge: "8. GREEK BARBER FESTIVAL", date: "26.–27. April 2026", city: "ATHEN", venue: 'Fabrik "Kloste Petaluda"', addr: "42 Par. Kifissou, Egaleo", near: "(nahe Cartel)", cta: "TICKET KAUFEN", cta2: "ANMELDEN" },
    about: { title: "Das 8. Greek Barber Festival", motto: "Bildung — Entwicklung — Exzellenz", text: "Das 8. Greek Barber Festival ist der Treffpunkt der Barber-Kultur in Griechenland. 2 Tage, in denen die Fabrik «Kloste Petaluda» in Athen zum Zentrum für Inspiration und Kreation wird." },
    edu: { title: "GASTAUSBILDER 2026" }, sponsors: { title: "SPONSOREN 8. GBF" },
    videos: { title: "AFTER MOVIES", v7: "After Movie — 7. GBF", v6: "After Movie — 6. GBF", v5: "After Movie — 5. GBF" },
    tickets: { title: "EINTRITTSKOSTEN", presale: "Vorverkauf bis 24.02.2026", pro: "Professionelle", proPrice1: "160 €", proNote: "Besitzer, Angestellte, Freelancer.", student: "Studenten", studentPrice1: "40 €", studentNote: "*Bescheinigung erforderlich", crew: "Crew Bonus", crew1: "3+ Pers. 160€ + 1 Marras Hair Set", crew2: "5+ Pers. 150€ + 2 Sets", genTitle: "Allgemeiner Eintritt", proPrice2: "180 €", studentPrice2: "50 €", crew3: "3+ Pers. 180€ + 1 Set", crew4: "5+ Pers. 180€ + 2 Sets", companion: "Begleitpersonen (1. Grad): 20 €", info: "Info: 27440-66437" },
    comp: { title: "KATEGORIEN", intro: "Der größte Barber-Wettbewerb in Griechenland mit internationaler Anerkennung.", cats: [{ name: "OLD SCHOOL HAIRCUT", time: "60 Min", desc: "Old-School-Schnitt nach Wahl." }, { name: "MODERN BARBERING", time: "60 Min", desc: "Moderner Schnitt nach Wahl." }, { name: "FASTEST LOW FADE", time: "12 Min", desc: "Der Schnellste und Geschickteste." }, { name: "FREESTYLE TOTAL LOOK", time: "60 Min", desc: "Freies Thema." }], note: "4 Kategorien. Min. 3 für den Titel.", notes: ["Internationale Standards, keine Spiegel.", "Pro Models zahlen Eintritt.", "Nicht-pro Models: frei.", "Keine Begleitpersonen. (20€)", "Fotos/Videos verfügbar.", "Keine Haftung für Werkzeuge.", "Fotos nutzbar.", "Änderungsrecht."], contactNote: "Kontakt: 27440-66437 Marra Eleni" },
    program: { title: "HAUPTBÜHNE", note: "*Kann sich ändern" },
    photos: { title: "FOTOS", text: "Danke! Laden und teilen Sie. Bis zum 8. GBF!" },
    loc: { title: "ORT", text: 'Das 8. GBF in der Fabrik "Kloste Petaluda", Egaleo. Per Metro erreichbar.', map: "Karte" },
    contact: { title: "KONTAKT", sub: "Kontakt", info: "Greek Barber Festival\nMarra Eleni\nTel. +30 27440 66437\ne-mail: eleni_marra@yahoo.gr", name: "Name", email: "E-Mail", subject: "Betreff", phone: "Telefon", message: "Nachricht", send: "SENDEN", success: "Wir melden uns!" },
    footer: { phones: "Kontaktnummern", follow: "Folgen Sie uns", rights: "© 2026 Greek Barber Festival." },
    days: "TAGE", hrs: "STD", notesTitle: "Wichtige Hinweise",
  },
  ar: {
    nav: { home: "الرئيسية", tickets: "التذاكر", program: "البرنامج", competition: "المسابقة", photos: "الصور", sponsors: "الرعاة", contact: "اتصل بنا", location: "الموقع" },
    hero: { badge: "المهرجان الثامن", date: "٢٦–٢٧ أبريل ٢٠٢٦", city: "أثينا", venue: 'مصنع "كلوستي بيتالودا"', addr: "٤٢ كيفيسو، إيغاليو", near: "(قرب كارتل)", cta: "احصل على تذكرة", cta2: "سجّل" },
    about: { title: "المهرجان الثامن", motto: "تعليم — تطور — تميّز", text: "مهرجان الحلاقين اليوناني الثامن هو نقطة الالتقاء لثقافة الحلاقة في اليونان. لمدة يومين، تتحول المساحات الصناعية إلى مركز للإلهام والتعليم." },
    edu: { title: "المدربون ٢٠٢٦" }, sponsors: { title: "الرعاة" },
    videos: { title: "أفلام المهرجان", v7: "فيلم — السابع", v6: "فيلم — السادس", v5: "فيلم — الخامس" },
    tickets: { title: "تكلفة الدخول", presale: "مسبق حتى ٢٤/٠٢", pro: "محترفون", proPrice1: "١٦٠€", proNote: "أصحاب المحلات، الموظفون", student: "طلاب", studentPrice1: "٤٠€", studentNote: "*شهادة مطلوبة", crew: "مكافأة الطاقم", crew1: "+٣ أشخاص ١٦٠€ + ١ مجموعة", crew2: "+٥ أشخاص ١٥٠€ + ٢ مجموعة", genTitle: "دخول عام", proPrice2: "١٨٠€", studentPrice2: "٥٠€", crew3: "+٣ ١٨٠€ + ١", crew4: "+٥ ١٨٠€ + ٢", companion: "مرافقون: ٢٠€", info: "معلومات: 27440-66437" },
    comp: { title: "فئات المسابقة", intro: "أكبر مسابقة حلاقة في اليونان.", cats: [{ name: "OLD SCHOOL", time: "٦٠ د", desc: "قصة كلاسيكية." }, { name: "MODERN", time: "٦٠ د", desc: "قصة عصرية." }, { name: "FASTEST FADE", time: "١٢ د", desc: "الأسرع." }, { name: "FREESTYLE", time: "٦٠ د", desc: "موضوع حر." }], note: "٤ فئات. ٣ للقب.", notes: ["بدون مرايا.", "نماذج مهنية تدفع.", "غير مهنية: مجاني.", "بدون مرافقين.", "صور متاحة.", "لا مسؤولية.", "حق النشر.", "حق التعديل."], contactNote: "تواصل: 27440-66437" },
    program: { title: "البرنامج", note: "*قابل للتغيير" },
    photos: { title: "صور", text: "شكراً! حملوا وشاركوا." },
    loc: { title: "الموقع", text: "في مصنع كلوستي بيتالودا. متاح بالمترو.", map: "خريطة" },
    contact: { title: "اتصل", sub: "تواصل", info: "Greek Barber Festival\nMarra Eleni\n+30 27440 66437\neleni_marra@yahoo.gr", name: "الاسم", email: "بريد", subject: "موضوع", phone: "هاتف", message: "رسالة", send: "إرسال", success: "سنتواصل قريباً!" },
    footer: { phones: "أرقام", follow: "تابعونا", rights: "© ٢٠٢٦ GBF." },
    days: "أيام", hrs: "ساعات", notesTitle: "ملاحظات مهمة",
  },
};
