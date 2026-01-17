-- ZeroKick No-Recoil Script for CS2 - M4A4
-- Version: 1.0.0
-- Device: Logitech G Series
-- Game: Counter-Strike 2

local WEAPON_M4A4 = {
    name = "M4A4",
    recoilPattern = {
        {x = 0, y = 18},
        {x = -3, y = 22},
        {x = 8, y = 26},
        {x = -12, y = 30},
        {x = 15, y = 34},
        {x = -8, y = 28},
        {x = 4, y = 22},
        {x = 0, y = 18},
        {x = -6, y = 16},
        {x = 10, y = 14}
    },
    fireRate = 90,
    sensitivity = 1.0
}

local shotCount = 0
local isActive = false

function CompensateRecoil(weapon)
    if not isActive then return end
    
    shotCount = shotCount + 1
    local patternIndex = math.min(math.ceil(shotCount / 3), #weapon.recoilPattern)
    local pattern = weapon.recoilPattern[patternIndex]
    
    local moveX = pattern.x * weapon.sensitivity
    local moveY = pattern.y * weapon.sensitivity
    
    MoveMouseRelative(moveX, moveY)
    Sleep(weapon.fireRate)
end

function OnEvent(event, arg)
    if event == "MOUSE_BUTTON_PRESSED" and arg == 1 then
        isActive = true
        shotCount = 0
        
        while isActive do
            CompensateRecoil(WEAPON_M4A4)
        end
    elseif event == "MOUSE_BUTTON_RELEASED" and arg == 1 then
        isActive = false
        shotCount = 0
    end
end

EnablePrimaryMouseButtonEvents(true)
OutputLogMessage("ZeroKick M4A4 Script Loaded\n")
