import React from "react";
import { BrowserPage } from "../features/browser";
import { Section, P, List, Item, LinkA, Divider, CodeBlock } from "../features/browser/components/BrowserElements"

export default function ProjectsPage() {
  return (
    <BrowserPage
      title="Projects"
      subtitle="Selected work & experiments"
      footerNote="Built with React + Tailwind • Displayed via in-OS Browser"
    >
      <Section title="Brain Tumor Classifier (ViT vs CNN)">
        <P>
          Fine-tuned ViT and trained a custom CNN on MRI data; ~99.5% test accuracy with ViT and strong robustness to image perturbations.
        </P>
        <List>
          <Item>Data: 4 classes (Healthy, Pituitary, Glioma, Meningioma)</Item>
          <Item>Transforms: Resize(224), RandomRotation(10), Normalize(0.5)</Item>
          <Item>Splits: 70/10/20 train/val/test</Item>
        </List>
        <Divider />
        <CodeBlock>
          {`# Example: PyTorch transforms
            transforms.Compose([
              transforms.Resize(224),
              transforms.RandomHorizontalFlip(),
              transforms.RandomRotation(10),
              transforms.ToTensor(),
              transforms.Normalize([0.5]*3, [0.5]*3),
            ])`
          }
        </CodeBlock>
      </Section>

      <Section title="Playwright + Electron Task Agent">
        <P>
          TypeScript agent that converses with users and performs actions in a target web app using Playwright.
          Registry-driven custom actions + typed config parsers.
        </P>
        <List>
          <Item>Open-Closed design for custom arguments</Item>
          <Item>SequenceStep parser with mandatory & optional args</Item>
          <Item>Service-based architecture</Item>
        </List>
        <P>
          <LinkA href="https://github.com/salimaduen" external>GitHub</LinkA>
        </P>
      </Section>

      <Section title="STM32 + PN532 NFC Kill Switch">
        <P>MOSFET-based fuel-pump control with NFC whitelist; anti-bypass strategies and latching logic.</P>
      </Section>
    </BrowserPage>
  );
}
