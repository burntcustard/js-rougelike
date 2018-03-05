
/**
 * A collection of library funnctions, variables, etc.
 * TODO: Consider not polluting the global namespace.
 * /


/**
 * Converts a pair of x, y numbers into a coordinates object with x and y
 * properties, ensuring they're both integers (as we're working with a grid).
 * The arguments are converted with parseInt, so are effectively floored.
 * @param   {number} x X coordinate.
 * @param   {number} y Y coordinate.
 * @returns {object}   Coordinate object.
 */
function toCoords(x, y) {
    return {x: parseInt(x), y: parseInt(y)};
}


/**
 * Converts a pair of x, y number into a key string, e.g. "4,9".
 * @param   {number} x [[Description]]
 * @param   {number} y [[Description]]
 * @returns {string}   [[Description]]
 */
function toKeyStr(x, y) {
    return parseInt(x) + ',' + parseInt(y);
}


/**
 * Converts a key string into a coordinates object with x and y properties.
 * @param   {string} key [[Description]]
 * @returns {object} [[Description]]
 */
function keyStrToCoords(key) {
    var parts = key.split(",");
    return {x: parseInt(parts[0]), y: parseInt(parts[1])};
}


/**
 * Converts a coordinates object with x and y values to a key string.
 * @param   {object}   coords [[Description]]
 * @returns {string} [[Description]]
 */
function coordsToKeyStr(coords) {

    if (coords.x === undefined || coords.y === "undefined") {
        throw new Error("Object missing x or y coordinates");
    }

    return coords.x + "," + coords.y;
}
