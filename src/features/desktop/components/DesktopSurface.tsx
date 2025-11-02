type Props = { children?: React.ReactNode };

export default function DesktopSurface({ children }: Props) {
  return (
    <div className="relative bg-ubuntu-wallpaper-phone bg-cover w-full h-full">
      {children}
    </div>
  );
}
