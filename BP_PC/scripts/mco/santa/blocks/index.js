/** @import {BlockCustomComponent} from "@minecraft/server" */
/** @typedef {{ID: string} & BlockCustomComponent} BlockCustomComponentRegistration */

import { world } from "@minecraft/server"

import presentDestroyedComponent from "./components/presentDestroyedComponent.js"
import presentInteractedComponent from "./components/presentInteractedComponent.js"

import fireplaceFirewoodInteractionComponent from "./components/fireplaceFirewoodInteractionComponent.js"
import fireplaceIgnitionInteractionComponent from "./components/fireplaceIgnitionInteractionComponent.js"
import fireplacePlacementComponent from "./components/fireplacePlacementComponent.js"
import fireplaceTickingComponent from "./components/fireplaceTickingComponent.js"

import chimneyPlacementComponent from "./components/chimneyPlacementComponent.js"

import globalPlacementSFXComponent from "./components/globalPlacementSFXComponent.js"

const customComponents = [
    presentDestroyedComponent,
    presentInteractedComponent,

    fireplaceFirewoodInteractionComponent,
    fireplaceIgnitionInteractionComponent,
    fireplacePlacementComponent,
    fireplaceTickingComponent,

    chimneyPlacementComponent,

    globalPlacementSFXComponent,
]


world.beforeEvents.worldInitialize.subscribe(
    ({ blockComponentRegistry }) => {
        for (const customComponent of customComponents) {
            blockComponentRegistry.registerCustomComponent(customComponent.ID, customComponent)
        }
    }
)