; ZeroKick No-Recoil Script for CS2 - AK-47
; Version: 1.0.0
; Device: Razer Synapse
; Game: Counter-Strike 2

#NoEnv
#SingleInstance Force
#Persistent
SetBatchLines, -1

; Configuration
global AK47_PATTERN := []
AK47_PATTERN[1] := {x: 0, y: 20}   ; Shot 1-3
AK47_PATTERN[2] := {x: -5, y: 25}  ; Shot 4-6
AK47_PATTERN[3] := {x: 10, y: 30}  ; Shot 7-9
AK47_PATTERN[4] := {x: -15, y: 35} ; Shot 10-12
AK47_PATTERN[5] := {x: 20, y: 40}  ; Shot 13-15
AK47_PATTERN[6] := {x: -10, y: 30} ; Shot 16-18
AK47_PATTERN[7] := {x: 5, y: 25}   ; Shot 19-21
AK47_PATTERN[8] := {x: 0, y: 20}   ; Shot 22-24
AK47_PATTERN[9] := {x: -8, y: 18}  ; Shot 25-27
AK47_PATTERN[10] := {x: 12, y: 15} ; Shot 28-30

global FIRE_RATE := 100 ; milliseconds
global SENSITIVITY := 1.0
global shotCount := 0
global isActive := false

; Hotkey: Left Mouse Button
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

; Recoil compensation function
CompensateRecoil() {
    global
    
    shotCount++
    patternIndex := Min(Ceil(shotCount / 3), AK47_PATTERN.Length())
    pattern := AK47_PATTERN[patternIndex]
    
    ; Apply compensation
    moveX := pattern.x * SENSITIVITY
    moveY := pattern.y * SENSITIVITY
    
    DllCall("mouse_event", "UInt", 0x01, "Int", moveX, "Int", moveY, "UInt", 0, "UPtr", 0)
    Sleep, FIRE_RATE
}

; Helper function
Min(a, b) {
    return (a < b) ? a : b
}

; Notification
TrayTip, ZeroKick, AK-47 Script Loaded, 3, 1
return
