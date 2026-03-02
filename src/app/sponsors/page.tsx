import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

const SPONSORS = [
  {
    name: "High Hair / Farmavita",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_471e976778f74ce4889a298051082e37~mv2.jpg/v1/fill/w_200,h_200,al_c,q_80,enc_avif,quality_auto/Men_Stories_Logo_Noir_Final_Vectoris%C3%A9_jp.jpg", alt: "Men Stories", dark: true, link: "https://farmavita.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_43033eeaaddb4a47b17ea7b979b1c456~mv2.png/v1/fill/w_315,h_92,al_c,q_85,enc_avif,quality_auto/Farmavita_logo_image_picture.png", alt: "Farmavita", dark: false, link: null },
    ],
    description: "Η Εταιρεία High Hair δραστηριοποιείται εδώ και αρκετά χρόνια στον τομέα των επαγγελματικών ειδών & εξοπλισμού για κομμωτήρια και είναι αποκλειστικός αντιπρόσωπος της ιταλικής εταιρείας Farmavita στην Ελλάδα, που εδώ και 30 χρόνια παράγει στο εργοστάσιό της, λίγο έξω από το Μιλάνο, επαγγελματικά προϊόντα περιποίησης μαλλιών, εμπλουτισμένα με φυσικά, ενεργά συστατικά. Από το 2016 είναι αποκλειστικός αντιπρόσωπος της εταιρείας Canni, επαγγελματικό ημιμόνιμο βερνίκι υψηλής ποιότητας και προδιαγραφών.",
    website: "https://farmavita.gr/",
    websiteLabel: "www.farmavita.gr",
  },
  {
    name: "Salontech",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_1e742648a2bd417f848262f22e18afd5~mv2_d_4604_1659_s_2.jpg/v1/fill/w_377,h_136,al_c,q_80,enc_avif,quality_auto/salon%20tech_JPG.jpg", alt: "Salontech", dark: false, link: "http://www.salontech.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_eb9fc652c7fe4ffd88162fb1e1456f8b~mv2.png/v1/fill/w_205,h_45,al_c,q_85,enc_avif,quality_auto/slick%20gorilla.png", alt: "Slick Gorilla", dark: true, link: "http://www.salontech.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_eb55dc14281d4962949a311d9092aac6~mv2.png/v1/fill/w_209,h_45,al_c,q_85,enc_avif,quality_auto/lv3.png", alt: "LV3", dark: true, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_b65516ff01dc4d089f30e37bde7490d0~mv2.png/v1/fill/w_189,h_57,al_c,q_85,enc_avif,quality_auto/JACKBONE%20LOGO%20LETTERS.png", alt: "JACKBONE", dark: true, link: "http://www.salontech.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_260d86f785f64a7783504003423f978f~mv2.jpg/v1/fill/w_142,h_142,al_c,q_80,enc_avif,quality_auto/matakki.jpg", alt: "Matakki", dark: false, link: "http://www.salontech.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_51df67e3ea3e4e95a4939c4ec01df387~mv2.png/v1/fill/w_214,h_86,al_c,q_85,enc_avif,quality_auto/caliber.png", alt: "Caliber", dark: true, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_a972c84c23654fef90628e0a413e5d75~mv2.jpg/v1/fill/w_142,h_142,al_c,q_80,enc_avif,quality_auto/andis.jpg", alt: "Andis", dark: false, link: "http://www.salontech.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_2221fc4dd0ab492aafee32fc4f25eb08~mv2.jpg/v1/fill/w_324,h_103,al_c,q_80,enc_avif,quality_auto/maquina-de-corte-trimmer-stealth-babylis.jpg", alt: "BaByliss", dark: false, link: "http://www.salontech.gr/" },
    ],
    description: "Η εταιρεία Salontech από το 2016 προσφέρει είδη κομμωτηρίου και ομορφιάς, προϊόντα barber, εξοπλισμός κουρείου, studio αισθητικής, μακιγιάζ και ονυχοπλαστικής. Βρείτε ότι χρειάζεστε για να καλύψετε κάθε επαγγελματική σας ανάγκη στο χώρο της ομορφιάς. Μέσα από την μεγαλύτερη συλλογή σε επαγγελματικά προϊόντα κομμωτικής είδη αισθητικής, νυχιών και μακιγιάζ. Στις καλύτερες τιμές και με συνεχή after sales υποστήριξη.",
    website: "https://salontech.gr/",
    websiteLabel: "www.salontech.gr",
  },
  {
    name: "Smart Vacuum",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_b03379d4d74f4deeaf1df6143c499448~mv2_d_4602_1658_s_2.jpg/v1/fill/w_380,h_137,al_c,q_80,enc_avif,quality_auto/smart%20vacuum_JPG.jpg", alt: "Smart Vacuum", dark: false, link: "http://www.smartvacuum.gr" },
      { src: "https://static.wixstatic.com/media/335ee3_575d044153ab448bad18afa407a52776~mv2_d_4595_1659_s_2.jpg/v1/fill/w_379,h_137,al_c,q_80,enc_avif,quality_auto/smart_JPG.jpg", alt: "Smart", dark: false, link: "http://www.smartvacuum.gr" },
    ],
    description: "H smartvacuum είναι απαραίτητη σε ένα κομμωτήριο όπως το ψαλίδι. Εφ όσον ο κομμωτής τελειώσει το κούρεμα για να πάει να πάρει το φαράσι και τη σκούπα να γυρίσει να σκουπίσει να σκύψει να μαζέψει τις τρίχες να πάει να τις πετάξει και να ξαναγυρίσει στον πελάτη έχει κάνει ήδη τουλάχιστον 60 βήματα, και δύο σκυψίματα που σημαίνει ότι για 10 πελάτες τη μέρα έχει κάνει 600 βήματα και έχει σκύψει με ανορθόδοξο τρόπο 20 φορές, που σημαίνει ότι επιβαρύνει τις αρθρώσεις και τη μέση και με την πάροδο του χρόνου ένα πρόβλημα της μέσης μπορεί να τον απομακρύνει από το κομμωτήριο ακόμα και ένα μήνα που σημαίνει κλείσιμο της επιχείρησης.",
    website: "http://www.smartvacuum.gr/",
    websiteLabel: "www.smartvacuum.gr",
  },
  {
    name: "HairLand Bachatouri",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_3e404e356cad4c978c7d605ba34c2d3c~mv2_d_4602_1658_s_2.jpg/v1/fill/w_380,h_137,al_c,q_80,enc_avif,quality_auto/bachatouris_JPG.jpg", alt: "Bachatouris", dark: false, link: "https://www.facebook.com/hairland.bachatouri" },
      { src: "https://static.wixstatic.com/media/335ee3_4a5dee5f4d5e4c8692fc424ec7d603c2~mv2.png/v1/fill/w_243,h_81,al_c,q_85,enc_avif,quality_auto/Kopia%20av%20Noberu_Black.png", alt: "Noberu", dark: true, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_0e7ec5013b7844d69c6eaef09b0e5c19~mv2_d_4595_1659_s_2.jpg/v1/fill/w_257,h_93,al_c,q_80,enc_avif,quality_auto/morgan%27s_JPG.jpg", alt: "Morgan's", dark: false, link: "https://www.facebook.com/hairland.bachatouri" },
    ],
    description: "Στο e-shop της εταιρείας HairLand Bachatouri θα βρείτε πάνω από 6000 διαθέσιμα προϊόντα και εξοπλισμό που χρειάζεται ένα κομμωτήριο, ένα Barber Shop αλλά και ένα κέντρο αισθητικής. Είμαστε πάντα στην διάθεση σας να σας βοηθήσουμε και να σας εξυπηρετήσουμε ηλεκτρονικά αλλά και από τα καταστήματα μας στην Βασιλίσσης Όλγας 48 και Κων. Καραμανλή 133, Θεσσαλονίκη. Δίπλα σας 35 χρόνια από το 1987 με σεβασμό πάντα στον πελάτη!",
    website: "https://www.beautycompany.gr/",
    websiteLabel: "www.beautycompany.gr",
  },
  {
    name: "Hall of Beauty",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_2295c7fa1ec24e0da4664e26641a17b4~mv2.jpeg/v1/crop/x_43,y_211,w_1100,h_404/fill/w_382,h_141,al_c,q_80,enc_avif,quality_auto/LOGO-FINAL%20(1).jpeg", alt: "Hall of Beauty Logo", dark: true, link: "https://hallofbeauty.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_97efd67833c3489e9b4b58f937cf3a41~mv2.jpg/v1/fill/w_140,h_141,al_c,q_80,enc_avif,quality_auto/hall%20of%20beautty%20logo%20final%20(1).jpg", alt: "Hall of Beauty", dark: false, link: "https://hallofbeauty.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_4d3d4e770dc447eaaf81e470fb8cdec1~mv2.png/v1/crop/x_13,y_75,w_201,h_75/fill/w_192,h_71,al_c,q_85,enc_avif,quality_auto/images.png", alt: "Images", dark: true, link: "https://hallofbeauty.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_c9694b9748924532bc5598372caeb7b2~mv2.png/v1/fill/w_140,h_140,al_c,q_85,enc_avif,quality_auto/%CE%B1%CF%81%CF%87%CE%B5%CE%AF%CE%BF%20%CE%BB%CE%AE%CF%88%CE%B7%CF%82.png", alt: "Poppin Yang", dark: true, link: "https://hallofbeauty.gr/" },
    ],
    description: "Η εταιρεία Hall of Beauty εξειδικεύεται στο εμπόριο ειδών κομμωτηρίων και κουρείων. Παραγωγός της ελληνικής εταιρείας με προϊόντα styling Poppin'Yang καθώς επίσης και αντιπρόσωπος μεγάλων brand του εξωτερικού. Μπορείτε να προμηθευτείτε τα προϊόντα μέσω του e-shop ή σε επιλεγμένα κομμωτήρια και κουρεία.",
    website: "https://hallofbeauty.gr/",
    websiteLabel: "www.hallofbeauty.gr",
  },
  {
    name: "Kirios Barber Luxury",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_265110243b9a4e15afed4957326c0d37~mv2.png/v1/fill/w_205,h_205,al_c,q_85,enc_avif,quality_auto/Kirios.png", alt: "Kirios", dark: true, link: "https://www.kirios.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_bfc84e6c5c1a46ab8350ba0fa50f24a2~mv2.jpg/v1/fill/w_408,h_102,al_c,q_80,enc_avif,quality_auto/Black-Elegant-Exclusive-Collection-Etsy-Shop-Cover-(4).jpg", alt: "Kirios Banner", dark: false, link: "https://www.kirios.gr/" },
    ],
    description: "O Kirios Barber Luxury είναι ένα μοναδικό Brand στα επαγγελματικά ρούχα Barber Shop και Κομμωτηρίου. Με έδρα την όμορφη Θεσσαλονίκη, ιδρύθηκε το 2017, έχει εξελιχθεί και αποτελεί σήμερα ένα από τα μεγαλύτερα brands σε επαγγελματική ένδυση, με πελάτες σε όλο τον κόσμο. Ο Kirios περήφανα ντύνει ένα μεγάλο αριθμό Ελλήνων και διεθνώς καταξιωμένων Barbers. Και όσο παθιασμένοι είναι οι κορυφαίοι Barbers με την τέχνη τους, το ίδιο παθιασμένα σχεδιάζει και δημιουργεί ρούχα για να αναδείξει την προσωπικότητα τους. Γιατί πιστεύει ότι το πραγματικά καλύτερο αποτέλεσμα έρχεται μόνο αν γίνεται μέσα από το πάθος για εξέλιξη. O Kirios κατάφερε να εμπνεύσει τους επιχειρηματίες του Barbering και το προσωπικό τους να βγάζουν τον καλλιτεχνικό εαυτό τους, με τις μοναδικές ενδυματολογικές προτάσεις του. Part of your Life. Together we break the rules.",
    website: "https://www.kirios.gr/",
    websiteLabel: "www.kirios.gr",
  },
  {
    name: "Extreme Barber Store",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_28a0e3e5b5c64b7bbc824d51ef255a74~mv2.jpg/v1/fill/w_379,h_120,al_c,q_80,enc_avif,quality_auto/extremebarberstore-logo-black.jpg", alt: "Extreme Barber Store", dark: false, link: "https://extremebarberstore.com/en/" },
    ],
    description: "Το Extreme Barber Store φτιάχτηκε απο κομμωτές για κομμωτές. Δεν είμαστε έμποροι αλλά απλοί κομμωτές, που ζούμε και εργαζόμαστε στον ίδιο χώρο με εσάς! Γι' αυτό αποφασίσαμε να δημιουργήσουμε έναν ιστότοπο με ξεχωριστά σε σχεδιασμό προϊόντα μοναδικά και ιδιαίτερα. Με την περιήγηση σας στο κατάστημα μας θα καταλάβετε πόσο διαφορετικοί και μοναδικοί μπορείτε να γίνετε αγοράζοντας τα προϊόντα μας. Σε εμάς θα βρείτε μεγάλη ποικιλία επαγγελματικού εξοπλισμού κομμωτηρίου που θα σας ξεχωρίζει στις υπηρεσίες που προσφέρετε στους πελάτες σας. Η κομμωτική είναι φαντασία, έμπνευση, καινοτομία, δημιουργικότητα. Τολμήστε, βγάλτε αυτό που σας εκφράζει μέσα από τον εξοπλισμό σας! Αναδείξτε το!",
    website: "https://extremebarberstore.com/",
    websiteLabel: "www.extremebarberstore.com",
  },
  {
    name: "Liros Cosmetics - Bioshev Professional",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_ed27714d921443b7a5ed0eaf688651fd~mv2.png/v1/fill/w_273,h_89,al_c,lg_1,q_85,enc_avif,quality_auto/logo.png", alt: "Liros Cosmetics", dark: true, link: "https://www.liroscosmetics.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_6a41211137864b0fb503812e4040769e~mv2.jpg/v1/fill/w_257,h_126,al_c,q_80,enc_avif,quality_auto/liros%20cosmetics%20logo.jpg", alt: "Liros Cosmetics Logo", dark: false, link: "https://www.liroscosmetics.gr/" },
    ],
    description: "Η εταιρεία Liros Cosmetics - Bioshev Professional ιδρύθηκε το 1992 με αντικείμενο τη παραγωγή επαγγελματικών προϊόντων περιποίησης μαλλιών και σώματος. Είναι αμιγώς ελληνική επιχείρηση και τα προϊόντα της εξυπηρετούν τις ανάγκες του σύγχρονου επαγγελματία. Η ποιότητα των προϊόντων και οι συσκευασίες ανταποκρίνονται πλήρως στη νέα ελληνική και παγκόσμια οικονομική πραγματικότητα. Λαμβάνει μέρος σε όλες τις επαγγελματικές εκθέσεις σε Ελλάδα και εξωτερικό. Προσφέρει απλόχερα τεχνογνωσία και μεθόδους εργασίας σε πελάτες αλλά και σε σπουδαστές ιδιωτικών και επαγγελματικών ΙΕΚ & ΕΠΑΛ. Επίσης προσφέρει ένα επιτυχημένο μοντέλο franchise για όσους επιθυμούν να δραστηριοποιηθούν επαγγελματικά στο χώρο της ομορφιάς.",
    website: "https://www.liroscosmetics.gr/",
    websiteLabel: "www.liroscosmetics.gr",
  },
  {
    name: "Bandido",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_446215c0cba64e6792d4ba4763df407e~mv2.jpg/v1/fill/w_208,h_285,al_c,q_80,enc_avif,quality_auto/Bandido-barbershop2-1.jpg", alt: "Bandido", dark: false, link: "https://bandidocosmetics.gr/" },
    ],
    description: "Καλωσήρθατε στην οικογένεια της Bandido. Την πιο αναπτυσσόμενη εταιρία στο χώρο της αντρικής κοσμετολογίας. Τα προϊόντα μας σχεδιάζονται στα γραφεία μας στο Βέλγιο, μόλις 40 χλμ βόρεια των Βρυξελλών, ενώ η παραγωγή τους ολοκληρώνεται μερικά χιλιόμετρα δυτικά της Κωνσταντινούπολης. Η διανομή των προϊόντων μας γίνεται σε περισσότερες από 71 χώρες σε όλες τις ηπείρους. Όλα τα προϊόντα μας παράγονται σύμφωνα με τα γερμανικά πρότυπα. Οι αυστηροί έλεγχοι κατά την παραγωγική μας διαδικασία και οι μοναδικές συνθέσεις μας συντελούν στην δημιουργία προϊόντων υψηλών προδιαγραφών. Στην Bandido ικανοποιούμε κάθε ανάγκη που αφορά την αντρική περιποίηση και τις τελευταίες τάσεις της μόδας. Το μήνυμα μας: Δημιουργούμε προϊόντα για τους πελάτες μας και όχι πελάτες για τα προϊόντα μας.",
    website: "https://bandidocosmetics.gr/",
    websiteLabel: "www.bandidocosmetics.gr",
  },
  {
    name: "Rainbow Beauty",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_b1a307859bf5488c97b74b2ff28ac4ae~mv2.jpg/v1/fill/w_376,h_148,al_c,q_80,enc_avif,quality_auto/RAINBOW_LOGO.jpg", alt: "Rainbow Beauty", dark: false, link: "https://rainbowbeauty.gr/" },
    ],
    description: "Η Rainbow Beauty είναι μια εταιρεία λιανικής και χονδρικής πώλησης προϊόντων φροντίδας και περιποίησης. Σκοπός μας είναι να παρέχουμε τα καλύτερα προϊόντα φυσικής προέλευσης και μοναδικής αισθητικής στο γυναικείο και το ανδρικό κοινό. Αποστολή μας είναι η άμεση και αποτελεσματική θεραπεία για τα μαλλιά και το δέρμα. Κάθε προϊόν στοχεύει στην αναζωογόνηση και την αναδόμηση των κυττάρων του σώματος και της κεφαλής. Διαφορετικά είδη για διαφορετικές ανάγκες, από styling και hair-forming μέχρι και προϊόντα καθημερινής χρήσης, η Rainbow beauty βρίσκεται στη διάθεσή σας για οποιαδήποτε παραγγελία. Δεν θα μπορούσαμε φυσικά να παραλείψουμε και τη μεγάλη ποικιλία βερνικιών για τα νύχια, την οποία ανανεώνουμε ανά τις εποχικές τάσεις. Όλα μας τα προϊόντα είναι φτιαγμένα με υλικά άριστης ποιότητας, κατάλληλα για όλους τους τύπους δέρματος και έτοιμα να σάς ανανεώσουν με τη φρεσκάδα τους. Θυμηθείτε, η ομορφιά βγαίνει σε όλα τα χρώματα!",
    website: "https://rainbowbeauty.gr/",
    websiteLabel: "www.rainbowbeauty.gr",
  },
  {
    name: "Natural Care Pro",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_ffd0cd7bba384795b71d3cb10fe6ceff~mv2.png/v1/fill/w_388,h_123,al_c,q_85,enc_avif,quality_auto/LOGO%20NATURAL-680x214%201-460x146w.png", alt: "Natural Care Pro", dark: true, link: "https://www.naturalcarepro.gr/" },
    ],
    description: "Η εταιρεία ιδρύθηκε το 1999 από νέους ανθρώπους άριστους γνώστες της ελληνικής αγοράς με κοινά οράματα και φιλοδοξίες. Εισάγουμε και διανέμουμε στην ελληνική αγορά προϊόντα υψηλής ποιότητας και αισθητικής που καλύπτουν απόλυτα τις ανάγκες των επαγγελματιών και των καταναλωτών και σέβονται τον άνθρωπο και το περιβάλλον. Συνεργαζόμαστε με κορυφαίες Ευρωπαϊκές και Ελληνικές Εταιρείες και εξασφαλίζουμε ποιοτικά και καινοτόμα προϊόντα.",
    website: "https://www.naturalcarepro.gr/",
    websiteLabel: "www.naturalcarepro.gr",
  },
  {
    name: "Under The Skin Tattoo Crew",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_b29581101b83437aa443380fc7b8bf10~mv2.jpg/v1/fill/w_233,h_233,al_c,q_80,enc_avif,quality_auto/logo_471.jpg", alt: "Under The Skin", dark: false, link: "https://www.undertheskintattoocrew.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_f903fecd5cc445169a1b50b155cd96c9~mv2.jpg/v1/fill/w_217,h_158,al_c,q_80,enc_avif,quality_auto/IMG_20230515_202250%20(2).jpg", alt: "UTSTC Merch", dark: false, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_eb2efed50184448b8e7e26627ea99445~mv2.jpg/v1/fill/w_200,h_193,al_c,q_80,enc_avif,quality_auto/IMG_20230515_202318%20(1).jpg", alt: "UTSTC Products", dark: false, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_4f2f479699054374bba46f5d50696478~mv2.jpg/v1/fill/w_173,h_171,al_c,q_80,enc_avif,quality_auto/IMG_20230515_202240%20(1).jpg", alt: "UTSTC Item", dark: false, link: null },
    ],
    description: "Το Under The Skin είναι ένα traditional tattoo shop στην πόλη της Ιαλυσού. Μια πλούσια συλλογή από παραδοσιακά σχέδια περιμένουν όλους εσάς που δεν ψάχνετε την λέξη \"μόδα\" στο tattoo. Σε εμάς θα βρείτε το επίσημο merch του UTSTC (ρούχα & αξεσουάρ). Κρέμες aftercare Urban Legend για την ομαλή επούλωση των tattoo σας και φυσικά την αγαπημένη σας γεύση Monster για να σας δώσει την ενέργεια που χρειάζεστε πριν από κάθε tattoo.",
    website: "https://www.undertheskintattoocrew.gr/",
    websiteLabel: "www.undertheskintattoocrew.gr",
  },
  {
    name: "Criminals Grooming",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_c5b4c12c8b724d129b75ba5b48e0c951~mv2.jpg/v1/fill/w_282,h_169,al_c,q_80,enc_avif,quality_auto/criminals%20logo%20%20jpeg.jpg", alt: "Criminals Grooming", dark: false, link: "https://criminals.com.gr/" },
    ],
    description: "Η ομάδα -ή ευστοχότερα- η οικογένεια του Criminals Grooming, έρχεται στον χώρο της αντρικής περιποίησης με προϊόντα υψηλών προδιαγραφών για να θέσει καινούργιες βάσεις. Οι άνθρωποι πίσω από αυτήν την εταιρεία, έχουν μεγαλώσει μέσα στον χώρο του καλλωπισμού. Παρουσιάζουν λοιπόν, την δική τους ολοκληρωμένη σειρά προϊόντων περιποίησης βασισμένη στις ανάγκες, που έχει ο άντρας διαχρονικά. Τα προϊόντα κατασκευάζονται αποκλειστικά στην Ελλάδα, σε συνεργασία με έμπειρους χημικούς σε εξειδικευμένα εργαστήρια. Τα προϊόντα μας μπορείτε να τα προμηθευτείτε ηλεκτρονικά από τη σελίδα μας www.criminals.com.gr ή τηλεφωνικά 22950 34174 ή σε επιλεγμένα κουρεία-κομμωτήρια.",
    website: "https://criminals.com.gr/",
    websiteLabel: "www.criminals.com.gr",
  },
  {
    name: "Fix Grays / Happy Cosmetics",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_772a5b23593b48669b918b6b6c81d262~mv2.png/v1/fill/w_207,h_166,al_c,q_85,enc_avif,quality_auto/happycosmetics.png", alt: "Happy Cosmetics / Fix Grays", dark: true, link: "https://fixgrays.com/gr/" },
    ],
    description: "Επαναφέρει το φυσικό χρώμα των μαλλιών και της γενειάδας!",
    website: "https://fixgrays.com/gr/",
    websiteLabel: "www.fixgrays.com/gr",
  },
  {
    name: "inBarber",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_14b6d8b311a94c92acec893d6d691778~mv2.jpg/v1/crop/x_133,y_473,w_965,h_319/fill/w_242,h_80,al_c,q_80,enc_avif,quality_auto/inbarber_instagram-white.jpg", alt: "inBarber", dark: false, link: "https://inbarber.gr/" },
    ],
    description: "Το inBarber είναι μια απαραίτητη πλατφόρμα για κάθε κατάστημα κομμωτικής για να οργανώσετε τα ραντεβού σας μέσω της ψηφιακής σας ατζέντας, να προβάλλετε την επιχείρηση σας online καθώς και να προσελκύσετε νέους πελάτες αλλά να προσφέρετε και επιπλέον δυνατότητες κράτησης στους ήδη υφιστάμενους ανά πάσα στιγμή 24 ώρες την ημέρα. Δημιουργήθηκε από επαγγελματίες του χώρου για να καλύψει όλες τις ανάγκες του τομέα όσο αναφορά την διαδικτυακή προβολή, διαχείριση, πληροφόρηση των καταστημάτων σας και τον εκσυγχρονισμό των υπηρεσιών σας στην ψηφιακή εποχή. Δημιουργήστε και διαχειριστείτε το ψηφιακό σας κατάστημα δωρεάν σήμερα.",
    website: "https://inbarber.gr/",
    websiteLabel: "www.inbarber.gr",
  },
  {
    name: "The Hair Hub",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_4c9d0fdf75c6442e819d8b6bff4913b4~mv2.jpg/v1/crop/x_0,y_102,w_385,h_290/fill/w_196,h_148,al_c,q_80,enc_avif,quality_auto/hairhub%20logo.jpg", alt: "The Hair Hub", dark: false, link: "http://www.thehairhub.gr" },
      { src: "https://static.wixstatic.com/media/335ee3_d2b80b5be67142f49def134b1593cb18~mv2.jpg/v1/crop/x_174,y_192,w_224,h_199/fill/w_116,h_104,al_c,q_80,enc_avif,quality_auto/Slick%20Gorilla.jpg", alt: "Slick Gorilla", dark: false, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_b77c23a2ae474f98a23ab6ecfbf6f74c~mv2.jpg/v1/crop/x_0,y_162,w_500,h_358/fill/w_120,h_86,al_c,q_80,enc_avif,quality_auto/Oil-Can-Grooming-Logo.jpg", alt: "Oil Can Grooming", dark: false, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_96bc7fdbac5b4ab8a7a0e017fb67214e~mv2.jpg/v1/fill/w_164,h_164,al_c,q_80,enc_avif,quality_auto/Layrite%20Deluxe.jpg", alt: "Layrite Deluxe", dark: false, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_b7287f89db4849c099e91831df85ee67~mv2.png/v1/crop/x_807,y_784,w_2157,h_901/fill/w_206,h_86,al_c,q_85,enc_avif,quality_auto/Barcode.png", alt: "Barcode", dark: true, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_46e9f856360b407891e3adbe7bbda96a~mv2.png/v1/fill/w_122,h_75,al_c,q_85,enc_avif,quality_auto/Crazy%20Color.png", alt: "Crazy Color", dark: true, link: null },
    ],
    description: "",
    website: "http://www.thehairhub.gr/",
    websiteLabel: "www.thehairhub.gr",
  },
];

