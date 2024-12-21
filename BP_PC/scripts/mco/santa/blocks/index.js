/** @import {BlockCustomComponent} from "@minecraft/server" */
/** @typedef {{ID: string} & BlockCustomComponent} BlockCustomComponentRegistration */

import { world } from "@minecraft/server"

import fireplaceFirewoodInteractionComponent from "./components/fireplaceFirewoodInteractionComponent.js"
import fireplaceIgnitionInteractionComponent from "./components/fireplaceFirewoodInteractionComponent.js"
import fireplacePlacementComponent from "./components/fireplaceFirewoodInteractionComponent.js"
import fireplaceTickingComponent from "./components/fireplaceFirewoodInteractionComponent.js"

const customComponents = [
    fireplaceFirewoodInteractionComponent,
    fireplaceIgnitionInteractionComponent,
    fireplacePlacementComponent,
    fireplaceTickingComponent
]

world.beforeEvents.worldInitialize.subscribe(
    ({ blockComponentRegistry }) => {
        for (const customComponent of customComponents) {
            blockComponentRegistry.registerCustomComponent(customComponent.ID, customComponent)
        }
    }
)