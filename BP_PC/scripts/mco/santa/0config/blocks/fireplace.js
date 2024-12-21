import { clampedRandom } from "../../../0utilities/math"


/** General settings and configurations for the Fireplace block */
export const fireplaceBlockConfig = {
    blockID: 'mco_santa:fireplace',

    particleAdjustmentHorizontal: { min: 0.2, max: 0.8 },
    particleAdjustmentVertical: { min: 0.2, max: 0.67 },

    blockHasFirewoodState: 'mco_santa:fireplace.has_firewood',
    blockIsLitState: 'mco_santa:block.is_lit',
    blockRotationalState: 'minecraft:cardinal_direction',

    flameSFX: 'block.campfire.crackle',
    removedItemSFX: 'insert.chiseled_bookshelf',
    placedItemSFX: 'pickup.chiseled_bookshelf',
    douseSFX: 'random.fizz',
    litSFX: 'fire.ignite', litSFX2: 'fire.fire',

    santaSpawnSFX: 'pickup_enchanted.chiseled_bookshelf',

    flameVFX: 'minecraft:basic_flame_particle',
    smokeVFX: 'minecraft:basic_smoke_particle',
    douseVFX: 'minecraft:basic_smoke_particle',
    litVFX: 'minecraft:basic_flame_particle',

    minChimneyBlocksForSanta: 4,
    maxChimneyBlocksForSanta: 20
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