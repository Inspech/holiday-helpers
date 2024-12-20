
/** General settings and configurations for the Fireplace block */
export const fireplaceBlockConfig = {
    blockID: 'mco_santa:fireplace',

    blockHasFirewoodState: 'mco_santa:fireplace.has_firewood',
    blockIsLitState: 'mco_santa:block.is_lit',
    blockRotationalState: 'minecraft:cardinal_direction',

    removedItemSFX: 'random.pop',
    placedItemSFX: 'random.pop',
    douseSFX: 'random.pop',
    litSFX: 'random.pop',

    // removedItemVFX: 'random.pop',
    // placedItemVFX: 'random.pop',
    // douseVFX: 'random.pop',
    // litVFX: 'random.pop',
}

/** This is the array of different items used to fuel a Fireplace block */
export const firewoodFuelItems = [
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