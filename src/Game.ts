import SpriteSheet from "./SpriteSheet";
import GameObject from "./GameObject";
import Ball from './Ball';
import Paddle from './Paddle';
import Input from './Input';

interface GameOptions {
  width: number;
  height: number;
}

class Game {
  private canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public width: number = 600; // default width
  public height: number = 300; // default height
  private options: GameOptions;
  public spritesheets: object = {};
  public gameObjects: Array<GameObject>;

  // Game Objects
  private ball: GameObject;
  private paddle: Paddle;

  constructor(id?: string, options?: GameOptions) {
    if (options) {
      this.options = options;
    }
    // get the canvas or create a new one
    if (id && document.getElementById(id)) {
      this.canvas = document.getElementById(id) as HTMLCanvasElement;
    } else {
      this.canvas = document.createElement("canvas");
      document.appendChild(this.canvas);
    }
    // set the game size
    if (this.options) {
      this.canvas.width = this.options.width;
      this.canvas.height = this.options.height;
    }
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.getBoundingClientRect().width;
    this.height = this.canvas.getBoundingClientRect().height;
  }

  loadSpritesheet(spr: SpriteSheet) {
    this.spritesheets[spr.name] = spr;
  }

  start() {
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);

    new Input(this.paddle);

    // add the game objects to the array
    this.gameObjects = [
      this.ball,
      this.paddle,
    ]
  }

  update(deltaTime) {
    this.gameObjects.forEach(gameObject => {
      gameObject.update(deltaTime);
    })
  }

  draw() {
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(this.ctx)
    })
  }
}

export default Game;
