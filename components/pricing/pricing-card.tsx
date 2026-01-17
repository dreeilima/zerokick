import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils/ui";
import { RiCheckLine } from "@remixicon/react";
import Link from "next/link";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: readonly string[];
  cta: string;
  popular?: boolean;
  priceLabel?: string; // "month" or "lifetime"
  className?: string;
}

/**
 * PricingCard Component
 * 
 * Displays a pricing plan card with features list and CTA button
 */
export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  popular = false,
  priceLabel,
  className,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col border transition-all duration-300 hover:shadow-xl",
        popular && "border-primary shadow-lg scale-105",
        className
      )}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-8 pt-8">
        {/* Plan Name */}
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold">${price}</span>
          {priceLabel && (
            <span className="text-muted-foreground">/{priceLabel}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Features List */}
        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <RiCheckLine
                size={20}
                className="text-primary shrink-0 mt-0.5"
              />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link href="/signup" className="w-full">
          <Button
            size="lg"
            className="w-full"
            variant={popular ? "default" : "outline"}
          >
            {cta}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
