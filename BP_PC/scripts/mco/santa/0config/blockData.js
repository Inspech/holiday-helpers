import { chimneyBlockConfig } from "./blocks/chimney"
import { fireplaceBlockConfig } from "./blocks/fireplace"
import { ornamentBlockConfig } from "./blocks/ornament"

/** @type {Record<string, {sound?: string}>} */
export default {
    [fireplaceBlockConfig.blockID]: {
        "sound": 'use.nether_brick'
    },
    [chimneyBlockConfig.blockID]: {
        "sound": 'use.nether_brick'
    },

    [ornamentBlockConfig.blockIDs[0]]: {
        "sound": 'use.copper'
    },
    [ornamentBlockConfig.blockIDs[1]]: {
        "sound": 'use.copper'
    },
    [ornamentBlockConfig.blockIDs[2]]: {
        "sound": 'use.copper'
    },
    [ornamentBlockConfig.blockIDs[3]]: {
        "sound": 'use.copper'
    },
}