/** @import {BlockCustomComponentRegistration} from "../index.js" */

import { decrementStack, getPlayerItem } from "../../../0utilities/playerFunctions.js"
import { fireplaceBlockConfig, firewoodFuelItems } from "../../0config/blocks/fireplace.js"


/** Interaction component for when the Fireplace block is empty 
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:fireplace.firewood_interaction",

    onPlayerInteract(event) {
        const block = event.block, blockPermutation = block.permutation, blockDimension = block.dimension, blockLocation = block.location
        const player = event.player, playerItem = getPlayerItem(player)
        const blockHasFirewoodState = blockPermutation.getState(fireplaceBlockConfig.blockHasFirewoodState)

        switch (true) {
            case playerItem == undefined && blockHasFirewoodState:
                blockDimension.playSound(fireplaceBlockConfig.removedItemSFX, blockLocation)
                block.setPermutation(blockPermutation.withState(
                    fireplaceBlockConfig.blockHasFirewoodState, false
                )); break

            case playerItem == undefined && !blockHasFirewoodState: return

            case firewoodFuelItems.includes(playerItem.typeId) && !blockHasFirewoodState:
                blockDimension.playSound(fireplaceBlockConfig.placedItemSFX, blockLocation)
                block.setPermutation(blockPermutation.withState(
                    fireplaceBlockConfig.blockHasFirewoodState, true
                ))

                decrementStack(player); break
        }
    }
}