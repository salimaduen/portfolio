import { BrowserPage } from "@features/browser";
import {
    Section,
    P,
    List,
    Item,
    LinkA,
    Divider,
    CodeBlock,
} from "@features/browser/components/BrowserElements";

export default function OSWelcomePage() {
    return (
        <BrowserPage
            title="about:welcome"
            subtitle="Welcome to Salomon OS"
            footerNote="Tip: Drag windows by the top bar * Dock on the left to switch apps"
        >
            <Section title="Hello! 👋">
                <P>
                    You're inside a Linux-style desktop built in React + Tailwind. Use the
                    Dock to switch apps, desktop shortcuts to open things, and the window
                    controls to minimize / maximize / close.
                </P>
                <CodeBlock>{
                `/* 
 ___  ___  _      ___   __  __   ___   _  _ 
/ __|/   \| |    / _ \ |  \/  | / _ \ | \| |
\__ \| - || |__ | (_) || |\/| || (_) || .  |
|___/|_|_||____| \___/ |_|  |_| \___/ |_|\_|
      Salomon OS * Retro Desktop * about:welcome
*/`
                }
                </CodeBlock>
            </Section>

            <Section title="Quick Start">
                <List>
                    <Item>
                        <b>Projects:</b> Open <LinkA href="about:projects">about:projects</LinkA> in the Browser.
                    </Item>
                    <Item>
                        <b>Resume:</b> Use the desktop shortcut or open via the Browser (e.g., about:resume).
                    </Item>
                    <Item>
                        <b>Files:</b> Explore the retro File Explorer window.
                    </Item>
                    <Item>
                        <b>External:</b> <LinkA href="https://github.com/salimaduen" external>GitHub</LinkA> *{" "}
                        <LinkA href="https://www.linkedin.com/in/salomon-aduen" external>LinkedIn</LinkA>
                    </Item>
                </List>
            </Section>

            <Section title="Window Tips">
                <List>
                    <Item>Drag from the top bar (not the buttons).</Item>
                    <Item>Click a Dock icon to focus/restore; click again to minimize.</Item>
                    <Item>Maximize respects the top bar and left Dock.</Item>
                </List>
                <Divider />
                <CodeBlock>{`// Dock indicators
// • small dot = open
// • highlighted bg = focused
// Click = focus/restore, Click again = minimize`}</CodeBlock>
            </Section>

            <Section title="About">
                <P>
                    This is a custom, sandboxed UI (no real OS). The Browser is a static renderer
                    for internal pages like <i>about:projects</i>, <i>about:welcome</i>, or your custom
                    pages. You can still link out to external sites safely.
                </P>
            </Section>
        </BrowserPage>
    );
}
