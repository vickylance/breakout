import GameObject from './GameObject';
import Sprite from './Sprite';
import Vector2 from './Vector2';
import Game from './Game';

class Brick implements  GameObject {
  public sprite: Sprite;
  public position: Vector2;
  public height: number;
  public width: number;
  public game: Game;
  public point: number;
  public hue: string;

  constructor(game: Game, point: number, hue: string) {
    this.game = game;
    this.sprite = this.game.spritesheets["main"].getImage("brick");
    this.height = this.sprite.height;
    this.width = this.sprite.width;
    this.point = point;
    this.hue = hue;
  }

  update(deltaTime: number) {
  }

  draw(ctx: CanvasRenderingContext2D) {
  }
}

export default Brick;
