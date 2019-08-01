import Game from "./Game";
import SpriteSheet from "./SpriteSheet";

// import assets
import * as BreakoutSpritesheet from "./assets/breakout.png";
import * as BreakoutData from "./assets/breakout.json";

Math.__proto__.toRad = (deg) => deg * (Math.PI/180);
Math.__proto__.toDeg = (rad) => rad * (180/Math.PI);

// create a new game obbject
let game = new Game("game", {
  width: 400,
  height: 400,
});
game.loadSpritesheet(new SpriteSheet(BreakoutSpritesheet.default, BreakoutData, "main"));
game.start();

let lastTime = 0;
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  game.ctx.clearRect(0, 0, game.width, game.height);
  game.update(deltaTime);
  game.draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
