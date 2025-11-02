import { TerminalLineProps } from "./TerminalLine";

interface LineWrapperProps {
    children: React.ReactNode;
}

function LineWrapper({children}: LineWrapperProps) {
    return(
        <div className="flex flex-row">
            {children}
        </div>
    );
}

export default function TerminalLineLoading({ line }: TerminalLineProps) {
    const getLineFormat = (line: string) => {
        const firstWord = line.split(' ')[0];
        if (firstWord.substring(firstWord.length - 3) === "ing") {
            return (
                <LineWrapper>
                    <p className="pl-16">{line}</p>
                </LineWrapper>
            );
        }
        return (
                <LineWrapper>
                    <p>[<span className="text-green-600 px-4">OK</span>]</p>
                    <p className="pl-2">{line}</p>
                </LineWrapper>
        );
    }
    return (
        <div className="flex flex-col text-[12px] font-linux">
            {getLineFormat(line)}
        </div>
    );
}