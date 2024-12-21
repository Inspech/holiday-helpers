/** @import {Block, DimensionLocation} from "@minecraft/server" */

import { fireplaceBlockConfig } from "../../0config/blocks/fireplace.js"
import { chimneyBlockConfig } from "../../0config/blocks/chimney.js"

/** Checks for Chimney blocks above the Fireplace block and counts them
 * @param {Block} block */
export function checkForChimneyBlocks(block) {
    const aboveBlock = block.above()

    if (aboveBlock == undefined || aboveBlock.typeId != chimneyBlockConfig.blockID) return 0

    let cursorBlock, totalChimneyBlocks = [], max = fireplaceBlockConfig.maxChimneyBlocksForSanta
    for (let index = 1; index < (max + 1); index++) {
        cursorBlock = block.above(index)

        if (cursorBlock.typeId != chimneyBlockConfig.blockID) break

        totalChimneyBlocks.push(cursorBlock.typeId)
    }

    return totalChimneyBlocks.length
}