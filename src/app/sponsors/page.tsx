"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage, Language } from "@/components/LanguageContext";

type Sponsor = {
  name: string;
  logos: { src: string; alt: string; dark: boolean; link: string | null }[];
  descriptions: Record<Language, string>;
  website: string | null;
  websiteLabel: string | null;
};

const SPONSORS: Sponsor[] = [
  {
    name: "High Hair / Farmavita",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_471e976778f74ce4889a298051082e37~mv2.jpg/v1/fill/w_200,h_200,al_c,q_80,enc_avif,quality_auto/Men_Stories_Logo_Noir_Final_Vectoris%C3%A9_jp.jpg", alt: "Men Stories", dark: true, link: "https://farmavita.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_43033eeaaddb4a47b17ea7b979b1c456~mv2.png/v1/fill/w_315,h_92,al_c,q_85,enc_avif,quality_auto/Farmavita_logo_image_picture.png", alt: "Farmavita", dark: false, link: null },
    ],
    descriptions: {
      el: "Η Εταιρεία High Hair δραστηριοποιείται εδώ και αρκετά χρόνια στον τομέα των επαγγελματικών ειδών & εξοπλισμού για κομμωτήρια και είναι αποκλειστικός αντιπρόσωπος της ιταλικής εταιρείας Farmavita στην Ελλάδα, που εδώ και 30 χρόνια παράγει επαγγελματικά προϊόντα περιποίησης μαλλιών, εμπλουτισμένα με φυσικά, ενεργά συστατικά. Από το 2016 είναι αποκλειστικός αντιπρόσωπος της εταιρείας Canni, επαγγελματικό ημιμόνιμο βερνίκι υψηλής ποιότητας.",
      en: "High Hair has been active in the professional salon equipment sector for many years and is the exclusive representative of the Italian company Farmavita in Greece, which for 30 years has been producing professional hair care products enriched with natural, active ingredients. Since 2016 it is also the exclusive representative of Canni, a high-quality semi-permanent nail polish.",
      es: "High Hair lleva años activa en el sector de equipamiento profesional para salones y es representante exclusivo de la empresa italiana Farmavita en Grecia, que desde hace 30 años produce productos profesionales para el cuidado del cabello enriquecidos con ingredientes naturales. Desde 2016 también representa a Canni, esmalte semipermanente de alta calidad.",
      ar: "تعمل شركة High Hair منذ سنوات في قطاع معدات الصالونات الاحترافية وهي الممثل الحصري للشركة الإيطالية Farmavita في اليونان، التي تنتج منذ 30 عامًا منتجات عناية احترافية للشعر مع مكونات طبيعية. ومنذ 2016 تمثل أيضًا Canni لطلاء الأظافر شبه الدائم.",
      pt: "A High Hair atua há vários anos no setor de equipamento profissional para salões e é representante exclusiva da empresa italiana Farmavita na Grécia, que há 30 anos produz produtos profissionais de cuidado capilar enriquecidos com ingredientes naturais. Desde 2016 é também representante exclusiva da Canni, verniz semi-permanente de alta qualidade.",
      de: "High Hair ist seit vielen Jahren im Bereich professioneller Salonausstattung tätig und exklusiver Vertreter des italienischen Unternehmens Farmavita in Griechenland, das seit 30 Jahren professionelle Haarpflegeprodukte mit natürlichen, aktiven Inhaltsstoffen herstellt. Seit 2016 ist es auch exklusiver Vertreter von Canni, hochwertigem Hybrid-Nagellack.",
    },
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
    descriptions: {
      el: "Η εταιρεία Salontech από το 2016 προσφέρει είδη κομμωτηρίου και ομορφιάς, προϊόντα barber, εξοπλισμός κουρείου, studio αισθητικής, μακιγιάζ και ονυχοπλαστικής. Βρείτε ότι χρειάζεστε για να καλύψετε κάθε επαγγελματική σας ανάγκη στο χώρο της ομορφιάς, στις καλύτερες τιμές και με συνεχή after sales υποστήριξη.",
      en: "Since 2016 Salontech has offered salon and beauty products, barber products, barbershop equipment, aesthetics studios, makeup, and nail supplies. Find everything you need for your professional beauty needs at the best prices and with continuous after-sales support.",
      es: "Desde 2016, Salontech ofrece artículos para peluquería y belleza, productos barber, equipamiento de barbería, estudio de estética, maquillaje y manicura. Encuentra todo lo que necesitas para tus necesidades profesionales de belleza a los mejores precios y con soporte posventa continuo.",
      ar: "منذ 2016 تقدم Salontech منتجات الصالونات والتجميل، منتجات الحلاقة، معدات الحلاقة، استوديوهات التجميل، المكياج والأظافر. اعثر على كل ما تحتاجه لاحتياجاتك المهنية في مجال الجمال بأفضل الأسعار ودعم مستمر بعد البيع.",
      pt: "Desde 2016, a Salontech oferece artigos de cabeleireiro e beleza, produtos barber, equipamento de barbearia, estúdio de estética, maquilhagem e unhas. Encontre tudo o que precisa para as suas necessidades profissionais de beleza aos melhores preços e com apoio pós-venda contínuo.",
      de: "Seit 2016 bietet Salontech Friseur- und Schönheitsprodukte, Barber-Produkte, Friseurstudio-Ausstattung, Kosmetik, Make-up und Nagelpflege an. Finden Sie alles, was Sie für Ihren professionellen Schönheitsbedarf brauchen, zu besten Preisen und mit kontinuierlichem After-Sales-Support.",
    },
    website: "https://salontech.gr/",
    websiteLabel: "www.salontech.gr",
  },
  {
    name: "Smart Vacuum",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_b03379d4d74f4deeaf1df6143c499448~mv2_d_4602_1658_s_2.jpg/v1/fill/w_380,h_137,al_c,q_80,enc_avif,quality_auto/smart%20vacuum_JPG.jpg", alt: "Smart Vacuum", dark: false, link: "http://www.smartvacuum.gr" },
      { src: "https://static.wixstatic.com/media/335ee3_575d044153ab448bad18afa407a52776~mv2_d_4595_1659_s_2.jpg/v1/fill/w_379,h_137,al_c,q_80,enc_avif,quality_auto/smart_JPG.jpg", alt: "Smart", dark: false, link: "http://www.smartvacuum.gr" },
    ],
    descriptions: {
      el: "H smartvacuum είναι απαραίτητη σε ένα κομμωτήριο. Χωρίς αυτή, για 10 πελάτες τη μέρα ο κομμωτής κάνει εκατοντάδες βήματα και σκύβει 20 φορές με ανορθόδοξο τρόπο — επιβαρύνοντας αρθρώσεις και μέση. Η smartvacuum εξαλείφει αυτό το πρόβλημα, προστατεύοντας την υγεία του επαγγελματία και εξοικονομώντας πολύτιμο χρόνο.",
      en: "The smartvacuum is as essential to a salon as scissors. Without it, a barber serving 10 clients a day makes hundreds of steps and bends 20 times awkwardly — straining joints and the lower back. smartvacuum eliminates this problem, protecting the professional's health and saving valuable time.",
      es: "La smartvacuum es tan esencial en una peluquería como las tijeras. Sin ella, un barbero que atiende a 10 clientes al día da cientos de pasos y se agacha 20 veces de forma incorrecta, sobrecargando articulaciones y espalda. smartvacuum elimina este problema protegiendo la salud del profesional.",
      ar: "جهاز smartvacuum ضروري في صالون الحلاقة مثل المقص تمامًا. بدونه، يقطع الحلاق المئات من الخطوات ويميل بطريقة غير صحيحة 20 مرة يوميًا محملًا على مفاصله وظهره. smartvacuum يحل هذه المشكلة ويحمي صحة المحترف.",
      pt: "A smartvacuum é tão essencial num salão como a tesoura. Sem ela, um barbeiro que atende 10 clientes por dia dá centenas de passos e curva-se 20 vezes de forma incorreta, sobrecarregando articulações e coluna. A smartvacuum elimina este problema protegendo a saúde do profissional.",
      de: "Die smartvacuum ist in einem Friseursalon so unverzichtbar wie die Schere. Ohne sie macht ein Friseur, der 10 Kunden täglich bedient, hunderte Schritte und bückt sich 20 Mal auf unergonomische Weise – Gelenke und Rücken werden belastet. smartvacuum beseitigt dieses Problem und schützt die Gesundheit des Profis.",
    },
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
    descriptions: {
      el: "Στο e-shop της εταιρείας HairLand Bachatouri θα βρείτε πάνω από 6000 διαθέσιμα προϊόντα και εξοπλισμό που χρειάζεται ένα κομμωτήριο, ένα Barber Shop αλλά και ένα κέντρο αισθητικής. Βρισκόμαστε δίπλα σας 35 χρόνια από το 1987 με σεβασμό πάντα στον πελάτη!",
      en: "At HairLand Bachatouri's e-shop you will find over 6,000 products and equipment for salons, barber shops and aesthetics centers. We have been by your side for 35 years since 1987, always with respect for our customers.",
      es: "En la tienda online de HairLand Bachatouri encontrarás más de 6.000 productos y equipos para peluquerías, barberías y centros de estética. Llevamos 35 años a tu lado desde 1987, siempre con respeto hacia el cliente.",
      ar: "في متجر HairLand Bachatouri الإلكتروني ستجد أكثر من 6000 منتج ومعدة لصالونات الشعر والحلاقة ومراكز التجميل. نحن بجانبكم منذ 35 عامًا منذ 1987، دائمًا باحترام للعميل.",
      pt: "Na loja online da HairLand Bachatouri encontrará mais de 6.000 produtos e equipamentos para salões, barbearias e centros de estética. Estamos ao seu lado há 35 anos desde 1987, sempre com respeito pelo cliente.",
      de: "Im Online-Shop von HairLand Bachatouri finden Sie über 6.000 Produkte und Ausstattungen für Friseursalons, Barbershops und Kosmetikstudios. Seit 35 Jahren, seit 1987, stehen wir Ihnen mit Respekt gegenüber zur Seite.",
    },
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
    descriptions: {
      el: "Η εταιρεία Hall of Beauty εξειδικεύεται στο εμπόριο ειδών κομμωτηρίων και κουρείων. Παραγωγός styling προϊόντων Poppin'Yang και αντιπρόσωπος μεγάλων διεθνών brands. Τα προϊόντα διατίθενται μέσω e-shop ή σε επιλεγμένα κομμωτήρια και κουρεία.",
      en: "Hall of Beauty specializes in trading salon and barbershop goods. They are the producer of Poppin'Yang styling products and representative of major international brands. Products available through their e-shop or at selected salons and barbershops.",
      es: "Hall of Beauty se especializa en la distribución de artículos para peluquerías y barberías. Fabricante de los productos de styling Poppin'Yang y representante de grandes marcas internacionales. Productos disponibles en su tienda online o en peluquerías y barberías seleccionadas.",
      ar: "تتخصص Hall of Beauty في تجارة مستلزمات الصالونات والحلاقة. منتجة لمنتجات التصفيف Poppin'Yang وممثلة لكبرى العلامات الدولية. المنتجات متاحة عبر متجرها الإلكتروني أو في صالونات وحلاقات مختارة.",
      pt: "A Hall of Beauty especializa-se no comércio de artigos para cabeleireiros e barbearias. Produtora dos produtos de styling Poppin'Yang e representante de grandes marcas internacionais. Produtos disponíveis na sua loja online ou em salões e barbearias selecionados.",
      de: "Hall of Beauty spezialisiert sich auf den Handel mit Friseursalon- und Barbershop-Waren. Hersteller der Styling-Produkte Poppin'Yang und Vertreter großer internationaler Marken. Produkte im Online-Shop oder in ausgewählten Salons erhältlich.",
    },
    website: "https://hallofbeauty.gr/",
    websiteLabel: "www.hallofbeauty.gr",
  },
  {
    name: "Kirios Barber Luxury",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_265110243b9a4e15afed4957326c0d37~mv2.png/v1/fill/w_205,h_205,al_c,q_85,enc_avif,quality_auto/Kirios.png", alt: "Kirios", dark: true, link: "https://www.kirios.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_bfc84e6c5c1a46ab8350ba0fa50f24a2~mv2.jpg/v1/fill/w_408,h_102,al_c,q_80,enc_avif,quality_auto/Black-Elegant-Exclusive-Collection-Etsy-Shop-Cover-(4).jpg", alt: "Kirios Banner", dark: false, link: "https://www.kirios.gr/" },
    ],
    descriptions: {
      el: "O Kirios Barber Luxury είναι ένα μοναδικό Brand στα επαγγελματικά ρούχα Barber Shop και Κομμωτηρίου. Με έδρα τη Θεσσαλονίκη, ιδρύθηκε το 2017 και αποτελεί σήμερα ένα από τα μεγαλύτερα brands επαγγελματικής ένδυσης με πελάτες σε όλο τον κόσμο. Part of your Life. Together we break the rules.",
      en: "Kirios Barber Luxury is a unique brand in professional Barber Shop and Salon clothing. Based in Thessaloniki, founded in 2017, it is now one of the biggest professional clothing brands with clients worldwide. Part of your Life. Together we break the rules.",
      es: "Kirios Barber Luxury es una marca única en ropa profesional para Barber Shop y Peluquería. Con sede en Tesalónica, fundada en 2017, es hoy una de las mayores marcas de ropa profesional con clientes en todo el mundo. Part of your Life. Together we break the rules.",
      ar: "Kirios Barber Luxury علامة تجارية فريدة في ملابس محلات الحلاقة والصالونات الاحترافية. تأسست عام 2017 في ثيسالونيكي وأصبحت اليوم من أكبر علامات الملابس المهنية مع عملاء حول العالم. Part of your Life. Together we break the rules.",
      pt: "Kirios Barber Luxury é uma marca única em vestuário profissional para Barber Shop e Salão. Com sede em Tessalónica, fundada em 2017, é hoje uma das maiores marcas de vestuário profissional com clientes em todo o mundo. Part of your Life. Together we break the rules.",
      de: "Kirios Barber Luxury ist eine einzigartige Marke für professionelle Barber Shop- und Salon-Bekleidung. Mit Sitz in Thessaloniki, gegründet 2017, heute eine der größten professionellen Bekleidungsmarken mit Kunden weltweit. Part of your Life. Together we break the rules.",
    },
    website: "https://www.kirios.gr/",
    websiteLabel: "www.kirios.gr",
  },
  {
    name: "Extreme Barber Store",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_28a0e3e5b5c64b7bbc824d51ef255a74~mv2.jpg/v1/fill/w_379,h_120,al_c,q_80,enc_avif,quality_auto/extremebarberstore-logo-black.jpg", alt: "Extreme Barber Store", dark: false, link: "https://extremebarberstore.com/en/" },
    ],
    descriptions: {
      el: "Το Extreme Barber Store φτιάχτηκε από κομμωτές για κομμωτές. Δεν είμαστε έμποροι, αλλά κομμωτές που ζούμε στον ίδιο χώρο με εσάς. Θα βρείτε μεγάλη ποικιλία επαγγελματικού εξοπλισμού κομμωτηρίου που θα σας ξεχωρίζει. Η κομμωτική είναι φαντασία, έμπνευση, καινοτομία, δημιουργικότητα. Τολμήστε, αναδείξτε το!",
      en: "Extreme Barber Store was built by barbers for barbers. We're not merchants — we're barbers living and working in the same world as you. You'll find a wide range of professional salon equipment that will set you apart. Hairdressing is imagination, inspiration, innovation, creativity. Dare to express it!",
      es: "Extreme Barber Store fue creado por barberos para barberos. No somos comerciantes, somos barberos que vivimos en el mismo mundo que vosotros. Encontraréis una gran variedad de equipos profesionales de peluquería que os diferenciarán. La peluquería es imaginación, inspiración, innovación, creatividad. ¡Atrévete!",
      ar: "تأسس Extreme Barber Store من قبل حلاقين لصالح الحلاقين. لسنا تجارًا — نحن حلاقون نعيش ونعمل في نفس عالمكم. ستجدون تشكيلة واسعة من المعدات الاحترافية التي ستميزكم. الحلاقة هي خيال، إلهام، ابتكار، إبداع. تجرأوا وأبرزوا ما يميزكم!",
      pt: "A Extreme Barber Store foi criada por cabeleireiros para cabeleireiros. Não somos comerciantes — somos cabeleireiros que vivem e trabalham no mesmo mundo que você. Encontrará uma grande variedade de equipamentos profissionais que o distinguirão. O cabeleireiro é imaginação, inspiração, inovação, criatividade. Atreva-se!",
      de: "Extreme Barber Store wurde von Friseuren für Friseure gegründet. Wir sind keine Händler — wir sind Friseure, die in derselben Welt wie Sie leben und arbeiten. Sie finden eine große Auswahl an professionellen Salongeräten, die Sie von der Masse abheben. Frisieren ist Fantasie, Inspiration, Innovation, Kreativität. Wagen Sie es!",
    },
    website: "https://extremebarberstore.com/",
    websiteLabel: "www.extremebarberstore.com",
  },
  {
    name: "Liros Cosmetics - Bioshev Professional",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_ed27714d921443b7a5ed0eaf688651fd~mv2.png/v1/fill/w_273,h_89,al_c,lg_1,q_85,enc_avif,quality_auto/logo.png", alt: "Liros Cosmetics", dark: true, link: "https://www.liroscosmetics.gr/" },
      { src: "https://static.wixstatic.com/media/335ee3_6a41211137864b0fb503812e4040769e~mv2.jpg/v1/fill/w_257,h_126,al_c,q_80,enc_avif,quality_auto/liros%20cosmetics%20logo.jpg", alt: "Liros Cosmetics Logo", dark: false, link: "https://www.liroscosmetics.gr/" },
    ],
    descriptions: {
      el: "Η εταιρεία Liros Cosmetics - Bioshev Professional ιδρύθηκε το 1992 με αντικείμενο τη παραγωγή επαγγελματικών προϊόντων περιποίησης μαλλιών. Αμιγώς ελληνική επιχείρηση, λαμβάνει μέρος σε όλες τις επαγγελματικές εκθέσεις και προσφέρει τεχνογνωσία σε πελάτες και σπουδαστές ΙΕΚ & ΕΠΑΛ. Προσφέρει επίσης επιτυχημένο μοντέλο franchise.",
      en: "Liros Cosmetics - Bioshev Professional was founded in 1992 to produce professional hair and body care products. A purely Greek company, it participates in all professional trade shows and generously shares expertise with clients and students. It also offers a successful franchise model.",
      es: "Liros Cosmetics - Bioshev Professional fue fundada en 1992 para producir productos profesionales de cuidado capilar y corporal. Empresa puramente griega, participa en todas las ferias profesionales y comparte generosamente su know-how con clientes y estudiantes. También ofrece un modelo de franquicia exitoso.",
      ar: "تأسست Liros Cosmetics - Bioshev Professional عام 1992 لإنتاج منتجات احترافية للعناية بالشعر والجسم. شركة يونانية خالصة تشارك في جميع المعارض المهنية وتشارك خبرتها مع العملاء والطلاب. كما تقدم نموذج امتياز ناجحًا.",
      pt: "A Liros Cosmetics - Bioshev Professional foi fundada em 1992 para produzir produtos profissionais de cuidado capilar e corporal. Empresa puramente grega, participa em todas as feiras profissionais e partilha generosamente o seu know-how com clientes e estudantes. Oferece também um modelo de franquia de sucesso.",
      de: "Liros Cosmetics - Bioshev Professional wurde 1992 zur Herstellung professioneller Haar- und Körperpflegeprodukte gegründet. Ein rein griechisches Unternehmen, das an allen Fachmessen teilnimmt und sein Know-how großzügig mit Kunden und Studierenden teilt. Es bietet auch ein erfolgreiches Franchise-Modell an.",
    },
    website: "https://www.liroscosmetics.gr/",
    websiteLabel: "www.liroscosmetics.gr",
  },
  {
    name: "Bandido",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_446215c0cba64e6792d4ba4763df407e~mv2.jpg/v1/fill/w_208,h_285,al_c,q_80,enc_avif,quality_auto/Bandido-barbershop2-1.jpg", alt: "Bandido", dark: false, link: "https://bandidocosmetics.gr/" },
    ],
    descriptions: {
      el: "Καλωσήρθατε στην οικογένεια της Bandido. Τα προϊόντα μας σχεδιάζονται στο Βέλγιο και διανέμονται σε περισσότερες από 71 χώρες σε όλες τις ηπείρους. Παράγονται σύμφωνα με γερμανικά πρότυπα υψηλής ποιότητας. Δημιουργούμε προϊόντα για τους πελάτες μας και όχι πελάτες για τα προϊόντα μας.",
      en: "Welcome to the Bandido family — the fastest-growing company in men's cosmetics. Our products are designed in Belgium and distributed in over 71 countries across all continents. Manufactured to German standards. We create products for our customers, not customers for our products.",
      es: "Bienvenido a la familia Bandido, la empresa de cosmética masculina de mayor crecimiento. Nuestros productos se diseñan en Bélgica y se distribuyen en más de 71 países en todos los continentes. Fabricados según estándares alemanes. Creamos productos para nuestros clientes, no clientes para nuestros productos.",
      ar: "مرحبًا بكم في عائلة Bandido، الشركة الأسرع نموًا في مجال مستحضرات التجميل الرجالية. منتجاتنا مصممة في بلجيكا وتوزع في أكثر من 71 دولة عبر جميع القارات. مصنوعة وفق المعايير الألمانية. نصنع منتجات لعملائنا وليس عملاء لمنتجاتنا.",
      pt: "Bem-vindo à família Bandido, a empresa de cosméticos masculinos de maior crescimento. Os nossos produtos são concebidos na Bélgica e distribuídos em mais de 71 países em todos os continentes. Fabricados segundo normas alemãs. Criamos produtos para os nossos clientes, não clientes para os nossos produtos.",
      de: "Willkommen in der Bandido-Familie, dem am schnellsten wachsenden Unternehmen in der Herrenkosmetik. Unsere Produkte werden in Belgien entworfen und in über 71 Ländern auf allen Kontinenten vertrieben. Nach deutschen Standards hergestellt. Wir schaffen Produkte für unsere Kunden, nicht Kunden für unsere Produkte.",
    },
    website: "https://bandidocosmetics.gr/",
    websiteLabel: "www.bandidocosmetics.gr",
  },
  {
    name: "Rainbow Beauty",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_b1a307859bf5488c97b74b2ff28ac4ae~mv2.jpg/v1/fill/w_376,h_148,al_c,q_80,enc_avif,quality_auto/RAINBOW_LOGO.jpg", alt: "Rainbow Beauty", dark: false, link: "https://rainbowbeauty.gr/" },
    ],
    descriptions: {
      el: "Η Rainbow Beauty είναι εταιρεία λιανικής και χονδρικής πώλησης προϊόντων φροντίδας. Σκοπός μας είναι να παρέχουμε τα καλύτερα προϊόντα φυσικής προέλευσης για μαλλιά και δέρμα — από styling και hair-forming μέχρι καθημερινά προϊόντα. Θυμηθείτε, η ομορφιά βγαίνει σε όλα τα χρώματα!",
      en: "Rainbow Beauty is a retail and wholesale company for care and beauty products. Our goal is to provide the best natural-origin products for hair and skin — from styling and hair-forming to daily-use products. Remember, beauty comes in all colors!",
      es: "Rainbow Beauty es una empresa de venta al por menor y al por mayor de productos de cuidado y belleza. Nuestro objetivo es ofrecer los mejores productos de origen natural para cabello y piel. Recuerda, ¡la belleza viene en todos los colores!",
      ar: "Rainbow Beauty شركة تجزئة وجملة لمنتجات العناية والتجميل. هدفنا تقديم أفضل منتجات ذات منشأ طبيعي للشعر والبشرة. تذكروا، الجمال يأتي بجميع الألوان!",
      pt: "A Rainbow Beauty é uma empresa de retalho e grossista de produtos de cuidado e beleza. O nosso objetivo é fornecer os melhores produtos de origem natural para cabelo e pele. Lembre-se, a beleza vem em todas as cores!",
      de: "Rainbow Beauty ist ein Einzel- und Großhändler für Pflege- und Schönheitsprodukte. Unser Ziel ist es, die besten Produkte natürlicher Herkunft für Haar und Haut anzubieten. Denken Sie daran: Schönheit gibt es in allen Farben!",
    },
    website: "https://rainbowbeauty.gr/",
    websiteLabel: "www.rainbowbeauty.gr",
  },
  {
    name: "Natural Care Pro",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_ffd0cd7bba384795b71d3cb10fe6ceff~mv2.png/v1/fill/w_388,h_123,al_c,q_85,enc_avif,quality_auto/LOGO%20NATURAL-680x214%201-460x146w.png", alt: "Natural Care Pro", dark: true, link: "https://www.naturalcarepro.gr/" },
    ],
    descriptions: {
      el: "Η εταιρεία ιδρύθηκε το 1999 από νέους ανθρώπους γνώστες της ελληνικής αγοράς. Εισάγουμε και διανέμουμε στην ελληνική αγορά προϊόντα υψηλής ποιότητας που σέβονται τον άνθρωπο και το περιβάλλον. Συνεργαζόμαστε με κορυφαίες Ευρωπαϊκές και Ελληνικές Εταιρείες.",
      en: "The company was founded in 1999 by people with deep knowledge of the Greek market. We import and distribute high-quality, aesthetically refined products that respect people and the environment. We partner with leading European and Greek companies.",
      es: "La empresa fue fundada en 1999 por personas con profundo conocimiento del mercado griego. Importamos y distribuimos productos de alta calidad que respetan a las personas y al medio ambiente. Colaboramos con las principales empresas europeas y griegas.",
      ar: "تأسست الشركة عام 1999 من قبل أشخاص لديهم معرفة عميقة بالسوق اليونانية. نستورد ونوزع منتجات عالية الجودة تحترم الإنسان والبيئة. نتعاون مع كبرى الشركات الأوروبية واليونانية.",
      pt: "A empresa foi fundada em 1999 por pessoas com profundo conhecimento do mercado grego. Importamos e distribuímos produtos de alta qualidade e estética que respeitam as pessoas e o ambiente. Colaboramos com as principais empresas europeias e gregas.",
      de: "Das Unternehmen wurde 1999 von Menschen mit tiefem Wissen über den griechischen Markt gegründet. Wir importieren und vertreiben hochwertige, ästhetisch ansprechende Produkte, die Menschen und Umwelt respektieren. Wir kooperieren mit führenden europäischen und griechischen Unternehmen.",
    },
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
    descriptions: {
      el: "Το Under The Skin είναι ένα traditional tattoo shop στην πόλη της Ιαλυσού. Μια πλούσια συλλογή από παραδοσιακά σχέδια για όσους δεν ψάχνουν τη «μόδα» στο tattoo. Επίσης το επίσημο merch του UTSTC, κρέμες aftercare Urban Legend και τη γεύση Monster για ενέργεια πριν κάθε tattoo.",
      en: "Under The Skin is a traditional tattoo shop in the city of Ialysos. A rich collection of traditional designs for those who don't look for 'fashion' in their tattoo. Also the official UTSTC merch, Urban Legend aftercare creams and Monster energy for before each session.",
      es: "Under The Skin es una tienda de tatuajes tradicional en la ciudad de Ialysos. Una rica colección de diseños tradicionales para quienes no buscan la «moda» en el tatuaje. También el merch oficial de UTSTC, cremas aftercare Urban Legend y Monster para energía antes de cada sesión.",
      ar: "Under The Skin متجر وشم تقليدي في مدينة إياليسوس. مجموعة غنية من التصاميم التقليدية لمن لا يبحثون عن «الموضة» في الوشم. أيضًا بضائع UTSTC الرسمية، وكريمات aftercare Urban Legend، ومشروب Monster للطاقة قبل كل جلسة.",
      pt: "Under The Skin é uma loja de tatuagem tradicional na cidade de Ialysos. Uma rica coleção de desenhos tradicionais para quem não procura a «moda» na tatuagem. Também o merch oficial do UTSTC, cremes aftercare Urban Legend e Monster para energia antes de cada sessão.",
      de: "Under The Skin ist ein traditionelles Tattoo-Studio in der Stadt Ialysos. Eine reichhaltige Sammlung traditioneller Designs für alle, die in ihrem Tattoo keine «Mode» suchen. Auch das offizielle UTSTC-Merch, Urban Legend Aftercare-Cremes und Monster-Energy vor jeder Session.",
    },
    website: "https://www.undertheskintattoocrew.gr/",
    websiteLabel: "www.undertheskintattoocrew.gr",
  },
  {
    name: "Criminals Grooming",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_c5b4c12c8b724d129b75ba5b48e0c951~mv2.jpg/v1/fill/w_282,h_169,al_c,q_80,enc_avif,quality_auto/criminals%20logo%20%20jpeg.jpg", alt: "Criminals Grooming", dark: false, link: "https://criminals.com.gr/" },
    ],
    descriptions: {
      el: "Η οικογένεια του Criminals Grooming έρχεται στον χώρο της αντρικής περιποίησης με προϊόντα υψηλών προδιαγραφών. Κατασκευάζονται αποκλειστικά στην Ελλάδα σε εξειδικευμένα εργαστήρια, βασισμένα στις ανάγκες που έχει ο άντρας διαχρονικά. Διαθέσιμα online, τηλεφωνικά (22950 34174) ή σε επιλεγμένα κουρεία.",
      en: "The Criminals Grooming family enters men's grooming with high-spec products. Manufactured exclusively in Greece in specialized labs, based on men's timeless needs. Available online, by phone (22950 34174) or at selected barbershops.",
      es: "La familia Criminals Grooming entra en el mundo del cuidado masculino con productos de alta especificación. Fabricados exclusivamente en Grecia en laboratorios especializados, basados en las necesidades eternas del hombre. Disponibles online, por teléfono (22950 34174) o en barberías seleccionadas.",
      ar: "عائلة Criminals Grooming تدخل عالم العناية الرجالية بمنتجات عالية المواصفات. مصنوعة حصريًا في اليونان في مختبرات متخصصة، استنادًا إلى احتياجات الرجل الأبدية. متاحة عبر الإنترنت، بالهاتف (22950 34174) أو في حلاقات مختارة.",
      pt: "A família Criminals Grooming entra no mundo da grooming masculina com produtos de alta especificação. Fabricados exclusivamente na Grécia em laboratórios especializados, baseados nas necessidades eternas do homem. Disponíveis online, por telefone (22950 34174) ou em barbearias selecionadas.",
      de: "Die Criminals Grooming-Familie betritt die Männerpflege mit hochwertigen Produkten. Ausschließlich in Griechenland in spezialisierten Labors hergestellt, basierend auf den zeitlosen Bedürfnissen des Mannes. Online, telefonisch (22950 34174) oder in ausgewählten Barbershops erhältlich.",
    },
    website: "https://criminals.com.gr/",
    websiteLabel: "www.criminals.com.gr",
  },
  {
    name: "Fix Grays / Happy Cosmetics",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_772a5b23593b48669b918b6b6c81d262~mv2.png/v1/fill/w_207,h_166,al_c,q_85,enc_avif,quality_auto/happycosmetics.png", alt: "Happy Cosmetics / Fix Grays", dark: true, link: "https://fixgrays.com/gr/" },
    ],
    descriptions: {
      el: "Επαναφέρει το φυσικό χρώμα των μαλλιών και της γενειάδας!",
      en: "Restores the natural color of hair and beard!",
      es: "¡Restaura el color natural del cabello y la barba!",
      ar: "يستعيد اللون الطبيعي للشعر واللحية!",
      pt: "Restaura a cor natural do cabelo e da barba!",
      de: "Stellt die natürliche Farbe von Haar und Bart wieder her!",
    },
    website: "https://fixgrays.com/gr/",
    websiteLabel: "www.fixgrays.com/gr",
  },
  {
    name: "inBarber",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_14b6d8b311a94c92acec893d6d691778~mv2.jpg/v1/crop/x_133,y_473,w_965,h_319/fill/w_242,h_80,al_c,q_80,enc_avif,quality_auto/inbarber_instagram-white.jpg", alt: "inBarber", dark: false, link: "https://inbarber.gr/" },
    ],
    descriptions: {
      el: "Το inBarber είναι η απαραίτητη πλατφόρμα για κάθε κατάστημα κομμωτικής: οργανώστε τα ραντεβού σας, προβάλλετε την επιχείρησή σας online και προσελκύστε νέους πελάτες 24 ώρες τη μέρα. Δημιουργήθηκε από επαγγελματίες του χώρου για να καλύψει όλες τις ανάγκες διαδικτυακής παρουσίας και εκσυγχρονισμού. Δωρεάν σήμερα!",
      en: "inBarber is the essential platform for every salon: manage your appointments, showcase your business online and attract new clients 24 hours a day. Created by industry professionals to cover all your digital presence and modernization needs. Free today!",
      es: "inBarber es la plataforma esencial para cada salón: gestiona tus citas, presenta tu negocio online y atrae nuevos clientes las 24 horas. Creada por profesionales del sector para cubrir todas las necesidades de presencia digital y modernización. ¡Gratis hoy!",
      ar: "inBarber هي المنصة الأساسية لكل صالون: نظّم مواعيدك، اعرض نشاطك التجاري على الإنترنت، واجذب عملاء جدد على مدار الساعة. صُممت من قبل محترفين في المجال لتغطية جميع احتياجات الحضور الرقمي والتحديث. مجانية اليوم!",
      pt: "inBarber é a plataforma essencial para cada salão: gira os seus agendamentos, apresente o seu negócio online e atraia novos clientes 24 horas por dia. Criada por profissionais do setor para cobrir todas as necessidades de presença digital. Gratuita hoje!",
      de: "inBarber ist die unverzichtbare Plattform für jeden Salon: Verwalten Sie Ihre Termine, präsentieren Sie Ihr Unternehmen online und gewinnen Sie rund um die Uhr neue Kunden. Von Branchenexperten entwickelt, um alle digitalen Präsenz- und Modernisierungsanforderungen abzudecken. Heute kostenlos!",
    },
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
      { src: "https://static.wixstatic.com/media/335ee3_260c47018aed45e3a014d623a9e8b204~mv2.jpg/v1/fill/w_200,h_80,al_c,q_80,enc_avif,quality_auto/335ee3_260c47018aed45e3a014d623a9e8b204~mv2.jpg", alt: "Kiepe Professional", dark: false, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_8761cc3f9f8147deb6aa2bd1361e81cd~mv2.jpg/v1/fill/w_150,h_150,al_c,q_80,enc_avif,quality_auto/335ee3_8761cc3f9f8147deb6aa2bd1361e81cd~mv2.jpg", alt: "Brosh", dark: false, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_530422195d4041bea80fdfd999cb607a~mv2.png/v1/fill/w_180,h_60,al_c,q_85,enc_avif,quality_auto/335ee3_530422195d4041bea80fdfd999cb607a~mv2.png", alt: "Kyone", dark: true, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_ff50ef8645c84afe8c981aeffce65bff~mv2.jpg/v1/fill/w_180,h_80,al_c,q_80,enc_avif,quality_auto/335ee3_ff50ef8645c84afe8c981aeffce65bff~mv2.jpg", alt: "Unique Brands", dark: false, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_a34b3fd758f540a5878f6d4ef8a72981~mv2.jpg/v1/fill/w_180,h_60,al_c,q_80,enc_avif,quality_auto/335ee3_a34b3fd758f540a5878f6d4ef8a72981~mv2.jpg", alt: "iLine Scissors", dark: false, link: null },
      { src: "https://static.wixstatic.com/media/335ee3_6b4d3a10a5ac4337b63498cea1f6b514~mv2.jpg/v1/fill/w_180,h_80,al_c,q_80,enc_avif,quality_auto/335ee3_6b4d3a10a5ac4337b63498cea1f6b514~mv2.jpg", alt: "Sharpwise", dark: false, link: null },
    ],
    descriptions: { el: "", en: "", es: "", ar: "", pt: "", de: "" },
    website: "http://www.thehairhub.gr/",
    websiteLabel: "www.thehairhub.gr",
  },
  {
    name: "Marras Hair",
    logos: [
      { src: "https://static.wixstatic.com/media/335ee3_678d7703159b4d8e893cb6063fee5715~mv2.png/v1/fill/w_220,h_100,al_c,q_85,enc_avif,quality_auto/335ee3_678d7703159b4d8e893cb6063fee5715~mv2.png", alt: "Marras Hair", dark: false, link: null },
    ],
    descriptions: { el: "", en: "", es: "", ar: "", pt: "", de: "" },
    website: null,
    websiteLabel: null,
  },
];

