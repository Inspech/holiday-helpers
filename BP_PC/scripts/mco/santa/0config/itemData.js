import { eggnogItemConfig } from "./items/eggnog.js"
import { candyCaneItemConfig } from "./items/candyCane.js"
import { hotCocoaItemConfig } from "./items/hotCocoa.js"
import { gingerbreadCookieItemConfig } from "./items/gingerbreadCookie.js"


/** @type {Record<string, {effect: string, duration?: string, amplifier?: string}>} */
export default {
    [candyCaneItemConfig.itemID]: {
        "effect": 'haste',
        "duration": 60,
        "amplifier": 2
    },
    [eggnogItemConfig.itemID]: {
        "effect": 'strength',
        "duration": 120,
        "amplifier": 2
    },
    [gingerbreadCookieItemConfig.itemID]: {
        "effect": 'absorption',
        "duration": 10,
        "amplifier": 1
    },
    [hotCocoaItemConfig.itemID]: {
        "effect": 'resistance',
        "duration": 120,
        "amplifier": 3
    },
}