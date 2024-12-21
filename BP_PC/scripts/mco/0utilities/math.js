/** @import {Vector3} from "@minecraft/server" */

/** Clamp two values
 * @param {Number} number * @param {Number} min * @param {Number} max */
export function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
}

/** Outputs a random value between X and Y, within a range of 0 to 1
 * @param {Number} min * @param {Number} max */
export function clampedRandom(min, max) {
    return clamp(Math.random(), min, max)
}

/** Get a random number between 1 and a given number
 * @param {Number} chanceOf */
export function getRandomNumber({ chanceOf = 10 }) {
    return Math.floor(
        Math.random() * chanceOf
    ) + 1
}

/** Subtract one Vector3 from another
 * @param {Vector3} v1 * @param {Vector3} v2 */
export function subtractVector3(v1, v2) {
    return {
        x: v1.x - v2.x,
        y: v1.y - v2.y,
        z: v1.z - v2.z
    };
}