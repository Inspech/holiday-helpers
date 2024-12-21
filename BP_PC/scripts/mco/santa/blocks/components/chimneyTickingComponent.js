/** @import {BlockCustomComponentRegistration} from "../index.js" */

import { BlockPermutation } from "@minecraft/server"

import { chimneyBlockConfig } from "../../0config/blocks/chimney.js"
import { fireplaceBlockConfig } from "../../0config/blocks/fireplace.js"


/** Ticking for an active Chimney Top block
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:chimney.ticking",

    onTick(event) {
        const block = event.block, belowBlock = block.below()
        // if (belowBlock == undefined || belowBlock.typeId != chimneyBlockConfig.blockID) return

        // let cursorBlock
        // for (let index = 0; index < chimneyBlockConfig.maxDistanceFromFireplace; index++) {
        //     cursorBlock = block.below(i)
        //     if (cursorBlock == undefined) break
        //     if (
        //         cursorBlock.typeId == fireplaceBlockConfig.blockID &&
        //         cursorBlock.permutation.getState(fireplaceBlockConfig.blockIsLitState)
        //     ) {
        //     } else break
        // }
    }
}
