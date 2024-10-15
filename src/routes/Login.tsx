import { useEffect, useState } from "react";
import TerminalLine from "../components/TerminalLine";

export interface LoginProps {
    nextStage: () => void;
}

export default function Login({ nextStage }: LoginProps) {
    const [phase, setPhase] = useState<'username' | 'password' | 'loggedIn' | 'loading'>('username');
    const [displayText, setDisplayText] = useState<string>('');
    const [textIdx, setTextIdx] = useState<number>(0);
    const [blink, setBlink] = useState<Boolean>(true);
    const [lines, setLines] = useState<string[]>([]);

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    const USERNAME = "salimaduen";
    const COMMAND = 'start';

    useEffect(() => {

        if (phase === "username") {
            if (textIdx < USERNAME.length) {
                const timer = setTimeout(() => {
                    setDisplayText(`ubuntu login: ${USERNAME.substring(0, textIdx + 1)}`);
                    setTextIdx((prev) => prev + 1);
                }, 30);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => {
                    setLines((prev) => [...prev, displayText]);
                    setPhase('password');
                    setDisplayText('');
                }, 250)
                return () => clearTimeout(timer);
            }

        } else if (phase === "password") {
            setDisplayText("Password:")
            const timer = setTimeout(() => {
                setLines((prev) => [...prev,
                    "Password:",
                    `Last login: Thu Oct 2 19:09:22 EST 2024 in tty1`,
                    "Welcome to Ubuntu 16.04 LTS (GNU/LINUX 4.4.0-21-generic x84_64)"
                ]);
                setPhase('loggedIn');
                setIsLoggedIn(true);
                setDisplayText('');
                setTextIdx(0);
            }, 1300)
            return () => clearTimeout(timer);

        } else if (phase === "loggedIn") {
            if (textIdx < COMMAND.length) {
                const timer = setTimeout(() => {
                    setDisplayText(`salimaduen@ubuntu:$ ${COMMAND.substring(0, textIdx + 1)}`)
                    setTextIdx((prev) => prev + 1);
                }, 400);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => {
                    setDisplayText('');
                    setPhase('loading');
                }, 400);
                return () => clearTimeout(timer);
            }
        } else if (phase === 'loading') {
            const timer = setTimeout(() => {
                nextStage();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [phase, textIdx]);

    useEffect(() => {
        setTimeout(() => {
            setBlink((prev) => prev!);
        }, 400);
    }, [blink]);

    return (
        <div className="flex flex-col h-screen">
            <TerminalLine className="pb-2" line={"Ubuntu 16.04 LTS ubuntu tty1"} />
            {lines.map((line, idx) => (
                <TerminalLine key={idx} line={line} />
            ))}

            {phase === "username" && (
                <TerminalLine line={`${displayText}${blink ? '_' : ''}`} />
            )}

            {phase === "password" && (
                <TerminalLine line={displayText} />
            )}

            {isLoggedIn && (
                <>
                    <TerminalLine className="pl-2 pt-4" line={"* Documentation:\thttps://help.ubuntu.com/"} />
                    <div className="pt-2">
                        <TerminalLine line={"0 packages can be updated."} />
                        <TerminalLine line={"0 updates are security updates."} />
                    </div>
                </>
            )}

            {phase === "loggedIn" && (
                <TerminalLine className="pt-4" line={`${displayText}${blink ? '_' : ''}`} />
            )}

            {phase === "loading" && (
                <>
                    <TerminalLine className="pt-4" line={`salimaduen@ubuntu:$ start`} />
                    <TerminalLine line={`${displayText}`} />
                </>  
            )}

        </div>
    );
}