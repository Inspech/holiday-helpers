/** @import {ItemCustomComponentRegistration} from "../index.js" */

import { EntityComponentTypes, ItemComponentTypes, GameMode, system } from "@minecraft/server"
import { getTargetBlockFromFace, playSoundOnBlockItemPlacement } from "../../../0utilities/blockFunctions.js"

import { decrementStack, getPlayerCardinalFacing } from "../../../0utilities/playerFunctions.js"
import { entityRotationFromBlockRotation } from "../../../0utilities/blockFunctions.js"

/** Plays a sound effect from a defined mapping on placement of a block item
 * @type {ItemCustomComponentRegistration} **/
export default {
    ID: "mco_santa:nutcracker.placement",

    onUseOn(event) {
        const item = event.itemStack, source = event.source, itemDimension = source.dimension
        const block = getTargetBlockFromFace(event.block, event.blockFace)

        const entitySpawnLocation = block.bottomCenter()

        if (source.getGameMode() != GameMode.creative) { decrementStack(source) }

        const playerRotation = getPlayerCardinalFacing(source)
        let entityRotation = entityRotationFromBlockRotation(playerRotation)
        const entityToSpawn = itemDimension.spawnEntity(item.typeId, entitySpawnLocation)

        // NOTE - EXPERIMENTAL | BETA APIs | 1.17.0-beta
        // const entityToSpawn = itemDimension.spawnEntity(item.typeId, entitySpawnLocation, { initialRotation: entityRotation })

        const
            spawnedEntityTameComponent = entityToSpawn.getComponent(EntityComponentTypes.Tameable),
            entityHealthComponent = entityToSpawn.getComponent(EntityComponentTypes.Health)

        const itemDamage = item.getComponent(ItemComponentTypes.Durability).damage
        const healthToSet = entityHealthComponent.effectiveMax - itemDamage

        entityToSpawn.setDynamicProperty('mco_santa:nutcracker.initial_rotation', entityRotation)

        entityHealthComponent.setCurrentValue(healthToSet)
        spawnedEntityTameComponent.tame(source)
        entityToSpawn.setRotation({ x: 0, y: entityRotation })
    }
}