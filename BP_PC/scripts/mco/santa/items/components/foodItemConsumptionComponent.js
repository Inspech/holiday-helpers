/** @import {ItemCustomComponentRegistration} from "../index.js" */

import itemData from "../../0config/itemData.js"


/** Component for consuming food items
 * @type {ItemCustomComponentRegistration} **/
export default {
    ID: "mco_santa:food_item.consume",

    onCompleteUse(event) {
        const item = event.itemStack, source = event.source, data = itemData[item.typeId].effect;

        if (data) {
            source.addEffect(
                data, itemData[item.typeId].duration * 20,
                { amplifier: itemData[item.typeId].amplifier }
            )
        }
    }
}