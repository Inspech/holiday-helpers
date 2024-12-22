/** @import {Block, DimensionLocation} from "@minecraft/server" */
import { world } from "@minecraft/server"

/** Event for when a Present block is opened
 * @param {Block} block * @param {DimensionLocation} locator */
export function presentOpenedEvent(block) {
    const blockDimension = block.dimension, blockLocation = block.location

    blockDimension.spawnEntity('minecraft:fox', blockLocation)
    blockDimension.runCommand(`setblock ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} air destroy`)
}
