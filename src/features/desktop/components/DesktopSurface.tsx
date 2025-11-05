import desktopWall from '@app/assets/ubuntu-wallpaper.png';
import phoneWall   from '@app/assets/ubuntu-wallpaper-phone.png';

type Props = { children?: React.ReactNode };

/**
 * Renders a full-screen wallpaper
 * - Phone: phoneWall
 * - ≥sm: desktopWall
 * Both use object-cover to fill the viewport. Tweak the crop by adjusting object position below.
 */
export default function DesktopSurface({ children }: Props) {
  return (
    <div className="relative w-full h-full">
      {/* Wallpaper layer */}
      <picture
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden
      >
        {/* Use desktop image on ≥sm */}
        <source srcSet={desktopWall} media="(min-width: 640px)" />
        {/* Fallback = phone image */}
        <img
          src={phoneWall}
          alt="" // decorative
          draggable={false}
          className="
            absolute inset-0 w-full h-full
            object-cover
            /* adjust crop focus if needed */
            object-center sm:object-center
          "
        />
      </picture>

      {/* Content over wallpaper */}
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
}
