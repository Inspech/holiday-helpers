/** @import {BlockCustomComponentRegistration} from "../components.js" */

import minecraftmath from "../../0utilities/minecraft-math/minecraft-math.js";
const { Vector3Builder } = minecraftmath;

import { getRandomNumber } from "../../../0utilities/math.js"
import { getAdjacentBlock } from "../../../0utilities/blockFunctions.js"

import { fireplaceBlockConfig } from "../../0config/blocks/fireplace.js"
import { fireplaceEmitParticleEvent, fireplaceEmitSoundEvent, fireplaceGiveBirthToSanta } from "../events/fireplace.js"


/** Interaction component for when the Fireplace is empty 
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:fireplace.ticking",

    onTick(event) {
        const block = event.block, blockLocation = block.location
        const blockRotationState = block.permutation.getState(fireplaceBlockConfig.blockRotationalState)

        // Get the block in front of the Fireplace
        const blockInFront = getAdjacentBlock(
            'Forward', { targetDistance: 1 }, block,
            blockRotationState, { directionType: 'cardinal' }
        )

        // Set the appropriate particle locator for the Fireplace per direction
        let blockParticleLocator = block.above().center()
        switch (true) {
            case blockRotationState == 'north' || blockRotationState == 'south':
                blockParticleLocator = new Vector3Builder({
                    x: fireplaceBlockConfig.particleAdjustmentHorizontal + blockLocation.x,
                    y: fireplaceBlockConfig.particleAdjustmentVertical + blockLocation.y,
                    z: (blockRotationState == 'north' ? 0.875 : 0.125) + blockLocation.z
                }); break

            case blockRotationState == 'east' || blockRotationState == 'west':
                blockParticleLocator = new Vector3Builder({
                    x: (blockRotationState == 'west' ? 0.875 : 0.125) + blockLocation.x,
                    y: fireplaceBlockConfig.particleAdjustmentVertical + blockLocation.y,
                    z: fireplaceBlockConfig.particleAdjustmentHorizontal + blockLocation.z
                }); break
        }

        // Generate a random number, 1 - 100
        let randomNumber = getRandomNumber({ chanceOf: 100 })

        // List of events to trigger
        switch (true) {
            case randomNumber > 0 && randomNumber <= 31: // 31% Chance
                fireplaceEmitParticleEvent(block, blockParticleLocator, fireplaceBlockConfig.flameVFX); break
            case randomNumber > 31 && randomNumber <= 62: // 31% Chance
                fireplaceEmitParticleEvent(block, blockParticleLocator, fireplaceBlockConfig.smokeVFX); break
            case randomNumber > 62 && randomNumber <= 93: // 31% Chance
                fireplaceEmitSoundEvent(block, fireplaceBlockConfig.flameSFX); break

            case randomNumber > 93: // 7% Chance
                fireplaceGiveBirthToSanta(block, blockInFront, blockRotationState); break
        }
    }
}
