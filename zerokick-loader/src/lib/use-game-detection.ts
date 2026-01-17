/**
 * Game Detection Hook
 *
 * Detects running games and updates state automatically
 */

import { useEffect, useState } from "react";
import { detectRunningGames, type DetectedGame } from "./tauri-commands";

export function useGameDetection(refreshInterval: number = 2000) {
  const [games, setGames] = useState<DetectedGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial detection
    detectGames();

    // Auto-refresh
    const interval = setInterval(detectGames, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const detectGames = async () => {
    try {
      const detected = await detectRunningGames();
      setGames(detected);
      setError(null);
    } catch (err: any) {
      console.error("Game detection error:", err);
      // Tauri command errors usually come as strings or objects with message
      const msg =
        typeof err === "string"
          ? err
          : err.message || "Erro desconhecido na detecção";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const runningGames = games.filter((g) => g.running);
  const hasRunningGames = runningGames.length > 0;

  return {
    games,
    runningGames,
    hasRunningGames,
    isLoading,
    error,
    refresh: detectGames,
  };
}
