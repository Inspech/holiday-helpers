
/** General settings and configurations for the Chimney block */
export const chimneyBlockConfig = {
    blockID: 'mco_santa:chimney',

    /** The state of the Chimney block as it relates to the shape configuration, 
     * ie the Chimney Top vs the leading columns */
    blockShapeState: 'mco_santa:chimney.shape',
    /** State depicting whether or not this Chimney block is connected to a lit Fireplace block */
    blockIsLitState: 'mco_santa:block.is_lit',

    /** The individual shape configurations for the Chimney block */
    blockShapeTypes: [
        'column',
        'full',
        'top'
    ],

    maxDistanceFromFireplace: 16,

    smokePuffVFX: 'minecraft:campfire_tall_smoke_particle'
}