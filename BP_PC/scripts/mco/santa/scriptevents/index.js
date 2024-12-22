import { Dimension, DimensionTypes, system, world } from "@minecraft/server";

import { santaGiveGiftEvent } from '../entities/events/mini_santa.js'
import { warnDevelopersInChat } from '../../0utilities/debug.js'

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, initiator, message, sourceEntity } = event

    if (id == 'mco_santa:mini_santa') {
        switch (message) {
            case 'give_gift': santaGiveGiftEvent(sourceEntity); break
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