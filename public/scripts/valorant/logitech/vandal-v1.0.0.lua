-- ZeroKick No-Recoil Script for Valorant - Vandal
-- Version: 1.0.0
-- Device: Logitech G Series
-- Game: Valorant

local WEAPON_VANDAL = {
    name = "Vandal",
    recoilPattern = {
        {x = 0, y = 15},
        {x = -4, y = 18},
        {x = 7, y = 22},
        {x = -10, y = 26},
        {x = 13, y = 30},
        {x = -7, y = 24},
        {x = 3, y = 20},
        {x = 0, y = 16}
    },
    fireRate = 95,
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
            CompensateRecoil(WEAPON_VANDAL)
        end
    elseif event == "MOUSE_BUTTON_RELEASED" and arg == 1 then
        isActive = false
        shotCount = 0
    end
end

EnablePrimaryMouseButtonEvents(true)
OutputLogMessage("ZeroKick Vandal Script Loaded\n")
