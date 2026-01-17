import { cn } from "../../lib/utils";

interface AuthHeaderProps {
  title: string;
  description?: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1.5")}>
      <h1 className="text-xl font-semibold tracking-tight text-card-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
