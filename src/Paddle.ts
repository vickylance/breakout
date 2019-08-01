import Game from "./Game";
import Sprite from './Sprite';
import SpriteSheet from "./SpriteSheet";
import GameObject from "./GameObject";
import Vector2 from './Vector2';

class Paddle implements GameObject {
  private height: number;
  private width: number;
  private game: Game;
  public position: Vector2;
  public sprite: Sprite;

  constructor(game: Game) {
    this.game = game;
    this.sprite = this.game.spritesheets["main"].getImage("paddle");
    this.height = this.sprite.height;
    this.width = this.sprite.width;
    this.position = new Vector2(
      this.game.width / 2 - this.width / 2,
      this.game.height - this.height - 10
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    let spr = this.game.spritesheets["main"] as SpriteSheet;
    ctx.drawImage(
      spr.image,
      this.sprite.x,
      this.sprite.y,
      this.sprite.width,
      this.sprite.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }

  update(deltaTime: number) {
    this.position.x = this.game.input.mousePos.x;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.game.width)
      this.position.x = this.game.width - this.width;
  }
}

export default Paddle;
