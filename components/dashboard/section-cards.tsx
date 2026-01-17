import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RiCrosshair2Line,
  RiTimeLine,
  RiTrophyLine,
  RiVipCrownLine,
} from "@remixicon/react";
import { title_font } from "@/public/fonts/font_index";

type StatItem = {
  label: string;
  value: string;
  subtext: string;
  icon: any;
  trend?: {
    value: string;
    isPositive: boolean;
  };
};

// Mock data para estatísticas de jogo
const STATS: StatItem[] = [
  {
    label: "K/D Ratio",
    value: "2.45",
    subtext: "Últimas 20 partidas",
    icon: RiCrosshair2Line,
    trend: { value: "+0.15", isPositive: true },
  },
  {
    label: "Win Rate",
    value: "68%",
    subtext: "Competitivo",
    icon: RiTrophyLine,
    trend: { value: "+4%", isPositive: true },
  },
  {
    label: "Assinatura",
    value: "Free",
    subtext: "Expira em: N/A",
    icon: RiVipCrownLine,
  },
  {
    label: "Tempo de Uso",
    value: "12h",
    subtext: "Total esta semana",
    icon: RiTimeLine,
  },
];

export function SectionCards() {
  return (
    <div
      className={`relative ${title_font.className} *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-3 @xl/main:grid-cols-2 @5xl/main:grid-cols-4`}
    >
      {STATS.map(({ label, value, subtext, icon: Icon, trend }) => (
        <Card key={label} className="@container/card gap-2 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
              <Icon className="size-4" />
              {label}
            </CardTitle>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{value}</span>
              {trend && (
                <Badge variant="outline" className={`${trend.isPositive ? "text-green-500 border-green-500/20 bg-green-500/10" : "text-red-500"}`}>
                  {trend.value}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground">
            {subtext}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
