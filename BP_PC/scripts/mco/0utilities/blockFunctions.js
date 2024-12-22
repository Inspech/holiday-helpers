/** @import {Block, Entity, ItemStack} from "@minecraft/server" */

import { replaceableBlocks } from "../0data/vanilla";
import sounds from "../santa/0config/blockData.js"

/** Retrieve any neighbouring block in a given direction 
 * @param {Block} block */
export function getAdjacentBlock(adjacentDirection, { targetDistance = 1 }, originBlock, placementDirection, { directionType = 'cardinal' }) {
    let adjacentBlock

    switch (true) {
        default:
            switch (adjacentDirection) {
                case 'Forward':
                    adjacentBlock = originBlock.north(targetDistance); break
                case 'Backward':
                    adjacentBlock = originBlock.south(targetDistance); break
                case 'Right':
                    adjacentBlock = originBlock.east(targetDistance); break
                case 'Left':
                    adjacentBlock = originBlock.west(targetDistance); break
                case 'Above':
                    adjacentBlock = originBlock.above(targetDistance); break
                case 'Below':
                    adjacentBlock = originBlock.below(targetDistance); break
            }; break

        case (
            (directionType == 'cardinal' && placementDirection == 3) ||
            (directionType == 'cardinal' && placementDirection == 'east') ||
            (directionType == 'blockFace' && placementDirection == 'west')
        ):
            switch (adjacentDirection) {
                case 'Forward':
                    adjacentBlock = originBlock.east(targetDistance); break
                case 'Backward':
                    adjacentBlock = originBlock.west(targetDistance); break
                case 'Right':
                    adjacentBlock = originBlock.south(targetDistance); break
                case 'Left':
                    adjacentBlock = originBlock.north(targetDistance); break
                case 'Above':
                    adjacentBlock = originBlock.above(targetDistance); break
                case 'Below':
                    adjacentBlock = originBlock.below(targetDistance); break
            }; break

        case (
            (directionType == 'cardinal' && placementDirection == 0) ||
            (directionType == 'cardinal' && placementDirection == 'south') ||
            (directionType == 'blockFace' && placementDirection == 'north')
        ):
            switch (adjacentDirection) {
                case 'Forward':
                    adjacentBlock = originBlock.south(targetDistance); break
                case 'Backward':
                    adjacentBlock = originBlock.north(targetDistance); break
                case 'Right':
                    adjacentBlock = originBlock.west(targetDistance); break
                case 'Left':
                    adjacentBlock = originBlock.east(targetDistance); break
                case 'Above':
                    adjacentBlock = originBlock.above(targetDistance); break
                case 'Below':
                    adjacentBlock = originBlock.below(targetDistance); break
            }; break

        case (
            (directionType == 'cardinal' && placementDirection == 1) ||
            (directionType == 'cardinal' && placementDirection == 'west') ||
            (directionType == 'blockFace' && placementDirection == 'east')
        ):
            switch (adjacentDirection) {
                case 'Forward':
                    adjacentBlock = originBlock.west(targetDistance); break
                case 'Backward':
                    adjacentBlock = originBlock.east(targetDistance); break
                case 'Right':
                    adjacentBlock = originBlock.north(targetDistance); break
                case 'Left':
                    adjacentBlock = originBlock.south(targetDistance); break
                case 'Above':
                    adjacentBlock = originBlock.above(targetDistance); break
                case 'Below':
                    adjacentBlock = originBlock.below(targetDistance); break
            }; break

    }

    return adjacentBlock
}

// REVIEW - May add more rotation types 

/** Get an entity rotation from block rotation 
 * @param {Block} block */
export function entityRotationFromBlockRotation(blockRotation) {

    let entityRotation
    switch (blockRotation) {
        case 'north': entityRotation = 0; break
        case 'east': entityRotation = 90; break
        case 'south': entityRotation = 180; break
        case 'west': entityRotation = 270; break
    }

    return entityRotation
}

/** Tests whether or not all blocks in each cardinal direction are solid
 * @param {Block} block */
export function allLateralNeighboursSolid(block) {
    const directions = [block.north(), block.east(), block.south(), block.west()]

    let solidBlocks = 0;
    directions.forEach((direction) => {
        if (replaceableBlocks.includes(direction.typeId)) return; solidBlocks++
    })

    if (solidBlocks == 4) return true; else return false
}

/** For item block placers, gets the tile where a block should be placed from the face the item is used on
 * @param {String} blockFace */
export function getTargetBlockFromFace(block, blockFace) {

    let targetBlock
    switch (blockFace) {
        case 'North': targetBlock = block.north(); break
        case 'East': targetBlock = block.east(); break
        case 'South': targetBlock = block.south(); break
        case 'West': targetBlock = block.west(); break

        case 'Down': targetBlock = block.below(); break
        case 'Up': targetBlock = block.above(); break
    }

    return targetBlock
}

/** For item block placers, forks out the placement SFX component for exclusively successful placements
 * @param {ItemStack} itemStack * @param {Entity} source */
export function playSoundOnBlockItemPlacement(itemStack, source) {
    const itemDimension = source.dimension, itemLocation = source.location
    const data = sounds[itemStack.typeId]?.sound

    if (data) { itemDimension.playSound(data, itemLocation) }
}