
/**
 * Random crap we're not using anymore or burntcustard wrote while he was half
 * asleep and doesn't know why it exists but it would be a shame to throw away.
 */


Game._isNorthOf = function(objA, objB) {
    return (objA.x     === objB.x &&
            objA.y - 1 === objB.y);
};
Game._isNorthEastOf = function(objA, objB) {
    return (objA.x + 1 === objB.x &&
            objA.y - 1 === objB.y);
};
Game._isEastOf = function(objA, objB) {
    return (objA.x + 1 === objB.x &&
            objA.y     === objB.y);
};
Game._isSouthEastOf = function(objA, objB) {
    return (objA.x + 1 === objB.x &&
            objA.y + 1 === objB.y);
};
Game._isSouthOf = function(objA, objB) {
    return (objA.x     === objB.x &&
            objA.y + 1 === objB.y);
};
Game._isSouthWestOf = function(objA, objB) {
    return (objA.x - 1 === objB.x &&
            objA.y + 1 === objB.y);
};
Game._isWestOf = function(objA, objB) {
    return (objA.x - 1 === objB.x &&
            objA.y     === objB.y);
};
Game._isNorthWestOf = function(objA, objB) {
    return (objA.x - 1 === objB.x &&
            objA.y - 1 === objB.y);
};


/**
 * Checks if object A and B are next to other.
 * @private
 * @param   {object}  objA       [[Description]]
 * @param   {object}  objB       [[Description]]
 * @param   {boolean} diagonally [[Description]]
 * @returns {boolean} [[Description]]
 */
Game._isAdjacent = function(objA, objB, diagonally) {

    if (objA.x === undefined || objA.y === undefined ||
        objB.x === undefined || objB.y === undefined) {
        throw new Error("Object missing x or y coordinates");
    }

    return (
        (Game._isNorthOf(objA, objB) ||
         Game._isEastOf(objA, objB)  ||
         Game._isSouthOf(objA, objB) ||
         Game._isWestOf(objA, objB)) ||
        (diagonally && (
             Game._isNorthEastOf(objA, objB) ||
             Game._isSouthEastOf(objA, objB) ||
             Game._isSouthWestOf(objA, objB) ||
             Game._isNorthWestOf(objA, objB)
        ))
    );
};
