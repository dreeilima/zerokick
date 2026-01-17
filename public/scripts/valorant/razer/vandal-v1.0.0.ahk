; ZeroKick No-Recoil Script for Valorant - Vandal
; Version: 1.0.0
; Device: Razer Synapse
; Game: Valorant

#NoEnv
#SingleInstance Force
#Persistent
SetBatchLines, -1

global VANDAL_PATTERN := []
VANDAL_PATTERN[1] := {x: 0, y: 15}
VANDAL_PATTERN[2] := {x: -4, y: 18}
VANDAL_PATTERN[3] := {x: 7, y: 22}
VANDAL_PATTERN[4] := {x: -10, y: 26}
VANDAL_PATTERN[5] := {x: 13, y: 30}
VANDAL_PATTERN[6] := {x: -7, y: 24}
VANDAL_PATTERN[7] := {x: 3, y: 20}
VANDAL_PATTERN[8] := {x: 0, y: 16}

global FIRE_RATE := 95
global SENSITIVITY := 1.0
global shotCount := 0
global isActive := false

~LButton::
    if (isActive)
        return
    
    isActive := true
    shotCount := 0
    
    while (GetKeyState("LButton", "P")) {
        CompensateRecoil()
    }
    
    isActive := false
    shotCount := 0
return

CompensateRecoil() {
    global
    
    shotCount++
    patternIndex := Min(Ceil(shotCount / 3), VANDAL_PATTERN.Length())
    pattern := VANDAL_PATTERN[patternIndex]
    
    moveX := pattern.x * SENSITIVITY
    moveY := pattern.y * SENSITIVITY
    
    DllCall("mouse_event", "UInt", 0x01, "Int", moveX, "Int", moveY, "UInt", 0, "UPtr", 0)
    Sleep, FIRE_RATE
}

Min(a, b) {
    return (a < b) ? a : b
}

TrayTip, ZeroKick, Vandal Script Loaded, 3, 1
return
