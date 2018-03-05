
/**
 * All of the fancy map generating stuff.
 * TODO: Flip thie top half of the ship downwards, cutting off the lower wall,
 * so that it joins up to the new half and it's symmetrical and nice.
 * TODO: Spend several hours unnecessarily tweaking variables to make nicer ships.
 */


Game.map = {

    // Arrays holding x,y coords of important stuff:
    stars: [],
    outside: [],
    walls: [],
    floor: [],
    loot: [],

    // An array-like holding what's visible (i.e. what to display).
    // So if there's floor with loot on it, this contains the loot.
    displayList: {}

};



/**
 * Generate the maps display list from either everything that should be visible,
 * or just the specified list of stuff if only floor etc. is being looked at.
 * Using this function allows easier switcharooing of z-index, easier changing
 * of characters used to represent an object on the map (because they're all in
 * one place). There's another reason too that I can't remember but it's important.
 * TODO: Declare a character for each thing and then loop through all of the
 * game.map arrays automagically rather than writing each one like this.
 * @private
 */
Game._generateDisplayList = function(list) {

    this.map.displayList = {};

    if (!list || list === this.map.stars) {
        this.map.stars.forEach(star => {
            this.map.displayList[coordsToKeyStr(star)] = '-';
        });
    }

    if (!list || list === this.map.floor) {
        this.map.floor.forEach(floor => {
            this.map.displayList[coordsToKeyStr(floor)] = '.';
        });
    }

    if (!list || list === this.map.walls) {
        this.map.walls.forEach(walls => {
            this.map.displayList[coordsToKeyStr(walls)] = '#';
        });
    }

    if (!list || list === this.map.loot) {
        this.map.loot.forEach(loot => {
            this.map.displayList[coordsToKeyStr(loot)] = 'l';
        });
    }

};


/**
 * Generates the whole map, including stars in space, the space ship, etc.
 * @private
 */
Game._generateMap = function() {

    this._generateSpace();
    this._generateShip();
    this._generateLoot(this.map.floor);
    this._generateDisplayList();
    this._drawWholeMap();

};


/**
 * Generate stars and shit outside of the space ship
 * @private
 */
Game._generateSpace = function() {

    var x, y;

    for (x = 0; x < this.options.width-1; x++) {
        for (y = 0; y < this.options.height-1; y++) {

            // 4% chance of generating a star:
            if (ROT.RNG.getPercentage() <= 4) {
                this.map.stars.push(toCoords(x, y));
            }

            // TODO: 1% chance of generating a planet? Or large star?

        }
    }

};


/**
 * Create walls around the floor (which needs to be the only thing in the
 * displayList when this is run because just trust me it's simpler).
 * @private
 */
Game._generateWalls = function() {

    this.map.floor.forEach(function(floorTile) {

        let directions = {
            NN: (floorTile.x    ) + "," + (floorTile.y - 1),
            NE: (floorTile.x + 1) + "," + (floorTile.y - 1),
            EE: (floorTile.x + 1) + "," + (floorTile.y    ),
            SE: (floorTile.x + 1) + "," + (floorTile.y + 1),
            SS: (floorTile.x    ) + "," + (floorTile.y + 1),
            SW: (floorTile.x - 1) + "," + (floorTile.y + 1),
            WW: (floorTile.x - 1) + "," + (floorTile.y    ),
            NW: (floorTile.x - 1) + "," + (floorTile.y - 1),
        };
        Object.keys(directions).forEach(function (direction) {
            let adjacentCellKey = directions[direction];
            if (Game.map.displayList[adjacentCellKey] !== '.') {
                Game.map.walls.push(keyStrToCoords(adjacentCellKey));
            }
        });

    });

};



/**
 * Generate the space ship we'll be playing inside.
 * @private
 */
Game._generateShip = function() {

    // Clear these in case we're doing it again:
    this.outside = [];
    this.floor = [];

    var ship = new ROT.Map.Digger(
        this.options.width,
        this.options.height / 2,
        {
            roomWidth:  [5, 15],     // Min/max room width. Default: [3, 9]
            roomHeight: [3, 11],     // Min/max room height. Default: [3, 5]
            corridorLength: [3, 7],  // Min/max corridor length. Default: [3, 10]
            dugPercentage: 0.14      // Default: 0.2
        }
    );

    var digCallback = function(x, y, value) {

        y += 1;  // Move down a cell so we have a 1-cell border at the top.

        if (value) {
            // Spaaaace
            this.map.outside.push(toCoords(x, y));
        } else {
            // Inside spacehip
            this.map.floor.push(toCoords(x, y));
        }
    };

    ship.create(digCallback.bind(this));

    // If there's too few or too many rooms then try again:
    var numberOfRooms = ship.getRooms().length;
    if (numberOfRooms < 3 || numberOfRooms > 9) {
        console.log(numberOfRooms + " rooms on the new ship. Not ideal. Trying again.");
        this._generateShip();
        return;
    }

    this._generateDisplayList(this.map.floor);
    this._generateWalls();

};


/**
 * Draw space, the ship, the walls, items inside it etc.
 * @private
 */
Game._drawWholeMap = function() {
    for (var key in this.map.displayList) {
        let coords = keyStrToCoords(key);
        this.display.draw(coords.x, coords.y, this.map.displayList[key]);
    }
};


/**
 * Generate loot (pickups?) on the floor of the space ship.
 *  - Or somewhere else if we pass in something other than the floor.
 * @private
 * @param {Array} floor [[Description]]
 */
Game._generateLoot = function(spawnableArea) {
    for (var i = 0; i < 10; i++) {
        let index = Math.floor(ROT.RNG.getUniform() * spawnableArea.length);
        this.map.loot.push({x: spawnableArea[index].x, y: spawnableArea[index].y});
    }
};

