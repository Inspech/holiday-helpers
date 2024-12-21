/** @import {Block, DimensionLocation} from "@minecraft/server" */
import { entityRotationFromBlockRotation } from "../../../0utilities/blockFunctions"

import { fireplaceBlockConfig } from "../../0config/blocks/fireplace.js"
import { chimneyBlockConfig } from "../../0config/blocks/chimney.js"
import { warnDevelopersInChat } from "../../../0utilities/debug.js"

/** Emits a particle from the Fireplace locator
 * @param {Block} block * @param {DimensionLocation} locator */
export function fireplaceEmitParticleEvent(block, locator, VFX) {
    const blockDimension = block.dimension

    // Initial smoke puff
    blockDimension.spawnParticle(VFX, locator)

    // Hooking into this event to also spawn smoke at the top of the associated Chimney
    const aboveBlock = block.above()
    if (aboveBlock == undefined || aboveBlock.typeId != chimneyBlockConfig.blockID) return

    let cursorBlock, destinationLocation, aboveBlocks = []
    for (let index = 1; index < (chimneyBlockConfig.maxDistanceFromFireplace + 1); index++) {
        cursorBlock = block.above(index)

        if (cursorBlock.typeId != chimneyBlockConfig.blockID) { warnDevelopersInChat('Fireplace failed to emit smokestack.', block.dimension); break }

        if (
            cursorBlock.typeId == chimneyBlockConfig.blockID &&
            cursorBlock.permutation.getState(chimneyBlockConfig.blockShapeState) ==
            chimneyBlockConfig.blockShapeTypes[2]
        ) {
            destinationLocation = cursorBlock.above().center()

            blockDimension.spawnParticle(chimneyBlockConfig.smokePuffVFX, destinationLocation)
            warnDevelopersInChat('Fireplace successfully emitted a smokestack!', block.dimension)
            break
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

    blockDimension.runCommand(
        `summon mco_santa:mini_santa ${frontBlock.center().x} ${frontBlock.center().y} ${frontBlock.center().z} 0 ${entityRotationFromBlockRotation(blockRotation)}`
    )

    blockDimension.playSound(fireplaceBlockConfig.santaSpawnSFX, blockLocation)
    blockDimension.playSound(fireplaceBlockConfig.douseSFX, blockLocation)
    block.setPermutation(blockPermutation.withState(
        fireplaceBlockConfig.blockIsLitState, false
    ))
}