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

export default function HomePage() {
    return (
        <BrowserPage
            title="about:home"
            subtitle="Welcome to Salomon's in-OS Browser"
            footerNote="Retro * Minimal * Just vibes"
        >
            <Section title="Welcome">
                <P>
                    This is a lightweight, retro-inspired start page rendered inside your
                    desktop browser window. Use it as the default landing page when the browser
                    icon opens with no specific content.
                </P>

                <CodeBlock>{`/* ──────────────────────────────────────────
 ___  ___  _      ___   __  __   ___   _  _ 
/ __|/   \| |    / _ \ |  \/  | / _ \ | \| |
\__ \| - || |__ | (_) || |\/| || (_) || .  |
|___/|_|_||____| \___/ |_|  |_| \___/ |_|\_|

   Linux Browser • about:home • v0.1                    
────────────────────────────────────────── */`
                }
                </CodeBlock>
            </Section>

            <Section title="Quick Links">
                <List>
                    <Item>
                        <LinkA href="https://github.com/salimaduen" external>
                            GitHub
                        </LinkA>
                    </Item>
                    <Item>
                        <LinkA href="https://www.linkedin.com/in/salomon-aduen" external>
                            LinkedIn
                        </LinkA>
                    </Item>
                </List>
            </Section>

            <Section title="Shortcuts & Tips">
                <P>Navigate your in-OS environment quickly:</P>
                <List>
                    <Item>
                        <b>Drag windows</b> from the top bar (not the buttons).
                    </Item>
                    <Item>
                        <b>Dock</b> shows open apps (left); click to focus or restore.
                    </Item>
                    <Item>
                        <b>Minimize / Maximize / Close</b> via the round window controls.
                    </Item>
                </List>
                <Divider />
                <CodeBlock>{`// Browser chrome actions (UI only)
                            [File]  [Edit]  [View]  [Go]  [Help]

                            // Nav bar icons (non-interactive placeholders)
                            ←  →  ↑  ⌂   |   [address bar]   |  ↻`
                }
                </CodeBlock>
            </Section>

            <Section title="Release Notes">
                <List>
                    <Item>v0.1 - Default home, retro banner, quick links, tips.</Item>
                </List>
            </Section>

            <Section title="About">
                <P>
                    Built with React + Tailwind, themed to resemble a lightweight Linux
                    desktop browser. This is a static start page — perfect as a default
                    when launching the Browser app from your dock or desktop.
                </P>
            </Section>
        </BrowserPage>
    );
}
