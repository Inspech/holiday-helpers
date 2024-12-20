/** @import {Player} from "@minecraft/server" */
import { EntityComponentTypes, EquipmentSlot } from "@minecraft/server";

/** Retrieves the ItemStack from the Player's Mainhand 
 * @param {Player} player */
export function getPlayerItem(player) {
    const playerEquipmentComponent = player.getComponent(EntityComponentTypes.Equippable)
    let playerItem = playerEquipmentComponent.getEquipment(EquipmentSlot.Mainhand)

    return playerItem
}

/** Removes one item from the Player's Mainhand count 
 * @param {Player} player */
export function decrementStack(player) {
    const playerEquipmentComponent = player.getComponent(EntityComponentTypes.Equippable)
    let playerItem = playerEquipmentComponent.getEquipment(EquipmentSlot.Mainhand)

    let newItemStack = playerItem.clone();
    newItemStack.amount -= 1;

    playerEquipmentComponent.setEquipment(EquipmentSlot.Mainhand, newItemStack);
}

/** Gets the Player's cardinal facing direction 
 * @param {Player} player */
export function getPlayerCardinalFacing(player) {
    const yRotation = player.getRotation().y

    let facingDirectionCardinal
    switch (true) {
        // Facing North
        case yRotation <= -135 || yRotation > 135:
            facingDirectionCardinal = 'north'; break
        // Facing East
        case yRotation > -135 && yRotation <= -45:
            facingDirectionCardinal = 'east'; break
        // Facing South
        case yRotation > -45 && yRotation <= 45:
            facingDirectionCardinal = 'south'; break
        // Facing West
        default: facingDirectionCardinal = 'west'; break
    }

    return facingDirectionCardinal
}