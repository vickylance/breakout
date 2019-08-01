import GameObject from "./GameObject";
import Vector2 from "./Vector2";
import Sprite from "./Sprite";
import Game from "./Game";
import SpriteSheet from "./SpriteSheet";

class Ball implements GameObject {
  public position: Vector2;
  public sprite: Sprite;
  private speed: Vector2;
  private game: Game;
  private height: number;
  private width: number;
  public scale: number;

  constructor(game: Game) {
    this.position = {
      x: 10,
      y: 10
    };
    this.speed = {
      x: 80,
      y: 80
    };
    this.game = game;
    this.sprite = this.game.spritesheets["main"].getImage("ball");
    this.height = this.sprite.height;
    this.width = this.sprite.width;
    this.scale = 1;
  }

  update(deltaTime: number) {
    this.position.x += this.speed.x / deltaTime;
    this.position.y += this.speed.y / deltaTime;

    if(this.position.x + this.width > this.game.width || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    if(this.position.y + this.height > this.game.height || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
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
      this.width * this.scale,
      this.height * this.scale,
    );
  }
}

export default Ball;
