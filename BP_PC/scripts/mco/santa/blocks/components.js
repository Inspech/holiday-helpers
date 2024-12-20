import { world, system, BlockPermutation, EntityComponentTypes, GameMode } from "@minecraft/server"

import { decrementStack, getPlayerCardinalFacing, getPlayerItem } from "../../0utilities/playerFunctions"
import { getAdjacentBlock } from "../../0utilities/blockFunctions"
import { warnDevelopersInChat } from "../../0utilities/debug"

import { fireplaceBlockConfig, firewoodFuelItems } from "../0config/blocks/fireplace"
import { ignitionItems, extinguishItems } from "../../0globalConfig/vanilla"
import { clamp, clampedRandom, getRandomNumber } from "../../0utilities/math"
import minecraftmath from "../../0utilities/minecraft-math/minecraft-math.js";
const { Vector3Builder } = minecraftmath;

import { fireplaceEmitParticleEvent, fireplaceEmitSoundEvent, fireplaceGiveBirthToSanta } from "./events/fireplace"

world.beforeEvents.worldInitialize.subscribe(
    ({ blockComponentRegistry }) => {

        // Fireplace Components
        blockComponentRegistry.registerCustomComponent(
            "mco_santa:fireplace.firewood_interaction",
            {
                onPlayerInteract(event) {
                    const block = event.block, blockPermutation = block.permutation, blockDimension = block.dimension, blockLocation = block.location
                    const player = event.player, playerItem = getPlayerItem(player)
                    const blockHasFirewoodState = blockPermutation.getState(fireplaceBlockConfig.blockHasFirewoodState)

                    switch (true) {
                        case playerItem == undefined && blockHasFirewoodState:
                            blockDimension.playSound(fireplaceBlockConfig.removedItemSFX, blockLocation)
                            block.setPermutation(blockPermutation.withState(
                                fireplaceBlockConfig.blockHasFirewoodState, false
                            )); break

                        case playerItem == undefined && !blockHasFirewoodState: return

                        case firewoodFuelItems.includes(playerItem.typeId) && !blockHasFirewoodState:
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
                    const blockIsLitState = blockPermutation.getState(fireplaceBlockConfig.blockIsLitState)

                    switch (true) {
                        // No held item
                        case playerItem == undefined: return

                        // Fireplace lighting
                        case ignitionItems.includes(playerItem.typeId) && !blockIsLitState:
                            blockDimension.playSound(fireplaceBlockConfig.litSFX, blockLocation)
                            block.setPermutation(blockPermutation.withState(
                                fireplaceBlockConfig.blockIsLitState, true
                            )); break

                        // Fireplace dousing
                        case extinguishItems.includes(playerItem.typeId) && blockIsLitState:
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
                    const blockRotationState = block.permutation.getState(fireplaceBlockConfig.blockRotationalState)

                    // Get the block in front of the Fireplace
                    const blockInFront = getAdjacentBlock(
                        'Forward', { targetDistance: 1 }, block,
                        blockRotationState, { directionType: 'cardinal' }
                    )

                    // Set the appropriate particle locator for the Fireplace per direction
                    const frontLocation = blockInFront.location
                    let blockParticleLocator = block.above().center()
                    switch (true) {
                        case blockRotationState == 'north' || blockRotationState == 'south':
                            blockParticleLocator = new Vector3Builder({
                                x: fireplaceBlockConfig.particleAdjustmentHorizontal + blockLocation.x,
                                y: fireplaceBlockConfig.particleAdjustmentVertical + blockLocation.y,
                                z: (blockRotationState == 'north' ? 0.875 : 0.125) + blockLocation.z
                            }); break

                        case blockRotationState == 'east' || blockRotationState == 'west':
                            blockParticleLocator = new Vector3Builder({
                                x: (blockRotationState == 'west' ? 1.0 : 0.0) + blockLocation.x,
                                y: fireplaceBlockConfig.particleAdjustmentVertical + blockLocation.y,
                                z: fireplaceBlockConfig.particleAdjustmentHorizontal + blockLocation.z
                            }); break
                    }

                    // Generate a random number, 1 - 100
                    let randomNumber = getRandomNumber({ chanceOf: 100 })

                    // List of events to trigger
                    switch (true) {
                        case randomNumber > 0 && randomNumber <= 31: // 31% Chance
                            fireplaceEmitParticleEvent(block, blockParticleLocator, fireplaceBlockConfig.flameVFX); break
                        case randomNumber > 31 && randomNumber <= 62: // 31% Chance
                            fireplaceEmitParticleEvent(block, blockParticleLocator, fireplaceBlockConfig.smokeVFX); break
                        case randomNumber > 62 && randomNumber <= 93: // 31% Chance
                            fireplaceEmitSoundEvent(block, fireplaceBlockConfig.flameSFX); break

                        case randomNumber > 93: // 7% Chance
                            fireplaceGiveBirthToSanta(block, blockInFront, blockRotationState); break
                    }

                    warnDevelopersInChat('Semi-Random Fireplace Tick event!', blockDimension)
                }
            }
        )
        blockComponentRegistry.registerCustomComponent(
            "mco_santa:fireplace.placement",
            {
                beforeOnPlayerPlace(event) {
                    const block = event.block, player = event.player
                    const playerGamemode = player.getGameMode()

                    let hasFirewood = false
                    if (playerGamemode == GameMode.creative) hasFirewood = true

                    block.setPermutation(
                        BlockPermutation.resolve(
                            fireplaceBlockConfig.blockID, {
                            [fireplaceBlockConfig.blockRotationalState]: getPlayerCardinalFacing(player),
                            [fireplaceBlockConfig.blockHasFirewoodState]: hasFirewood
                        })
                    )

                    event.permutationToPlace = block.permutation
                }
            }
        )
    }
)