"use client";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import { PageBanner, SectionWrap } from "@/components/page-banner";

export default function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageBanner img={IMG.banners.contact} title={t.contact.title} />
      <SectionWrap>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-[20px] text-gold mb-4">{t.contact.sub}</h3>
            <pre className="text-[14px] text-tx-sec leading-[1.8] font-body whitespace-pre-wrap">{t.contact.info}</pre>
          </div>
          <div>
            {!sent ? (
              <div className="flex flex-col gap-3">
                {[t.contact.name, t.contact.email, t.contact.subject, t.contact.phone].map((ph, i) => (
                  <input key={i} placeholder={ph} className="form-input" />
                ))}
                <textarea placeholder={t.contact.message} rows={5} className="form-input resize-y" />
                <button className="cta-gold self-start" onClick={() => setSent(true)}>{t.contact.send}</button>
              </div>
            ) : (
              <div className="bg-gold/8 rounded-xl p-7 text-center">
                <div className="text-5xl mb-3">✅</div>
                <p className="text-gold">{t.contact.success}</p>
              </div>
            )}
          </div>
        </div>
      </SectionWrap>
    </>
  );
}
