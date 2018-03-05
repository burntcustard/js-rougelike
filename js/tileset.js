let tileset = {
    image: document.createElement("img"),
    width: 16,
    tileWidth: 16,
    tileHeight: 16,
    map: {},

    load: function() {
        this.image.src = "tiles.png";
    
        let chars = " ☺☻♥♦♣♠•◛○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■□";
    
        for (let i = 0; i < chars.length; i++) {
            this.map[chars[i]] = [
                i % this.width * this.tileWidth, 
                Math.floor(i / this.width) * this.tileHeight
            ];
        }
    }
};
