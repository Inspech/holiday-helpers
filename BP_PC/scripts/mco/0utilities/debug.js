/** @import {Dimension} from "@minecraft/server" */
import { activeDevelopers } from "../0globalConfig/mush_co.js"

/** Sends private logging messages in chat to a whitelist of developers on the project
 * @param {Dimension} dimension * @param {String} message */
export function warnDevelopersInChat(message, dimension) {
    activeDevelopers.forEach(developer => {
        dimension.runCommand(`tell ${developer} ${message}`)
    });
}