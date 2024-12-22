/** @import {ItemCustomComponent} from "@minecraft/server" */
/** @typedef {{ID: string} & ItemCustomComponent} ItemCustomComponentRegistration */

import { world } from "@minecraft/server"

import ornamentPlacementComponent from "./components/ornamentPlacementComponent.js"

const customComponents = [
    ornamentPlacementComponent
]

world.beforeEvents.worldInitialize.subscribe(
    ({ itemComponentRegistry }) => {
        for (const customComponent of customComponents) {
            itemComponentRegistry.registerCustomComponent(customComponent.ID, customComponent)
        }
    }
)