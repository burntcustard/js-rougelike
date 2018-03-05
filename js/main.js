var Game = {

    options: {
        width: 80,
        height: 45,
        layout: "tile"
    },

    init: function() {
        tileset.load();
        this.options.tileSet = tileset.image;
        this.options.tileMap = tileset.map;
        this.options.tileWidth = tileset.tileWidth;
        this.options.tileHeight = tileset.tileHeight;

        this.display = new ROT.Display(this.options);
        document.body.appendChild(this.display.getContainer());
        this._generateMap();
    }

};