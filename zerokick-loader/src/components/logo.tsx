import { cn } from "../lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "split";
  className?: string;
}

/**
 * ZeroKick Logo Component
 *
 * @param variant - "full" shows complete logo image, "icon" shows only crosshair, "split" shows icon + text separately
 * @param className - Additional CSS classes
 */
export function Logo({ variant = "full", className }: LogoProps) {
  // Only the crosshair icon
  if (variant === "icon") {
    return (
      <img
        src="/logo-menor.png"
        alt="ZeroKick"
        width={40}
        height={40}
        className={cn("object-contain", className)}
      />
    );
  }

  // Icon + Text side by side (for footer, etc)
  if (variant === "split") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <img
          src="/logo-menor.png"
          alt="ZeroKick"
          width={32}
          height={32}
          className="object-contain"
        />
        <span className="text-xl font-bold">
          <span className="text-foreground">ZERO</span>
          <span className="text-primary">KICK</span>
        </span>
      </div>
    );
  }

  // Complete logo image
  return (
    <img
      src="/logo-full.png"
      alt="ZeroKick"
      width={200}
      height={50}
      className={cn("object-contain", className)}
    />
  );
}
