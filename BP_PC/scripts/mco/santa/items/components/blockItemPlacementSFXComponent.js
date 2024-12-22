/** @import {ItemCustomComponentRegistration} from "../index.js" */

import sounds from "../../0config/blockData.js"


/** Plays a sound effect from a defined mapping on placement of a block item
 * @type {ItemCustomComponentRegistration} **/
export default {
    ID: "mco_santa:blockItem.placement.SFX",

    onUseOn(event) {
        const item = event.itemStack, itemDimension = event.source.dimension, itemLocation = event.source.location
        const data = sounds[item.typeId]?.sound

        if (data) { itemDimension.playSound(data, itemLocation) }
    }
}