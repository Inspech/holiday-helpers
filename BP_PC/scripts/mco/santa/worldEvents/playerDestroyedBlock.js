import { BlockPermutation, world } from "@minecraft/server"

import { fireplaceBlockConfig } from "../0config/blocks/fireplace.js"
import { chimneyBlockConfig } from "../0config/blocks/chimney.js"
import { ornamentBlockConfig } from "../0config/blocks/ornament.js"

// NOTE: No, I do not want to update other Chimney blocks to turn into Chimney Tops when breaking one above.

world.afterEvents.playerBreakBlock.subscribe((event) => {
    const originBlock = event.block, originBlockPermutation = event.brokenBlockPermutation

    // If the block *above* the destroyed block is a Chimney
    if (originBlock.above() != undefined && originBlock.above().typeId == chimneyBlockConfig.blockID) {
        const aboveBlock = originBlock.above(), aboveBlockPermutation = aboveBlock.permutation
        const aboveBlockChimneyShape = aboveBlockPermutation.getState(chimneyBlockConfig.blockShapeState)

        // If the block above the destroyed block is a Chimney Top
        if (aboveBlockChimneyShape == chimneyBlockConfig.blockShapeTypes[2]) {
            // Then set that block to a standard Chimney Column
            aboveBlock.setPermutation(aboveBlockPermutation.withState(
                chimneyBlockConfig.blockShapeState, chimneyBlockConfig.blockShapeTypes[0]
            ))
        }
    }

    // If the block *below* the destroyed block is a Chimney
    if (originBlock.below() != undefined && originBlock.below().typeId == chimneyBlockConfig.blockID) {
        const belowBlock = originBlock.below(), belowBlockPermutation = belowBlock.permutation
        const originBlockChimneyShape = originBlockPermutation.getState(chimneyBlockConfig.blockShapeState)

        // Set the block below to a Chimney Top
        belowBlock.setPermutation(belowBlockPermutation.withState(
            chimneyBlockConfig.blockShapeState, chimneyBlockConfig.blockShapeTypes[2]
        ))
    }

    // 
    if (originBlock.below() != undefined && ornamentBlockConfig.blockIDs.includes(originBlock.below().typeId)) {
        const belowBlock = originBlock.below(), belowBlockLocation = belowBlock.location, belowBlockPermutation = belowBlock.permutation
        const belowBlockHangingState = belowBlockPermutation.getState(ornamentBlockConfig.blockHangingState)

        if (belowBlockHangingState == true) {
            belowBlock.dimension.runCommand(`setblock ${belowBlockLocation.x} ${belowBlockLocation.y} ${belowBlockLocation.z} air destroy`)
        }
    }
    // 
    if (originBlock.above() != undefined && ornamentBlockConfig.blockIDs.includes(originBlock.above().typeId)) {
        const aboveBlock = originBlock.above(), aboveBlockLocation = aboveBlock.location, aboveBlockPermutation = aboveBlock.permutation
        const aboveBlockHangingState = aboveBlockPermutation.getState(ornamentBlockConfig.blockHangingState)

        if (aboveBlockHangingState == false) {
            aboveBlock.dimension.runCommand(`setblock ${aboveBlockLocation.x} ${aboveBlockLocation.y} ${aboveBlockLocation.z} air destroy`)
        }
    }
})