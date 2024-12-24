/** @import {Entity} from "@minecraft/server" */
import { ItemStack, world, system, Entity, EntityComponentTypes } from "@minecraft/server"

import { santaEntityConfig } from "../../0config/entities/santa.js"

/** Event for Santa giving a randomised item as a gift to the Player
 * @param {Entity} entity */
export function santaGiveGiftEvent(entity) {
    const entityDimension = entity.dimension, entityLocation = entity.location

    // We start off the Event by playing an animation on Santa
    entity.playAnimation('animation.mco_santa.mini_santa.throw_present')

    // Effects for throwing event
    entityDimension.playSound(santaEntityConfig.throwPresentSFX, entityLocation)

    // Decide whether this user is naughty or nice...
    const entityTameableComponent = entity.getComponent(EntityComponentTypes.Tameable)
    const entityOwner = entityTameableComponent.tamedToPlayer
    let playerIsOnTheNiceList = false
    if (entityOwner != undefined) {
        const nearbyPlayers = entityDimension.getEntities({
            type: 'minecraft:player',
            maxDistance: 12,
            location: entityLocation
        })

        if (nearbyPlayers[0].nameTag == entityOwner.nameTag) {
            playerIsOnTheNiceList = true
        }
    }

    let lootToSpawn
    switch (playerIsOnTheNiceList) {
        case false: lootToSpawn = santaEntityConfig.coalItemsLootTable; break
        case true: lootToSpawn = santaEntityConfig.giftItemsLootTable; break
    }

    // Then, after a certain delay, we spawn the Gift item
    const presentThrowChargeup = system.runTimeout(() => {
        entityDimension.runCommand(
            `loot spawn ${entityLocation.x + 0.5} ${entityLocation.y} ${entityLocation.z + 0.5} loot "${lootToSpawn}"`
        )
    }, santaEntityConfig.throwPresentDelay)

    // After a final delay (to allow the item to spawn) we launch said Gift item
    const entityTarget = entity.getViewDirection()
    let itemsInVicinity
    const itemVelocityUpdate = system.runTimeout(() => {
        itemsInVicinity = entityDimension.getEntities({ type: 'minecraft:item', maxDistance: 1.0, location: entityLocation })
        itemsInVicinity.forEach((item) => {
            item.applyImpulse({ x: entityTarget.x, y: entityTarget.y, z: entityTarget.z })
        })

        entity.triggerEvent('mco_santa:mini_santa.gifted_owner')
    }, santaEntityConfig.throwPresentDelay + 1)
}
