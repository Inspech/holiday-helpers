/** @import {BlockCustomComponentRegistration} from "../components.js" */

import { BlockPermutation, GameMode } from "@minecraft/server"
import { fireplaceBlockConfig } from "../../0config/blocks/fireplace.js"

import { getPlayerCardinalFacing } from "../../../0utilities/playerFunctions.js"

/** Interaction component for when the Fireplace is empty 
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:fireplace.placement",

    beforeOnPlayerPlace(event) {
        const block = event.block, player = event.player
        const playerGamemode = player.getGameMode()

        let hasFirewood = false
        if (playerGamemode == GameMode.creative) hasFirewood = true

        block.setPermutation(
            BlockPermutation.resolve(
                fireplaceBlockConfig.blockID, {
                [fireplaceBlockConfig.blockRotationalState]: getPlayerCardinalFacing(player),
                [fireplaceBlockConfig.blockHasFirewoodState]: hasFirewood
            })
        )

        event.permutationToPlace = block.permutation
    }
}