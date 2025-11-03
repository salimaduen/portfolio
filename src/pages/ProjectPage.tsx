import { BrowserPage } from "@features/browser";
import { Section, P, List, Item, LinkA, Divider, CodeBlock } from "@features/browser/components/BrowserElements";

export default function ProjectsPage() {
  return (
    <BrowserPage
      title="Projects"
      subtitle="Selected work"
      footerNote="Built with React + Tailwind • Displayed via in-OS Browser"
    >
      {/* 1) Money Mundo — ShellHacks 2024 */}
      <Section title="AI-Powered Financial Guidance — Money Mundo (ShellHacks 2024)">
        <P>
          Hackathon project delivering personalized financial guidance through a fine-tuned OpenAI model and modular backend.
          Achieved ~65% higher response accuracy and relevance in user evaluations.
        </P>
        <List>
          <Item>Integrated fine-tuned LLM for tailored recommendations based on user profiles.</Item>
          <Item>Implemented JWT authentication and modular REST APIs for profiles, users, and recommendations.</Item>
          <Item>Designed for scalable deployment with clean separation of backend services.</Item>
        </List>
        <P>
          <LinkA href="https://github.com/salimaduen/Shellhack2024" external>
            GitHub - Money Mundo
          </LinkA>
        </P>
      </Section>

      <Divider />

      {/* 2) Brain Tumor Classifier — ViT vs CNN */}
      <Section title="Brain Tumor Classifier (ViT vs. CNN)">
        <P>
          Comparative ML project evaluating a custom CNN versus a fine-tuned Vision Transformer (ViT) for MRI-based brain tumor classification.
          ViT achieved ~99.5% test accuracy with superior robustness to image rotation.
        </P>
        <List>
          <Item>Dataset: 4 classes (Healthy, Pituitary, Glioma, Meningioma).</Item>
          <Item>Transforms: Resize(224), RandomHorizontalFlip, RandomRotation(10), Normalize(0.5).</Item>
          <Item>Splits: 70% train / 10% validation / 20% test; used early stopping and LR scheduling.</Item>
        </List>
        <P>
          <LinkA href="https://github.com/salimaduen/ai-finalproject" external>
            GitHub - Brain Tumor Classifier
          </LinkA>
        </P>
        <Divider />
        <CodeBlock>
{`# Example transforms (PyTorch)
transforms.Compose([
  transforms.Resize(224),
  transforms.RandomHorizontalFlip(),
  transforms.RandomRotation(10),
  transforms.ToTensor(),
  transforms.Normalize([0.5]*3, [0.5]*3),
])`}
        </CodeBlock>
      </Section>

      <Divider />

      {/* 3) DevBuds */}
      <Section title="DevBuds - Team Up by Role & Skills">
        <P>
          Collaborative platform where users can post project ideas and recruit by role (frontend, backend, UI/UX).
          Built with React, TypeScript, Tailwind CSS, and Supabase.
        </P>
        <List>
          <Item>Developed key UI components and pages with React + Tailwind.</Item>
          <Item>Implemented Supabase queries and data parsing for team role requests.</Item>
          <Item>Contributed to responsive layouts and component-level logic.</Item>
        </List>
        <P>
          <LinkA href="https://github.com/AlejandroV01/devbuds" external>
            GitHub - DevBuds
          </LinkA>
        </P>
      </Section>

      <Divider />

      {/* 4) Google Tech Exchange — Software Dev Studio */}
      <Section title="Google Tech Exchange - Software Development Studio">
        <P>
          Led a 3-person team to build a greenfield Wiki site using Python/Flask and Google Cloud, featuring user authentication
          and content management capabilities.
        </P>
        <List>
          <Item>Owned requirements, design, testing, and CI/CD; improved delivery speed by ~20%.</Item>
          <Item>Provisioned non-relational storage with GCP for dynamic content storage and retrieval.</Item>
          <Item>Implemented secure authentication and content workflow features.</Item>
        </List>
        <P>
          <LinkA href="https://github.com/salimaduen/Project-Imposter" external>
            GitHub - Project Imposter
          </LinkA>
        </P>
      </Section>
    </BrowserPage>
  );
}
