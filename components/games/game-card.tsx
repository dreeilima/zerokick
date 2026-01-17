import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/ui";
import Image from "next/image";

interface GameCardProps {
  name: string;
  slug: string;
  icon: string;
  comingSoon?: boolean;
  className?: string;
}

/**
 * GameCard Component
 * 
 * Displays a game card with icon, name, and optional "Coming Soon" badge
 */
export function GameCard({
  name,
  slug,
  icon,
  comingSoon = false,
  className,
}: GameCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border transition-all duration-300 hover:border-primary/50 hover:shadow-lg",
        comingSoon && "opacity-60",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Game Icon */}
          <div className="relative h-20 w-20 transition-transform duration-300 group-hover:scale-110">
            <Image
              src={icon}
              alt={name}
              fill
              className="object-contain"
              sizes="80px"
            />
          </div>

          {/* Game Name */}
          <h3 className="font-semibold text-lg">{name}</h3>

          {/* Coming Soon Badge */}
          {comingSoon && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Coming Soon
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
