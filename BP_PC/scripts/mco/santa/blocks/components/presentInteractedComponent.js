/** @import {BlockCustomComponentRegistration} from "../index.js" */

import { presentOpenedEvent } from '../events/present.js'


/** Interaction component for the Present blocks
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:present.interaction",

    onPlayerInteract(event) {
        const block = event.block, blockPermutation = block.permutation
        presentOpenedEvent(block, blockPermutation)
    }
}