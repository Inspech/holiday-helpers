import { Dimension, DimensionTypes, system, world } from "@minecraft/server";

import { santaGiveGiftEvent } from '../entities/events/mini_santa.js'
import { nutcrackerMarchingMovementBreakEvent, nutcrackerAlignToHomeBlockEvent, nutcrackerTurnIntoItemEvent } from '../entities/events/nutcracker.js'

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, initiator, message, sourceEntity } = event

    if (id == 'mco_santa:mini_santa') {
        switch (message) {
            case 'give_gift': santaGiveGiftEvent(sourceEntity); break
        }
    }

    if (id == 'mco_santa:nutcracker') {
        switch (message) {
            case 'break_movement_while_marching': nutcrackerMarchingMovementBreakEvent(sourceEntity); break
        }
    }
    if (id == 'mco_santa:nutcracker') {
        switch (message) {
            case 'align_to_home_block': nutcrackerAlignToHomeBlockEvent(sourceEntity); break
        }
    }
    if (id == 'mco_santa:nutcracker') {
        switch (message) {
            case 'turn_into_item': nutcrackerTurnIntoItemEvent(sourceEntity); break
        }
    }
})

// NOTE: This is fun. Do not do this.
// const overworld = world.getDimension('overworld')
// system.runInterval(() => {
//     const entities = overworld.getEntities({ type: 'mco_santa:mini_santa' })
//     entities.forEach(entity => {
//         entity.runCommand('scriptevent mco_santa:mini_santa give_gift')
//     });
// }, 5)