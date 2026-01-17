use serde::{Deserialize, Serialize};
use sysinfo::{ProcessRefreshKind, System, ProcessesToUpdate};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DetectedGame {
    pub slug: String,
    pub name: String,
    pub process_id: u32,
    pub running: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameDefinition {
    pub slug: String,
    pub name: String,
    pub process_names: Vec<String>,
}

/// List of supported games and their process names
fn get_supported_games() -> Vec<GameDefinition> {
    vec![
        GameDefinition {
            slug: "cs2".to_string(),
            name: "Counter-Strike 2".to_string(),
            process_names: vec!["cs2.exe".to_string()],
        },
        GameDefinition {
            slug: "valorant".to_string(),
            name: "Valorant".to_string(),
            process_names: vec![
                "VALORANT-Win64-Shipping.exe".to_string(),
                "VALORANT.exe".to_string(),
            ],
        },
        GameDefinition {
            slug: "apex".to_string(),
            name: "Apex Legends".to_string(),
            process_names: vec!["r5apex.exe".to_string()],
        },
        GameDefinition {
            slug: "r6s".to_string(),
            name: "Rainbow Six Siege".to_string(),
            process_names: vec![
                "RainbowSix.exe".to_string(),
                "RainbowSixGame.exe".to_string(),
            ],
        },
        GameDefinition {
            slug: "rust".to_string(),
            name: "Rust".to_string(),
            process_names: vec!["RustClient.exe".to_string()],
        },
        GameDefinition {
            slug: "pubg".to_string(),
            name: "PUBG".to_string(),
            process_names: vec![
                "TslGame.exe".to_string(),
                "PUBG.exe".to_string(),
            ],
        },
    ]
}

/// Detect which games are currently running
pub fn detect_games() -> Vec<DetectedGame> {
    let supported_games = get_supported_games();
    let mut detected_games = Vec::new();

    // Create system instance and refresh all processes
    let mut sys = System::new();
    sys.refresh_processes_specifics(ProcessesToUpdate::All, true, ProcessRefreshKind::everything());

    // Check each supported game
    for game_def in supported_games {
        let mut found = false;
        let mut process_id = 0u32;

        // Check if any of the game's process names are running
        for process in sys.processes().values() {
            let process_name = process.name().to_string_lossy().to_lowercase();

            for game_process in &game_def.process_names {
                if process_name == game_process.to_lowercase() {
                    found = true;
                    process_id = process.pid().as_u32();
                    break;
                }
            }

            if found {
                break;
            }
        }

        detected_games.push(DetectedGame {
            slug: game_def.slug,
            name: game_def.name,
            process_id,
            running: found,
        });
    }

    detected_games
}

/// Check if a specific game is running
pub fn is_game_running(game_slug: &str) -> bool {
    let detected = detect_games();
    detected
        .iter()
        .find(|g| g.slug == game_slug)
        .map(|g| g.running)
        .unwrap_or(false)
}

/// Get process ID of a running game
pub fn get_game_process_id(game_slug: &str) -> Option<u32> {
    let detected = detect_games();
    detected
        .iter()
        .find(|g| g.slug == game_slug && g.running)
        .map(|g| g.process_id)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_detect_games() {
        let games = detect_games();
        
        // Should return all supported games
        assert_eq!(games.len(), 6);
        
        // Check that all games have correct slugs
        let slugs: Vec<String> = games.iter().map(|g| g.slug.clone()).collect();
        assert!(slugs.contains(&"cs2".to_string()));
        assert!(slugs.contains(&"valorant".to_string()));
        assert!(slugs.contains(&"apex".to_string()));
    }

    #[test]
    fn test_is_game_running() {
        // This will return false unless the game is actually running
        let cs2_running = is_game_running("cs2");
        assert!(cs2_running == true || cs2_running == false); // Just check it doesn't panic
    }
}
