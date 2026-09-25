import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { faq } from "@/data/faq";
import { joinHref, talkHref } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "FSP FAQ",
  description: "Answers to common questions about the Facilitator Support Program: who can join, formats, community, the 30 Days Challenge, the programs, resources and how to join.",
  path: "/faq",
});

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: "FAQ", path: "/faq" }])} />
      <PageHero eyebrow="FAQ" size="hero" lines={["Questions", <>answered<span key="s" className="text-orange">.</span></>]} />

      <section aria-label="Frequently asked questions" className="bg-paper pb-24 md:pb-36">
        <div className="container-fsp grid-fsp gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <p className="eyebrow text-muted">{faq.length} questions</p>
              <p className="mt-4 max-w-xs text-muted">{faq[faq.length - 1].answer}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={joinHref}>Join FSP</Button>
                <Button href={talkHref} variant="outline" arrow={false}>Talk to us</Button>
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-9">
            <Accordion headingLevel="h2" items={faq.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
          </div>
        </div>
      </section>
    </>
  );
}
