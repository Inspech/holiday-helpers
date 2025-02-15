/** @import {BlockCustomComponentRegistration} from "../index.js" */

import { getPlayerItem } from "../../../0utilities/playerFunctions.js"
import { fireplaceBlockConfig } from "../../0config/blocks/fireplace.js"

import { ignitionItems, extinguishItems } from "../../../0data/vanilla.js"

// TODO: Add item damage to the lighting of a Fireplace


/** Interaction component for when the Fireplace block is full of firewood 
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:fireplace.ignition_interaction",

    onPlayerInteract(event) {
        const block = event.block, blockPermutation = block.permutation, blockDimension = block.dimension, blockLocation = block.location
        const player = event.player, playerItem = getPlayerItem(player)
        const blockIsLitState = blockPermutation.getState(fireplaceBlockConfig.blockIsLitState)

        // TODO: Add damage to held item on successful light/douse

        switch (true) {
            // No held item
            case playerItem == undefined: return

            // Fireplace lighting
            case ignitionItems.includes(playerItem.typeId) && !blockIsLitState:
                blockDimension.playSound(fireplaceBlockConfig.litSFX, blockLocation)
                blockDimension.playSound(fireplaceBlockConfig.litSFX2, blockLocation)
                block.setPermutation(blockPermutation.withState(
                    fireplaceBlockConfig.blockIsLitState, true
                )); break

            // Fireplace dousing
            case extinguishItems.includes(playerItem.typeId) && blockIsLitState:
                blockDimension.playSound(fireplaceBlockConfig.douseSFX, blockLocation)
                block.setPermutation(blockPermutation.withState(
                    fireplaceBlockConfig.blockIsLitState, false
                )); break
        }
    }
}
