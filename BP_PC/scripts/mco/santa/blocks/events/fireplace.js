/** @import {Block, DimensionLocation} from "@minecraft/server" */
import { entityRotationFromBlockRotation } from "../../../0utilities/blockFunctions"

import { fireplaceBlockConfig } from "../../0config/blocks/fireplace.js"

/** Emits a particle from the Fireplace locator
 * @param {Block} block * @param {DimensionLocation} locator */
export function fireplaceEmitParticleEvent(block, locator, VFX) {
    block.dimension.spawnParticle(VFX, locator)
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