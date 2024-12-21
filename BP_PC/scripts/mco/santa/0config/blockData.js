import { chimneyBlockConfig } from "./blocks/chimney"
import { fireplaceBlockConfig } from "./blocks/fireplace"

/** @type {Record<string, {sound?: string}>} */
export default {
    [fireplaceBlockConfig.blockID]: {
        "sound": 'use.nether_brick'
    },
    [chimneyBlockConfig.blockID]: {
        "sound": 'use.nether_brick'
    },
}