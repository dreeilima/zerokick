import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiToolsFill } from "@remixicon/react";

const GAMES = [
  { name: "CS2", status: "undetected", version: "v4.1.0" },
  { name: "Valorant", status: "undetected", version: "v2.3.2" },
  { name: "Apex Legends", status: "undetected", version: "v1.9.5" },
  { name: "PUBG", status: "undetected", version: "v3.0.1" },
  { name: "Rust", status: "maintenance", version: "v--" },
  { name: "Rainbow Six", status: "undetected", version: "v1.5.0" },
];

export function GamesStatus() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Status do Sistema</CardTitle>
          <span className="text-xs text-muted-foreground">Atualizado há 5m</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {GAMES.map((game) => (
          <div key={game.name} className="flex items-center justify-between p-3 rounded-lg border border-muted/60 hover:border-primary/50 transition-colors">
            <div className="space-y-0.5">
              <p className="font-medium leading-none">{game.name}</p>
              <p className="text-xs text-muted-foreground">{game.version}</p>
            </div>
            
            {game.status === "undetected" ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Undetected
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium border border-yellow-500/20">
                <RiToolsFill className="h-3 w-3" />
                Manutenção
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