export default function SponsorsPage() {
  return (
    <>
      <PageBanner title="ΧΟΡΗΓΟΙ" image="https://static.wixstatic.com/media/335ee3_2dab44d9dcbc4d95843b9a73e290edce~mv2.jpg/v1/crop/x_0,y_433,w_2000,h_468/fill/w_1920,h_450,al_c,q_80,enc_avif,quality_auto/JBP_5455.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <h2 className="gold-text" style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: 50 }}>SPONSORS 7th GBF</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {SPONSORS.map((sponsor, i) => (
            <Reveal key={sponsor.name} delay={i * 100}>
              <div className="card-hover" style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "32px", border: "1px solid rgba(200,168,78,0.15)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 20, justifyContent: "center" }}>
                  {sponsor.logos.map((logo) => {
                    const inner = (
                      <div key={logo.alt} className={logo.dark ? "sponsor-logo-card" : ""} style={!logo.dark ? { display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 16px" } : undefined}>
                        <img src={logo.src} alt={logo.alt} style={{ maxHeight: 80, maxWidth: 200, objectFit: "contain" }} />
                      </div>
                    );
                    return logo.link ? (
                      <a key={logo.alt} href={logo.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{inner}</a>
                    ) : <div key={logo.alt}>{inner}</div>;
                  })}
                </div>
                {sponsor.description && (
                  <p style={{ color: "#bbb", fontSize: "0.9rem", lineHeight: 1.7, textAlign: "center", marginBottom: 16 }}>{sponsor.description}</p>
                )}
                {sponsor.website && (
                  <div style={{ textAlign: "center" }}>
                    <a href={sponsor.website} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-gold)", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "0.9rem" }}>{sponsor.websiteLabel}</a>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
