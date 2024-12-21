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
 * @param {Block} block * @param {Block} frontBlock */
export function fireplaceGiveBirthToSanta(block, frontBlock, blockRotation) {
    block.dimension.runCommand(
        `summon mco_santa:mini_santa ${frontBlock.center().x} ${frontBlock.center().y} ${frontBlock.center().z} 0 ${entityRotationFromBlockRotation(blockRotation)}`
    )

    // block.dimension.spawnEntity('mco_santa:mini_santa', frontBlock.location, {
    //     initialRotation: entityRotationFromBlockRotation(blockRotation)
    // })
}