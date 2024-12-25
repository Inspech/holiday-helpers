/** @import {ItemCustomComponentRegistration} from "../index.js" */

import { BlockPermutation, GameMode } from '@minecraft/server'

import { replaceableBlocks } from '../../../0data/vanilla.js'

import { lanternsBlockConfig } from "../../0config/blocks/lanterns.js"
import { getTargetBlockFromFace, playSoundOnBlockItemPlacement } from "../../../0utilities/blockFunctions.js"

import { decrementStack } from "../../../0utilities/playerFunctions.js"


/** Special placement considerations for the Lantern-type blocks
 * @type {ItemCustomComponentRegistration} **/
export default {
    ID: "mco_santa:lantern.placement",

    onUseOn(event) {
        const block = event.block, blockFace = event.blockFace
        const item = event.itemStack, source = event.source

        const targetBlock = getTargetBlockFromFace(block, blockFace)
        if (!replaceableBlocks.includes(targetBlock.typeId)) return

        const blockBelow = targetBlock.below(), blockAbove = targetBlock.above()

        switch (blockFace) {
            case 'Down':
                targetBlock.setPermutation(
                    BlockPermutation.resolve(
                        `${item.typeId}.block`, {
                        [lanternsBlockConfig.blockHangingState]: true
                    })
                )
                if (source.getGameMode() != GameMode.creative) { decrementStack(source) }
                playSoundOnBlockItemPlacement(item, source); break

            default:
                if (
                    blockBelow != undefined &&
                    blockBelow.typeId != 'minecraft:air' &&
                    !replaceableBlocks.includes(blockBelow.typeId)
                ) {
                    targetBlock.setPermutation(
                        BlockPermutation.resolve(
                            `${item.typeId}.block`, {
                            [lanternsBlockConfig.blockHangingState]: false
                        })
                    );
                    if (source.getGameMode() != GameMode.creative) { decrementStack(source) }
                    playSoundOnBlockItemPlacement(item, source)
                }
                else if (
                    blockAbove != undefined &&
                    blockAbove.typeId != 'minecraft:air' &&
                    !replaceableBlocks.includes(blockAbove.typeId)
                ) {
                    targetBlock.setPermutation(
                        BlockPermutation.resolve(
                            `${item.typeId}.block`, {
                            [lanternsBlockConfig.blockHangingState]: true
                        })
                    );
                    if (source.getGameMode() != GameMode.creative) { decrementStack(source) }
                    playSoundOnBlockItemPlacement(item, source)
                }
                break

        }
    }
}