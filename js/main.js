const w = 32, h = 18;
const display = new ROT.Display({
  width: w,
  height: h,
  forceSquareRatio: true
});
document.body.appendChild(display.getContainer());

const maze = new ROT.Map.DividedMaze(w, h);

maze.create((x, y, wall) => {
  display.draw(x, y, wall ? "#" : ".");
});