/** @import {BlockCustomComponentRegistration} from "../index.js" */

import { BlockPermutation } from "@minecraft/server"

import { allLateralNeighboursSolid } from "../../../0utilities/blockFunctions.js"

import { chimneyBlockConfig } from "../../0config/blocks/chimney.js"

// NOTE: This is the messiest part of the project, I have a MASSIVE migraine and I don't care that much to fix this lul

/** Special placement considerations for the Chimney block
 * @type {BlockCustomComponentRegistration} **/
export default {
    ID: "mco_santa:chimney.placement",

    beforeOnPlayerPlace(event) {
        const block = event.block,
            belowBlock = block.below(), belowBlockPermutation = belowBlock.permutation,
            aboveBlock = block.above(), aboveBlockPermutation = aboveBlock.permutation

        const shapeToPlace = chimneyBlockConfig.blockShapeTypes[2]; let shouldPlaceLit = false

        // If the block below is a Chimney block and there is no relevant above Chimney block
        if (
            belowBlock != undefined && belowBlock.typeId == chimneyBlockConfig.blockID &&
            aboveBlock?.typeId != chimneyBlockConfig.blockID
        ) {
            shouldPlaceLit = belowBlockPermutation.getState(chimneyBlockConfig.blockIsLitState)

            // If the block below is a Chimney Top, change it appropriately
            if (belowBlockPermutation.getState(chimneyBlockConfig.blockShapeState) == chimneyBlockConfig.blockShapeTypes[2]) {
                // Set to a Column piece
                if (!allLateralNeighboursSolid(belowBlock)) {
                    belowBlock.setPermutation(
                        BlockPermutation.resolve(
                            chimneyBlockConfig.blockID, {
                            [chimneyBlockConfig.blockShapeState]: chimneyBlockConfig.blockShapeTypes[0],
                            [chimneyBlockConfig.blockIsLitState]: shouldPlaceLit
                        })
                    )
                }
                // Set to a Full piece
                else {
                    belowBlock.setPermutation(
                        BlockPermutation.resolve(
                            chimneyBlockConfig.blockID, {
                            [chimneyBlockConfig.blockShapeState]: chimneyBlockConfig.blockShapeTypes[1],
                            [chimneyBlockConfig.blockIsLitState]: shouldPlaceLit
                        })
                    )
                };
            }
        }

        // If the block above is a Chimney block
        if (aboveBlock?.typeId == chimneyBlockConfig.blockID) {
            // Set to a Column piece
            if (!allLateralNeighboursSolid(aboveBlock)) {
                block.setPermutation(
                    BlockPermutation.resolve(
                        chimneyBlockConfig.blockID, {
                        [chimneyBlockConfig.blockShapeState]: chimneyBlockConfig.blockShapeTypes[0],
                        [chimneyBlockConfig.blockIsLitState]: shouldPlaceLit
                    })
                )
            }
            // Set to a Full piece
            else {
                block.setPermutation(
                    BlockPermutation.resolve(
                        chimneyBlockConfig.blockID, {
                        [chimneyBlockConfig.blockShapeState]: chimneyBlockConfig.blockShapeTypes[1],
                        [chimneyBlockConfig.blockIsLitState]: shouldPlaceLit
                    })
                )
            };
            return
        }

        // Set the placed block to a Chimney Top variant
        block.setPermutation(
            BlockPermutation.resolve(
                chimneyBlockConfig.blockID, {
                [chimneyBlockConfig.blockShapeState]: shapeToPlace,
                [chimneyBlockConfig.blockIsLitState]: shouldPlaceLit
            })
        )

        event.permutationToPlace = block.permutation
    }
}