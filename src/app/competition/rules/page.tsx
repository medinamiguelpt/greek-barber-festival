import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function RulesPage() {
  return (
    <>
      <PageBanner title="ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ" image="https://static.wixstatic.com/media/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 30 }}>
          <Reveal>
            <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
              <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20 }}>Ελληνικά</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Επιβεβαίωση συμμετοχής πριν την έναρξη, παρόντες 1 ώρα πριν.",
                  "Αφορά επαγγελματίες κομμωτές/κουρείς και σπουδαστές. Αποκλείονται χωρίς επαγγελματική στέγη.",
                  "Εγκυρότητα μέσω φόρμας εγγραφής.",
                  "Δηλώνοντας συμμετοχή παραχωρούν δικαίωμα εκμετάλλευσης οπτικοακουστικού υλικού.",
                  "Κατάλληλη ενδυμασία.",
                  "Υπεύθυνοι για εργαλεία, διοργανωτές χωρίς ευθύνη.",
                  "Τουλάχιστον 10 συμμετέχοντες ανά θέμα, αλλιώς ακυρώνεται.",
                  "Αποκλεισμός αν δεν προσέλθει 15 λεπτά πριν. Χρήματα δεν επιστρέφονται.",
                  "Διοργανωτές διατηρούν δικαίωμα τροποποίησης κανονισμών."
                ].map((rule, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", minWidth: 20 }}>{i+1}.</span>
                    <span style={{ color: "#ccc", fontSize: "0.9rem", lineHeight: 1.6 }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
              <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20 }}>English</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Confirm participation before start, present 1 hour in advance.",
                  "Concerns professionals and students. Those without salon/barbershop excluded.",
                  "Valid through registration form.",
                  "Grant right to exploit audiovisual material.",
                  "Appropriate clothing.",
                  "Responsible for tools, organizers no responsibility.",
                  "At least 10 contestants per topic, otherwise canceled.",
                  "Excluded if not present 15 min before. No refund.",
                  "Organizers reserve right to modify rules."
                ].map((rule, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", minWidth: 20 }}>{i+1}.</span>
                    <span style={{ color: "#ccc", fontSize: "0.9rem", lineHeight: 1.6 }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}