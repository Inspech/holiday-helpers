/** @import {ItemCustomComponentRegistration} from "../index.js" */

import { EntityComponentTypes, ItemComponentTypes } from "@minecraft/server"
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

        decrementStack(source)

        const entityToSpawn = itemDimension.spawnEntity(item.typeId, entitySpawnLocation)
        const playerRotation = getPlayerCardinalFacing(source)
        let entityRotation = entityRotationFromBlockRotation(playerRotation)
        const
            spawnedEntityTameComponent = entityToSpawn.getComponent(EntityComponentTypes.Tameable),
            entityHealthComponent = entityToSpawn.getComponent(EntityComponentTypes.Health)

        const itemDamage = item.getComponent(ItemComponentTypes.Durability).damage
        const healthToSet = entityHealthComponent.effectiveMax - itemDamage

        entityHealthComponent.setCurrentValue(healthToSet)
        spawnedEntityTameComponent.tame(source)
        entityToSpawn.setRotation({ x: 0, y: entityRotation })
    }
}