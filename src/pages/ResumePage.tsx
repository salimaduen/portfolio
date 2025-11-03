import { BrowserPage } from "@features/browser";
import { Section, P, LinkA } from "@features/browser/components/BrowserElements";

export default function ResumePdfPage() {
  return (
    <BrowserPage
      title="Resume (PDF)"
      subtitle="Printable version"
      footerNote="Press the browser's print button to save as PDF"
    >
      <Section>
        <P><LinkA href="/resume.pdf" external>Download resume.pdf</LinkA></P>
      </Section>

      <div className="mt-2 w-full h-[70vh] rounded-md overflow-hidden border border-neutral-200 bg-white">
        <iframe
          title="Resume PDF"
          src="/resume.pdf"
          className="w-full h-full"
        />
      </div>
    </BrowserPage>
  );
}
