use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::process::Command;
use sysinfo::System;

#[derive(Debug, Serialize, Deserialize)]
pub struct HardwareInfo {
    pub hwid: String,
    pub cpu_brand: String,
    pub total_memory: u64,
}

/// Generate unique Hardware ID (HWID) for this machine
/// 
/// Combines multiple hardware identifiers to create a unique hash:
/// - CPU ID
/// - Motherboard Serial (Windows)
/// - MAC Address (first network interface)
/// - Disk Serial Number
pub fn generate_hwid() -> Result<String, String> {
    let mut identifiers = Vec::new();

    // 1. Get CPU brand
    let cpu_brand = get_cpu_brand();
    identifiers.push(cpu_brand);

    // 2. Get motherboard serial (Windows only)
    #[cfg(target_os = "windows")]
    {
        if let Ok(mb_serial) = get_motherboard_serial() {
            identifiers.push(mb_serial);
        }
    }

    // 3. Get MAC address
    if let Ok(mac) = get_mac_address() {
        identifiers.push(mac);
    }

    // 4. Get disk serial
    #[cfg(target_os = "windows")]
    {
        if let Ok(disk_serial) = get_disk_serial() {
            identifiers.push(disk_serial);
        }
    }

    // Combine all identifiers
    let combined = identifiers.join("|");

    // Generate SHA-256 hash
    let mut hasher = Sha256::new();
    hasher.update(combined.as_bytes());
    let result = hasher.finalize();
    let hwid = format!("{:x}", result);

    Ok(hwid)
}

/// Get CPU brand name
fn get_cpu_brand() -> String {
    let mut sys = System::new_all();
    sys.refresh_all();

    if let Some(cpu) = sys.cpus().first() {
        cpu.brand().to_string()
    } else {
        "Unknown CPU".to_string()
    }
}

/// Get motherboard serial number (Windows)
#[cfg(target_os = "windows")]
fn get_motherboard_serial() -> Result<String, String> {
    let output = Command::new("wmic")
        .args(&["baseboard", "get", "serialnumber"])
        .output()
        .map_err(|e| format!("Failed to execute wmic: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    let lines: Vec<&str> = stdout.lines().collect();

    if lines.len() > 1 {
        let serial = lines[1].trim();
        if !serial.is_empty() && serial != "To Be Filled By O.E.M." {
            return Ok(serial.to_string());
        }
    }

    Err("No motherboard serial found".to_string())
}

/// Get MAC address of first network interface
fn get_mac_address() -> Result<String, String> {
    #[cfg(target_os = "windows")]
    {
        let output = Command::new("getmac")
            .args(&["/fo", "csv", "/nh"])
            .output()
            .map_err(|e| format!("Failed to execute getmac: {}", e))?;

        let stdout = String::from_utf8_lossy(&output.stdout);
        if let Some(line) = stdout.lines().next() {
            // Parse CSV: "MAC Address","Transport Name"
            let parts: Vec<&str> = line.split(',').collect();
            if !parts.is_empty() {
                let mac = parts[0].trim_matches('"').trim();
                if !mac.is_empty() {
                    return Ok(mac.to_string());
                }
            }
        }
    }

    Err("No MAC address found".to_string())
}

/// Get disk serial number (Windows)
#[cfg(target_os = "windows")]
fn get_disk_serial() -> Result<String, String> {
    let output = Command::new("wmic")
        .args(&["diskdrive", "get", "serialnumber"])
        .output()
        .map_err(|e| format!("Failed to execute wmic: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    let lines: Vec<&str> = stdout.lines().collect();

    if lines.len() > 1 {
        let serial = lines[1].trim();
        if !serial.is_empty() {
            return Ok(serial.to_string());
        }
    }

    Err("No disk serial found".to_string())
}

/// Get complete hardware information
pub fn get_hardware_info() -> Result<HardwareInfo, String> {
    let mut sys = System::new_all();
    sys.refresh_all();

    let hwid = generate_hwid()?;
    let cpu_brand = get_cpu_brand();
    let total_memory = sys.total_memory();

    Ok(HardwareInfo {
        hwid,
        cpu_brand,
        total_memory,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_hwid() {
        let hwid = generate_hwid();
        assert!(hwid.is_ok());
        
        let hwid_str = hwid.unwrap();
        assert_eq!(hwid_str.len(), 64); // SHA-256 hash is 64 hex characters
    }

    #[test]
    fn test_hwid_consistency() {
        // HWID should be the same on multiple calls
        let hwid1 = generate_hwid().unwrap();
        let hwid2 = generate_hwid().unwrap();
        assert_eq!(hwid1, hwid2);
    }
}
