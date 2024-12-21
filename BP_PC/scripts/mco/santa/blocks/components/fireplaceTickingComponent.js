/** @import {BlockCustomComponentRegistration} from "../index.js" */

import minecraftmath from "../../../0utilities/minecraft-math/minecraft-math.js";
const { Vector3Builder } = minecraftmath;

import { getAdjacentBlock } from "../../../0utilities/blockFunctions.js"
import { clampedRandom, getRandomNumber } from "../../../0utilities/math.js"
import { warnDevelopersInChat } from "../../../0utilities/debug.js"

import { fireplaceBlockConfig } from "../../0config/blocks/fireplace.js"
import {
    fireplaceEmitParticleEvent,
    fireplaceEmitSoundEvent,
    fireplaceGiveBirthToSanta
} from "../events/fireplace.js"


/** Ticking component for a lit Fireplace block 
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:fireplace.ticking",

    onTick(event) {
        const block = event.block, blockDimension = block.dimension, blockLocation = block.location
        const blockRotationState = block.permutation.getState(fireplaceBlockConfig.blockRotationalState)

        // Get the block in front of the Fireplace
        const blockInFront = getAdjacentBlock(
            'Backward', { targetDistance: 1 }, block,
            blockRotationState, { directionType: 'cardinal' }
        )

        // Set the appropriate particle locator for the Fireplace per direction
        let blockParticleLocator = block.above().center(), particleAdjustmentHorizontal, particleAdjustmentVertical
        particleAdjustmentHorizontal = clampedRandom(
            fireplaceBlockConfig.particleAdjustmentHorizontal.min,
            fireplaceBlockConfig.particleAdjustmentHorizontal.max
        )
        particleAdjustmentVertical = clampedRandom(
            fireplaceBlockConfig.particleAdjustmentVertical.min,
            fireplaceBlockConfig.particleAdjustmentVertical.max
        )
        switch (true) {
            case blockRotationState == 'north' || blockRotationState == 'south':
                blockParticleLocator = new Vector3Builder({
                    x: blockLocation.x + particleAdjustmentHorizontal,
                    y: blockLocation.y + particleAdjustmentVertical,
                    z: blockLocation.z + (blockRotationState == 'north' ? 1.125 : -0.125)
                }); break
            case blockRotationState == 'east' || blockRotationState == 'west':
                blockParticleLocator = new Vector3Builder({
                    x: blockLocation.x + (blockRotationState == 'west' ? 1.125 : -0.125),
                    y: blockLocation.y + particleAdjustmentVertical,
                    z: blockLocation.z + particleAdjustmentHorizontal
                }); break
        }

        // Generate a random number, 1 - 100
        let randomNumber = getRandomNumber({ chanceOf: 100 })

        // REVIEW - Maybe create a specialised function for a list of chances?

        // List of events to trigger
        switch (true) {
            case randomNumber > 0 && randomNumber <= 38: // % Chance
                fireplaceEmitParticleEvent(block, blockParticleLocator, fireplaceBlockConfig.flameVFX); break
            case randomNumber > 38 && randomNumber <= 76: // % Chance
                fireplaceEmitParticleEvent(block, blockParticleLocator, fireplaceBlockConfig.smokeVFX); break
            case randomNumber > 76 && randomNumber <= 96: // % Chance
                fireplaceEmitSoundEvent(block, fireplaceBlockConfig.flameSFX); break

            case randomNumber > 96: // % Chance
                fireplaceGiveBirthToSanta(block, blockInFront, blockRotationState); break
        }
    }
}
