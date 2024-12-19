import { world, system, BlockPermutation, EntityComponentTypes } from "@minecraft/server"

import { decrementStack, getPlayerItem } from "../../0utilities/playerFunctions"
import { warnDevelopersInChat } from "../../0utilities/debug"

import { fireplaceBlockConfig, firewoodFuelItems } from "../0config/blocks/fireplace"
import { ignitionItems, extinguishItems } from "../../0globalConfig/vanilla"

world.beforeEvents.worldInitialize.subscribe(
    ({ blockComponentRegistry }) => {

        // Fireplace Components
        blockComponentRegistry.registerCustomComponent(
            "mco_santa:fireplace.firewood_interaction",
            {
                onPlayerInteract(event) {
                    const block = event.block, blockPermutation = block.permutation, blockDimension = block.dimension, blockLocation = block.location
                    const player = event.player, playerItem = getPlayerItem(player)
                    const blockHasFirewoodProperty = blockPermutation.getState(fireplaceBlockConfig.blockHasFirewoodState)

                    switch (true) {
                        case playerItem == undefined && blockHasFirewoodProperty:
                            blockDimension.playSound(fireplaceBlockConfig.removedItemSFX, blockLocation)
                            block.setPermutation(blockPermutation.withState(
                                fireplaceBlockConfig.blockHasFirewoodState, false
                            )); break

                        case playerItem == undefined && !blockHasFirewoodProperty: return

                        case firewoodFuelItems.includes(playerItem.typeId) && !blockHasFirewoodProperty:
                            blockDimension.playSound(fireplaceBlockConfig.placedItemSFX, blockLocation)
                            block.setPermutation(blockPermutation.withState(
                                fireplaceBlockConfig.blockHasFirewoodState, true
                            ))

                            decrementStack(player); break
                    }
                }
            }
        )
        blockComponentRegistry.registerCustomComponent(
            "mco_santa:fireplace.ignition_interaction",
            {
                onPlayerInteract(event) {
                    const block = event.block, blockPermutation = block.permutation, blockDimension = block.dimension, blockLocation = block.location
                    const player = event.player, playerItem = getPlayerItem(player)
                    const blockIsLitProperty = blockPermutation.getState(fireplaceBlockConfig.blockIsLitState)

                    switch (true) {
                        // No held item
                        case playerItem == undefined: return

                        // Fireplace lighting
                        case ignitionItems.includes(playerItem.typeId) && !blockIsLitProperty:
                            blockDimension.playSound(fireplaceBlockConfig.litSFX, blockLocation)
                            block.setPermutation(blockPermutation.withState(
                                fireplaceBlockConfig.blockIsLitState, true
                            )); break

                        // Fireplace dousing
                        case extinguishItems.includes(playerItem.typeId) && blockIsLitProperty:
                            blockDimension.playSound(fireplaceBlockConfig.douseSFX, blockLocation)
                            block.setPermutation(blockPermutation.withState(
                                fireplaceBlockConfig.blockIsLitState, false
                            )); break
                    }
                }
            }
        )

        blockComponentRegistry.registerCustomComponent(
            "mco_santa:fireplace.ticking",
            {
                onTick(event) {
                    const block = event.block, blockDimension = block.dimension, blockLocation = block.location

                    warnDevelopersInChat('Semi-Random Fireplace Tick event!', blockDimension)
                }
            }
        )
    }
)