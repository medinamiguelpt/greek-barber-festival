"use client";
import PageBanner from "./PageBanner";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";

interface Props {
  bannerTitle: string;
  bannerImage: string;
  categoryNumber: number;
  categoryTitle: string;
  descKey: string;
  prereqsKey: string;
  criteriaKey: string;
  hasBonus?: boolean;
  timeKey?: string;
}

export default function CompetitionCategoryPage({ bannerTitle, bannerImage, categoryNumber, categoryTitle, descKey, prereqsKey, criteriaKey, hasBonus = true, timeKey }: Props) {
  const { t, tArr } = useLanguage();
  const prereqs = tArr(prereqsKey);
  const criteria = tArr(criteriaKey);
  const time = timeKey || "60 min";

  return (
    <>
      <PageBanner title={bannerTitle} image={bannerImage} />
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid var(--border)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 8 }}>{categoryNumber}. {categoryTitle}</h2>
            <p style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 20 }}>{t("cat_duration")} {time}</p>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: 12 }}>{t("cat_description")}</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>{t(descKey)}</p>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: 12 }}>{t("cat_prereqs")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
              {prereqs.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", minWidth: 20 }}>{i + 1})</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid var(--border)" }}>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: 16 }}>{t("cat_criteria")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {criteria.map((c, i) => {
                const [name, pts] = c.split("|");
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "var(--gold-bg-light)", borderRadius: 8, flexWrap: "wrap", gap: 8 }}>
                    <span style={{ color: "var(--text-secondary)" }}>{i + 1}) {name}</span>
                    <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>{pts}</span>
                  </div>
                );
              })}
            </div>
            {hasBonus && (
              <div style={{ marginTop: 20, padding: 16, background: "var(--gold-bg)", borderRadius: 8, textAlign: "center" }}>
                <p style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>{t("cat_bonus")}</p>
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
