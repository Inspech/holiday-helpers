/** @import {Block, BlockPermutation, DimensionLocation} from "@minecraft/server" */
import { world } from "@minecraft/server"

import { presentsBlockConfig } from "../../0config/blocks/presents.js"
import data from "../../0config/blockData.js"


/** Event for when a Present block is opened
 * @param {Block} block * @param {BlockPermutation} permutation * @param {DimensionLocation} locator */
export function presentOpenedEvent(block, permutation) {
    const blockDimension = block.dimension
    const
        assignedParticle = data[permutation.type.id]?.particle,
        assignedLootTable = data[permutation.type.id]?.lootTable

    let targetPosition = block.center()
    let commandPosition = `${targetPosition.x} ${targetPosition.y} ${targetPosition.z}`
    if (assignedParticle) { blockDimension.spawnParticle(assignedParticle, block.above().bottomCenter()) }
    if (assignedLootTable) { blockDimension.runCommand(`loot spawn ${commandPosition} loot "${assignedLootTable}"`) }

    blockDimension.runCommand(`setblock ${commandPosition} air destroy`)
    console.warn(permutation.type.id)
}
