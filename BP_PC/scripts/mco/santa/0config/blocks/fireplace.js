import { clampedRandom } from "../../../0utilities/math"


/** General settings and configurations for the Fireplace block */
export const fireplaceBlockConfig = {
    blockID: 'mco_santa:fireplace',

    particleAdjustmentHorizontal: clampedRandom(0.2, 0.8),
    particleAdjustmentVertical: clampedRandom(0.2, 0.66),

    blockHasFirewoodState: 'mco_santa:fireplace.has_firewood',
    blockIsLitState: 'mco_santa:block.is_lit',
    blockRotationalState: 'minecraft:cardinal_direction',

    flameSFX: 'block.campfire.crackle',
    removedItemSFX: 'random.pop',
    placedItemSFX: 'random.pop',
    douseSFX: 'random.pop',
    litSFX: 'random.pop',

    flameVFX: 'minecraft:basic_flame_particle',
    smokeVFX: 'minecraft:basic_smoke_particle',
    removedItemVFX: 'random.pop',
    placedItemVFX: 'random.pop',
    douseVFX: 'random.pop',
    litVFX: 'random.pop',
}

/** This is the array of different items used to fuel a Fireplace block */
export const firewoodFuelItems = /** @type {const} */ (
    [
        'minecraft:acacia_log',
        'minecraft:birch_log',
        'minecraft:cherry_log',
        'minecraft:dark_oak_log',
        'minecraft:jungle_log',
        'minecraft:mangrove_log',
        'minecraft:oak_log',
        'minecraft:pale_oak_log',
        'minecraft:spruce_log'
    ]
)