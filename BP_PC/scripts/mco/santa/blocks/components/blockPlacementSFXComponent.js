/** @import {BlockCustomComponentRegistration} from "../index.js" */

import sounds from "../../0config/blockData.js"


/** Plays a sound effect from a defined mapping on placement of a block
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:block.placement.SFX",

    beforeOnPlayerPlace(event) {
        const block = event.block, blockDimension = block.dimension, blockLocation = block.location
        const data = sounds[event.permutationToPlace.type.id]?.sound

        if (data) { blockDimension.playSound(data, blockLocation) }
    }
}