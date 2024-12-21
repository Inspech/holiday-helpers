/** @import {BlockCustomComponentRegistration} from "../index.js" */

import sounds from "../../0config/blockData.js"


/** Special placement considerations for the Fireplace block
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:global.placement.sfx",

    beforeOnPlayerPlace(event) {
        const block = event.block, blockDimension = block.dimension, blockLocation = block.location
        const data = sounds[event.permutationToPlace.type.id]?.sound

        if (data) { blockDimension.playSound(data, blockLocation) }
    }
}