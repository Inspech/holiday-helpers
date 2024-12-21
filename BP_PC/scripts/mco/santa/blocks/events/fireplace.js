/** @import {Block, DimensionLocation} from "@minecraft/server" */
import { world } from "@minecraft/server"

import { entityRotationFromBlockRotation } from "../../../0utilities/blockFunctions"

import { fireplaceBlockConfig } from "../../0config/blocks/fireplace.js"
import { chimneyBlockConfig } from "../../0config/blocks/chimney.js"
import { warnDevelopersInChat } from "../../../0utilities/debug.js"
import { checkForChimneyBlocks } from "../functions/fireplace.js"

/** Emits a particle from the Fireplace locator
 * @param {Block} block * @param {DimensionLocation} locator */
export function fireplaceEmitParticleEvent(block, locator, VFX) {
    const blockDimension = block.dimension

    // Initial smoke puff
    blockDimension.spawnParticle(VFX, locator)

    // Hooking into this event to also spawn smoke at the top of the associated Chimney
    const aboveBlock = block.above()
    // If the block above is not what we want, cancel the remainder of the event
    if (aboveBlock == undefined || aboveBlock.typeId != chimneyBlockConfig.blockID) return

    let cursorBlock, topLocator
    // Read blocks in a configurable (:3) range
    for (let index = 1; index < (chimneyBlockConfig.maxDistanceFromFireplace + 1); index++) {
        cursorBlock = block.above(index)

        // If the block is no longer a Fireplace for any reason, cancel the event
        if (cursorBlock.typeId != chimneyBlockConfig.blockID) break

        // If we find a valid Chimney Top...
        if (
            cursorBlock.typeId == chimneyBlockConfig.blockID &&
            cursorBlock.permutation.getState(chimneyBlockConfig.blockShapeState) ==
            chimneyBlockConfig.blockShapeTypes[2]
        ) {
            // ...set the locator to the top of it
            topLocator = cursorBlock.above().center()

            blockDimension.spawnParticle(chimneyBlockConfig.smokePuffVFX, topLocator); break
        }
    }
}

/** Emits a sound from the Fireplace
 * @param {Block} block */
export function fireplaceEmitSoundEvent(block, SFX) {
    block.dimension.playSound(SFX, block.location)
}

/** Ejects a Mini Santa
 * @param {Block} block * @param {Block} frontBlock */
export function fireplaceGiveBirthToSanta(block, frontBlock, blockRotation) {
    const blockDimension = block.dimension, blockLocation = block.location, blockPermutation = block.permutation
    const timeOfDay = world.getTimeOfDay()

    // Only happens from Midnight to Sunrise
    if (timeOfDay > 18000 && timeOfDay < 23000) {

        // If there are not enough Chimney blocks, cancel the event
        if (checkForChimneyBlocks(block) < fireplaceBlockConfig.minChimneyBlocksForSanta) return

        // Ho ho ho!
        blockDimension.runCommand(
            `summon mco_santa:mini_santa ${frontBlock.center().x} ${frontBlock.center().y} ${frontBlock.center().z} ${entityRotationFromBlockRotation(blockRotation)} 0`
        )

        // Special effects
        blockDimension.playSound(fireplaceBlockConfig.santaSpawnSFX, blockLocation)
        blockDimension.playSound(fireplaceBlockConfig.douseSFX, blockLocation)

        // Finally, douse the Fireplace - we don't want to kill Santa!!
        block.setPermutation(blockPermutation.withState(
            fireplaceBlockConfig.blockIsLitState, false
        ))
    }
}