/** @import {Block, DimensionLocation} from "@minecraft/server" */
import { entityRotationFromBlockRotation } from "../../../0utilities/blockFunctions"


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
 * @param {Block} block */
export function fireplaceGiveBirthToSanta(block, frontBlock, blockRotation) {
    block.dimension.spawnEntity('mco_santa:mini_santa', frontBlock, {
        initialRotation: entityRotationFromBlockRotation(blockRotation)
    })
}