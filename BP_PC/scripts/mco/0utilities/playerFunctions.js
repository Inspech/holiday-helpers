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