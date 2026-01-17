/**
 * Detected Games Section Component
 *
 * Shows real-time detection of running games
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  RiGamepadLine,
  RiPlayCircleLine,
  RiStopCircleLine,
} from "@remixicon/react";
import { useGameDetection } from "../lib/use-game-detection";
import type { License } from "../lib/api-client";

interface DetectedGamesSectionProps {
  licenses: License[];
}

export function DetectedGamesSection({ licenses }: DetectedGamesSectionProps) {
  const { games, runningGames, isLoading, error } = useGameDetection();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Detectando jogos...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6">
          <p className="text-destructive text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  // Create map of user's licensed games
  const licensedGames = new Map(licenses.map((l) => [l.gameSlug, l]));

  return (
    <div className="space-y-4">
      {/* Running Games Alert */}
      {runningGames.length > 0 && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <RiPlayCircleLine className="h-5 w-5 text-green-500" />
              <p className="text-sm font-medium">
                {runningGames.length} jogo(s) em execução detectado(s)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Games Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => {
          const license = licensedGames.get(game.slug);
          const hasLicense = !!license;
          const isLicenseActive =
            license?.active &&
            (!license.expiresAt || new Date(license.expiresAt) > new Date());

          return (
            <Card
              key={game.slug}
              className={`${game.running ? "border-green-500/50" : ""} ${!hasLicense && "opacity-60"}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RiGamepadLine className="h-5 w-5 text-primary" />
                    {game.name}
                  </CardTitle>
                  <Badge variant={game.running ? "default" : "secondary"}>
                    {game.running ? (
                      <span className="flex items-center gap-1">
                        <RiPlayCircleLine className="h-3 w-3" />
                        Rodando
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <RiStopCircleLine className="h-3 w-3" />
                        Parado
                      </span>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {hasLicense ? (
                  <>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Plano:</span>{" "}
                      <span className="capitalize">
                        {license.subscriptionTier.replace(/_/g, " ")}
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      disabled={!game.running || !isLicenseActive}
                      variant={
                        game.running && isLicenseActive ? "default" : "outline"
                      }
                    >
                      {!isLicenseActive
                        ? "Licença Inativa"
                        : game.running
                          ? "Injetar Macros"
                          : "Aguardando Jogo"}
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Você não possui licença para este jogo
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href="http://localhost:3000/dashboard/billing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Comprar Licença
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
