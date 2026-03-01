"use client";
import { useI18n } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import { PageBanner, SectionWrap } from "@/components/page-banner";

function SponsorBlock({ logos, desc, url }: { logos: string[]; desc?: string; url?: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-5 transition-all hover:border-gold/50">
      <div className="flex flex-wrap gap-4 items-center mb-3">
        {logos.map((l, i) => <img key={i} src={l} alt="" className="max-h-[75px] max-w-[190px] object-contain" />)}
      </div>
      {desc && <p className="text-[14px] text-tx-sec leading-[1.8] mb-2">{desc}</p>}
      {url && <a href={url} target="_blank" rel="noopener" className="text-gold text-[13px] hover:underline">{url} →</a>}
    </div>
  );
}

export default function SponsorsPage() {
  const { t } = useI18n();
  const s = IMG.sponsors;
  return (
    <>
      <PageBanner img={IMG.banners.sponsors} title={t.sponsors.title} />
      <SectionWrap>
        <SponsorBlock logos={[s.menStories, s.farmavita]} desc='Η Εταιρεία High Hair — αποκλειστικός αντιπρόσωπος Farmavita στην Ελλάδα. 30 χρόνια επαγγελματικά προϊόντα περιποίησης μαλλιών, εμπλουτισμένα με φυσικά ενεργά συστατικά. Από το 2016 αποκλειστικός αντιπρόσωπος Canni.' url="https://farmavita.gr/" />
        <SponsorBlock logos={[s.salontech, s.slickGorilla, s.lv3, s.jackbone, s.matakki, s.caliber, s.andis, s.babyliss]} desc="Η εταιρεία Salontech από το 2016 προσφέρει είδη κομμωτηρίου και ομορφιάς, προϊόντα barber, εξοπλισμό κουρείου, studio αισθητικής, μακιγιάζ και ονυχοπλαστικής. Η μεγαλύτερη συλλογή επαγγελματικών προϊόντων στις καλύτερες τιμές." url="https://salontech.gr/" />
        <SponsorBlock logos={[s.smartvac1, s.smartvac2]} desc="H smartvacuum είναι απαραίτητη σε ένα κομμωτήριο όπως το ψαλίδι. Εξοικονομεί χρόνο, βήματα και προστατεύει την υγεία του επαγγελματία." url="http://www.smartvacuum.gr/" />
        <SponsorBlock logos={[s.bachatouris, s.noberu, s.morgans]} desc="Στο e-shop της εταιρείας HairLand Bachatouri θα βρείτε πάνω από 6000 διαθέσιμα προϊόντα και εξοπλισμό. Δίπλα σας 35 χρόνια από το 1987 με σεβασμό στον πελάτη!" url="https://www.beautycompany.gr/" />
        <SponsorBlock logos={[s.hallOfBeauty]} desc="Hall of Beauty" url="https://hallofbeauty.gr/" />
      </SectionWrap>
    </>
  );
}
