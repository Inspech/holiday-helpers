/** @import {Entity} from "@minecraft/server" */
import { Entity, EntityComponentTypes, EquipmentSlot, ItemComponentTypes, ItemStack } from "@minecraft/server"

import { nutcrackerEntityConfig } from "../../0config/entities/nutcracker.js"


/** Event for the special breaks in movement to (loosely) align with the Nutcracker entity marching animation
 * @param {Entity} entity */
export function nutcrackerMarchingMovementBreakEvent(entity) {
    entity.addEffect(
        'slowness', nutcrackerEntityConfig.marchingMovementBreakDuration * 20, {
        amplifier: 255, showParticles: false
    })
}

/** Event for when a Nutcracker entity returns to its home block
 * @param {Entity} entity */
export function nutcrackerAlignToHomeBlockEvent(entity) {
    if (entity == undefined) return

    const entityHomeLocation = entity.getDynamicProperty('mco_santa:entity_home_location')
    if (entityHomeLocation == undefined) return

    entity.teleport({
        x: entityHomeLocation.x,
        y: entityHomeLocation.y,
        z: entityHomeLocation.z
    })

    const rotationProperty = entity.getDynamicProperty('mco_santa:nutcracker.initial_rotation')

    let yRotation = 0
    if (rotationProperty != undefined) yRotation = rotationProperty

    entity.setRotation(
        {
            x: 0,
            y: yRotation
        }
    )
}

/** Event for when the Player interacts with their Nutcracker
 * @param {Entity} entity */
export function nutcrackerTurnIntoItemEvent(entity) {
    const entityDimension = entity.dimension, entityLocation = entity.location

    const entityHealthComponent = entity.getComponent(EntityComponentTypes.Health),
        currentHealth = entityHealthComponent.currentValue, maxHealth = entityHealthComponent.effectiveMax
    const entitySkinVariant = entity.getProperty('mco_santa:nutcracker.skin_variant')

    const droppedItem = new ItemStack(nutcrackerEntityConfig.entityID, 1)
    droppedItem.getComponent(ItemComponentTypes.Durability).damage = maxHealth - currentHealth
    droppedItem.setDynamicProperty('mco_santa:nutcracker.skin_variant', entitySkinVariant)

    entityDimension.spawnItem(droppedItem, entityLocation)

    entityDimension.playSound(nutcrackerEntityConfig.turnedIntoItemSFX, entityLocation)

    entity.remove()
}