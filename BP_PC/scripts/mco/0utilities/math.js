
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
