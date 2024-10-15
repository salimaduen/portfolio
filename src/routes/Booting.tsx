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
    ]    

    const [visibleLines, setVisibleLines ] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (visibleLines < bootMessages.length) {
            const time = Math.floor(Math.random() * 30);
            const timer = setTimeout(() => {
                setVisibleLines((prev) => prev + 1);
            }, time);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                nextStage();
            }, 200)
            return () => clearTimeout(timer);
        }
    }, [visibleLines, bootMessages.length]);

    useEffect(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, [visibleLines]);

    return (
        <div ref={containerRef} className="h-screen overflow-y-auto">
            {bootMessages.slice(0, visibleLines).map((line, idx) => (
                <TerminalLineLoading key={idx} line={line}/>
            ))}
        </div>
    );
}