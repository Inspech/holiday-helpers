import { world, system } from "@minecraft/server"

import { nutcrackerEntityConfig } from "../0config/entities/nutcracker.js"


world.afterEvents.entitySpawn.subscribe((event) => {
    const entity = event.entity, entityID = entity.typeId

    let entityHomeLocation
    switch (entityID) {
        case nutcrackerEntityConfig.entityID:
            system.runTimeout(() => {
                entityHomeLocation = entity.location
                entity.setDynamicProperty('mco_santa:entity_home_location', {
                    x: entityHomeLocation.x,
                    y: entityHomeLocation.y,
                    z: entityHomeLocation.z
                })
            })
            break
    }
})