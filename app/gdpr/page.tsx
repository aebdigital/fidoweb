import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "GDPR",
  description:
    "Zásady ochrany osobných údajov pre FIDO Calcul vrátane informácií o spracovaní osobných údajov, cookies a právach dotknutej osoby.",
  alternates: {
    canonical: "/gdpr",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "GDPR | FIDO Calcul",
    description:
      "Zásady ochrany osobných údajov pre FIDO Calcul vrátane informácií o spracovaní osobných údajov, cookies a právach dotknutej osoby.",
    url: `${SITE_URL}/gdpr`,
    images: [
      {
        url: "/assets/app-icon.jpg",
        width: 512,
        height: 512,
        alt: "GDPR FIDO Calcul",
      },
    ],
  },
};

export default function GdprPage() {
  return (
    <SiteShell activePath="/gdpr">
      <section className="section-shell pt-12 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-4xl">
          <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--panel)] px-6 py-8 shadow-[var(--shadow-soft)] sm:px-8 sm:py-10 lg:px-10">
            <h1 className="font-display text-[clamp(3rem,6vw,5.4rem)] font-extrabold leading-[0.92]  text-[color:var(--foreground)]">
              Ochrana osobných údajov
            </h1>

            <div className="mt-6 space-y-1 text-base leading-8 text-[color:var(--foreground)]">
              <p>IČO 48110965</p>
              <p>DIČ 2120049096</p>
              <p>IČ DPH SK2120049096, podľa §4, registrácia od 1.2.2021</p>
              <p>Sídlo</p>
              <p>Fido s.r.o.</p>
              <p>Zajačia 15875/15 080 01 Prešov</p>
              <p>Fido s.r.o. kontakt@fido.sk +421 917 617 202</p>
            </div>

            <div className="mt-10 space-y-6 text-base leading-8 text-[color:var(--foreground)]">
              <p>
                Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
              </p>

              <div className="space-y-4">
                <p className="font-semibold">I. Kontaktný formulár</p>
                <p>
                  Na našej webovej stránke prevádzkujeme kontaktný formulár na dvoch samostatných stránkach, ktorého účelom je umožniť vám:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-[color:var(--foreground)] marker:text-[color:var(--foreground)]">
                  <li>Položiť otázku k našim produktom a službám</li>
                  <li>Požiadať o cenovú ponuku</li>
                </ul>
                <p className="font-medium">Rozsah spracúvaných údajov:</p>
                <ul className="list-disc space-y-2 pl-6 text-[color:var(--foreground)] marker:text-[color:var(--foreground)]">
                  <li>Meno a priezvisko</li>
                  <li>E-mailová adresa</li>
                  <li>Telefónne číslo</li>
                </ul>
                <p>
                  <span className="font-medium">Účel spracovania:</span> Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.
                </p>
                <p>
                  <span className="font-medium">Právny základ:</span> Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.
                </p>
                <p>
                  <span className="font-medium">Doba uchovávania:</span> Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.
                </p>
              </div>

              <div className="space-y-4">
                <p className="font-semibold">II. Súbory cookies</p>
                <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
                <ul className="list-disc space-y-2 pl-6 text-[color:var(--foreground)] marker:text-[color:var(--foreground)]">
                  <li>Nevyhnutné cookies – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).</li>
                  <li>Štatistické (analytické) cookies – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</li>
                </ul>
                <p>
                  <span className="font-medium">Správa súhlasov:</span> Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.
                </p>
              </div>

              <div className="space-y-4">
                <p className="font-semibold">III. Práva dotknutej osoby</p>
                <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
                <ul className="list-disc space-y-2 pl-6 text-[color:var(--foreground)] marker:text-[color:var(--foreground)]">
                  <li>Prístup k osobným údajom, ktoré spracúvame</li>
                  <li>Oprava nepresných alebo neúplných údajov</li>
                  <li>Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ</li>
                  <li>Obmedzenie spracovania</li>
                  <li>Prenosnosť údajov</li>
                  <li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li>
                  <li>Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)</li>
                </ul>
                <p>
                  V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na kontakt@fido.sk alebo telefónnom čísle +421 917 617 202.
                </p>
              </div>

              <p>Tieto Zásady nadobúdajú účinnosť dňom 25. 4. 2025.</p>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
