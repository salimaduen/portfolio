export interface TerminalLineProps {
    line: string;
    className?: string;
}

export default function TerminalLine({ line, className }: TerminalLineProps) {
    return(
        <div className={`text-[12px] font-linux ${className}`}>
            <p>{line}</p>
        </div>
    );
}