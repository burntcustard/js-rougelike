


var Game = {

    options: {
        width: 80,
        height: 45,
        fontSize: 12,
        fontFamily: "Topaz-8",
        forceSquareRatio: true  // TODO: Get square font and set true
    },

    init: function() {
        this.display = new ROT.Display(this.options);
        document.body.appendChild(this.display.getContainer());
        this._generateMap();
    }

};
