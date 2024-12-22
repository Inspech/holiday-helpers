/** @import {BlockCustomComponentRegistration} from "../index.js" */

import { BlockPermutation, GameMode } from "@minecraft/server"

import { presentOpenedEvent } from '../events/present.js'


/** Destruction component for the Present blocks 
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:present.destruction",

    onPlayerDestroy(event) {
        const block = event.block, playerGamemode = event.player.getGameMode()
        if (playerGamemode == GameMode.creative) return

        presentOpenedEvent(block)
    }
}