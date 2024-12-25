import { chimneyBlockConfig } from "./blocks/chimney.js"
import { fireplaceBlockConfig } from "./blocks/fireplace.js"
import { lanternsBlockConfig } from "./blocks/lanterns.js"
import { presentsBlockConfig } from "./blocks/presents.js"

/** @type {Record<string, {sound?: string}>} */
export default {
    [fireplaceBlockConfig.blockID]: {
        "sound": 'use.nether_brick'
    },
    [chimneyBlockConfig.blockID]: {
        "sound": 'use.nether_brick'
    },

    [presentsBlockConfig.blockIDs[0]]: {
        "particle": `${presentsBlockConfig.blockIDs[0]}.sfx`,
        "lootTable": presentsBlockConfig.lootTables.tier2
    },
    [presentsBlockConfig.blockIDs[1]]: {
        "particle": `${presentsBlockConfig.blockIDs[1]}.sfx`,
        "lootTable": presentsBlockConfig.lootTables.tier3
    },
    [presentsBlockConfig.blockIDs[2]]: {
        "particle": `${presentsBlockConfig.blockIDs[2]}.sfx`,
        "lootTable": presentsBlockConfig.lootTables.tier1
    },
    [presentsBlockConfig.blockIDs[3]]: {
        "particle": `${presentsBlockConfig.blockIDs[3]}.sfx`,
        "lootTable": presentsBlockConfig.lootTables.tier1
    },

    [lanternsBlockConfig.blockIDs[0]]: {
        "sound": 'use.copper'
    },
    [lanternsBlockConfig.blockIDs[1]]: {
        "sound": 'use.copper'
    },
    [lanternsBlockConfig.blockIDs[2]]: {
        "sound": 'use.copper'
    },
    [lanternsBlockConfig.blockIDs[3]]: {
        "sound": 'use.copper'
    },
    [lanternsBlockConfig.blockIDs[4]]: {
        "sound": 'use.copper'
    },
    [lanternsBlockConfig.blockIDs[5]]: {
        "sound": 'use.copper'
    },
    [lanternsBlockConfig.blockIDs[6]]: {
        "sound": 'use.copper'
    },

    [lanternsBlockConfig.blockIDs[7]]: {
        "sound": 'use.lantern'
    },
    [lanternsBlockConfig.blockIDs[8]]: {
        "sound": 'use.lantern'
    },
    [lanternsBlockConfig.blockIDs[9]]: {
        "sound": 'use.lantern'
    },
}