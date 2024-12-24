/** @import {ItemCustomComponent} from "@minecraft/server" */
/** @typedef {{ID: string} & ItemCustomComponent} ItemCustomComponentRegistration */

import { world } from "@minecraft/server"

import ornamentPlacementComponent from "./components/ornamentPlacementComponent.js"
import nutcrackerPlacementComponent from "./components/nutcrackerPlacementComponent.js"
import foodItemConsumptionComponent from "./components/foodItemConsumptionComponent.js"

const customComponents = [
    ornamentPlacementComponent,
    nutcrackerPlacementComponent,
    foodItemConsumptionComponent
]

world.beforeEvents.worldInitialize.subscribe(
    ({ itemComponentRegistry }) => {
        for (const customComponent of customComponents) {
            itemComponentRegistry.registerCustomComponent(customComponent.ID, customComponent)
        }
    }
)