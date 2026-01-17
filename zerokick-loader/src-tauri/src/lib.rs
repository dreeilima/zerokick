mod hwid;
mod game_detection;

use hwid::{generate_hwid, get_hardware_info, HardwareInfo};
use game_detection::{detect_games, is_game_running, get_game_process_id, DetectedGame};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

/// Get Hardware ID (HWID) for this machine
#[tauri::command]
fn get_hwid() -> Result<String, String> {
    generate_hwid()
}

/// Get complete hardware information
#[tauri::command]
fn get_hw_info() -> Result<HardwareInfo, String> {
    get_hardware_info()
}

/// Detect which games are currently running
#[tauri::command]
fn detect_running_games() -> Vec<DetectedGame> {
    detect_games()
}

/// Check if a specific game is running
#[tauri::command]
fn check_game_running(game_slug: String) -> bool {
    is_game_running(&game_slug)
}

/// Get process ID of a running game
#[tauri::command]
fn get_game_pid(game_slug: String) -> Option<u32> {
    get_game_process_id(&game_slug)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_hwid,
            get_hw_info,
            detect_running_games,
            check_game_running,
            get_game_pid
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