export default function SponsorsPage() {
  const { t, lang } = useLanguage();
  return (
    <>
      <PageBanner title={t("sponsors_title")} image="https://static.wixstatic.com/media/335ee3_2dab44d9dcbc4d95843b9a73e290edce~mv2.jpg/v1/crop/x_0,y_433,w_2000,h_468/fill/w_1920,h_450,al_c,q_80,enc_avif,quality_auto/JBP_5455.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <h2 className="gold-text" style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: 50 }}>{t("sponsors_title")} 8ου GBF</h2>
        </Reveal>

        {SPONSORS.map((sponsor, i) => (
          <Reveal key={sponsor.name} delay={i * 80}>
            <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.15)", marginBottom: 30 }}>
              <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 24 }}>{sponsor.name}</h2>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", marginBottom: 24 }}>
                {sponsor.logos.map((logo) => {
                  const img = (
                    <img
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      style={{
                        maxHeight: 80,
                        maxWidth: 180,
                        objectFit: "contain",
                        filter: logo.dark ? "invert(1) brightness(1.5)" : "none",
                      }}
                    />
                  );
                  // Wrap dark-artwork (non-inverted) logos in a white bg so they're visible in dark mode
                  const wrapped = logo.dark ? img : (
                    <span
                      key={logo.alt + "-wrap"}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#ffffff",
                        borderRadius: 8,
                        padding: "8px 12px",
                      }}
                    >
                      {img}
                    </span>
                  );
                  return logo.link ? (
                    <a key={logo.alt} href={logo.link} target="_blank" rel="noopener noreferrer">{wrapped}</a>
                  ) : wrapped;
                })}
              </div>

              {(sponsor.descriptions[lang] || sponsor.descriptions.el) && (
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 16 }}>
                  {sponsor.descriptions[lang] || sponsor.descriptions.el}
                </p>
              )}

              {sponsor.website && sponsor.websiteLabel && (
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-gold)", fontSize: "0.85rem", textDecoration: "none", borderBottom: "1px solid var(--color-gold)", paddingBottom: 2 }}>
                  {sponsor.websiteLabel}
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
