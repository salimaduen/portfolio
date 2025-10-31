import { useEffect, useRef, useState } from "react";
import TerminalLineLoading from "../components/TerminalLineLoading";

export interface bootingProps {
  nextStage: () => void;
}

export default function Booting({ nextStage }: bootingProps) {
      const bootMessages = [
        "Started Apply Kernel Variables.",
        "Mounted Kernel Debug File System.",
        "Mounted Huge Pages File System.",
        "Mounted POSIX Message Queue File System.",
        "Started Read and set NIS domainname from /etc/sysconfig/network.",
        "Activated swap /dev/mapper/c1-swap",
        "Reached target Swap.",
        "Started Remount Root and Kernel File Systems.",
        "Starting Flush Journal to Persistent Storage...",
        "Starting Load/Save Random Seed...",
        "Starting Create Static Device Nodes in /dev...",
        "Started Load/Save Random Seed.",
        "Started Flush Journal to Persistent Storage.",
        "Started Setup Virtual Console.",
        "Started Create Static Device Nodes in /dev.",
        "Starting udev Kernel Device Manager...",
        "Started udev Kernel Device Manager.",
        "Created slice system-lvm2\\x2dpvscan.slice.",
        "Starting LVM event activation on device 8:2...",
        "Started Monitoring of LVM2 mirrors, snapshots etc. using dmeventd or progress polling.",
        "Reached target Local File Systems (Pre).",
        "Mounting /boot...",
        "Mounting /var...",
        "Mounted /boot.",
        "Mounted /var.",
        "Reached target Local File Systems.",
        "Starting Create Volatile Files and Directories...",
        "Started LVM event activation on device 8:2.",
        "Starting Load/Save RF Kill Switch Status...",
        "Starting File System Check on /dev/sda1...",
        "Started File System Check on /dev/sda1.",
        "Mounting /home...",
        "Mounted /home.",
        "Started Create Volatile Files and Directories.",
        "Starting Update UTMP about System Boot/Shutdown...",
        "Started Load/Save RF Kill Switch Status.",
        "Started Update UTMP about System Boot/Shutdown.",
        "Starting Network Service...",
        "Starting Permit User Sessions...",
        "Started Permit User Sessions.",
        "Starting GNOME Display Manager...",
        "Started Getty on tty1.",
        "Reached target Login Prompts.",
        "Started Network Service.",
        "Starting Network Manager...",
        "Started GNOME Display Manager.",
        "Started Network Manager.",
        "Starting Hostname Service...",
        "Started Hostname Service.",
        "Reached target Multi-User System.",
        "Reached target Graphical Interface.",
        "Starting Authorization Manager...",
        "Started Authorization Manager.",
        "Started Manage Sound Card State (restore and store).",
        "Reached target Sound Card.",
        "Starting System Logging Service...",
        "Started System Logging Service.",
        "Starting D-Bus System Message Bus...",
        "Started D-Bus System Message Bus.",
        "Starting Bluetooth service...",
        "Started Bluetooth service.",
        "Starting Accounts Service...",
        "Started Accounts Service.",
        "Started Avahi mDNS/DNS-SD Stack.",
        "Reached target Host and Network Name Lookups.",
        "Starting CUPS Scheduler...",
        "Started CUPS Scheduler.",
        "Starting Disk Manager...",
        "Started Disk Manager.",
        "Reached target Printer."
    ];

  const [visibleLines, setVisibleLines] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const skipRef = useRef<boolean>(false);

  // Pace: ~18–50ms per line feels OS-like but readable
  useEffect(() => {
    if (visibleLines < bootMessages.length && !skipRef.current) {
      const time = 18 + Math.floor(Math.random() * 32);
      const timer = setTimeout(() => setVisibleLines((p) => p + 1), time);
      return () => clearTimeout(timer);
    }
    if (visibleLines >= bootMessages.length) {
      const t = setTimeout(() => nextStage(), 250);
      return () => clearTimeout(t);
    }
  }, [visibleLines, bootMessages.length, nextStage]);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // Press Enter to skip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        skipRef.current = true;
        setVisibleLines(bootMessages.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bootMessages.length]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto p-2 text-green-200 font-mono">
      {bootMessages.slice(0, visibleLines).map((line, idx) => (
        <TerminalLineLoading key={idx} line={line} />
      ))}
      <div className="mt-2 text-xs opacity-70">Press <kbd>Enter</kbd> to skip boot</div>
    </div>
  );
}
