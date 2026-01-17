-- ZeroKick No-Recoil Script for CS2 - AK-47
-- Version: 1.0.0
-- Device: Logitech G Series
-- Game: Counter-Strike 2

-- Configuration
local WEAPON_AK47 = {
    name = "AK-47",
    recoilPattern = {
        {x = 0, y = 20},   -- Shot 1-3
        {x = -5, y = 25},  -- Shot 4-6
        {x = 10, y = 30},  -- Shot 7-9
        {x = -15, y = 35}, -- Shot 10-12
        {x = 20, y = 40},  -- Shot 13-15
        {x = -10, y = 30}, -- Shot 16-18
        {x = 5, y = 25},   -- Shot 19-21
        {x = 0, y = 20},   -- Shot 22-24
        {x = -8, y = 18},  -- Shot 25-27
        {x = 12, y = 15}   -- Shot 28-30
    },
    fireRate = 100, -- milliseconds between shots
    sensitivity = 1.0
}

-- State
local shotCount = 0
local isActive = false

-- Main recoil compensation function
function CompensateRecoil(weapon)
    if not isActive then return end
    
    shotCount = shotCount + 1
    local patternIndex = math.min(math.ceil(shotCount / 3), #weapon.recoilPattern)
    local pattern = weapon.recoilPattern[patternIndex]
    
    -- Apply compensation
    local moveX = pattern.x * weapon.sensitivity
    local moveY = pattern.y * weapon.sensitivity
    
    MoveMouseRelative(moveX, moveY)
    Sleep(weapon.fireRate)
end

-- Event handler
function OnEvent(event, arg)
    if event == "MOUSE_BUTTON_PRESSED" and arg == 1 then
        -- Left mouse button pressed
        isActive = true
        shotCount = 0
        
        while isActive do
            CompensateRecoil(WEAPON_AK47)
        end
    elseif event == "MOUSE_BUTTON_RELEASED" and arg == 1 then
        -- Left mouse button released
        isActive = false
        shotCount = 0
    end
end

-- Enable script
EnablePrimaryMouseButtonEvents(true)
OutputLogMessage("ZeroKick AK-47 Script Loaded\n")
