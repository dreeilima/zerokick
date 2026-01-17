/**
 * Tauri Commands
 *
 * TypeScript bindings for Rust functions
 */

import { invoke } from "@tauri-apps/api/core";

export interface HardwareInfo {
  hwid: string;
  cpu_brand: string;
  total_memory: number;
}

export interface DetectedGame {
  slug: string;
  name: string;
  process_id: number;
  running: boolean;
}

/**
 * Get Hardware ID (HWID) for this machine
 */
export async function getHWID(): Promise<string> {
  return await invoke<string>("get_hwid");
}

/**
 * Get complete hardware information
 */
export async function getHardwareInfo(): Promise<HardwareInfo> {
  return await invoke<HardwareInfo>("get_hw_info");
}

/**
 * Detect which games are currently running
 */
export async function detectRunningGames(): Promise<DetectedGame[]> {
  return await invoke<DetectedGame[]>("detect_running_games");
}

/**
 * Check if a specific game is running
 */
export async function checkGameRunning(gameSlug: string): Promise<boolean> {
  return await invoke<boolean>("check_game_running", { gameSlug });
}

/**
 * Get process ID of a running game
 */
export async function getGamePID(gameSlug: string): Promise<number | null> {
  return await invoke<number | null>("get_game_pid", { gameSlug });
}
