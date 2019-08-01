import { Engine, World } from 'matter-js';
import SpriteSheet from "./SpriteSheet";
import GameObject from "./GameObject";
import Ball from './Ball';
import Paddle from './Paddle';
import Input from './Input';
// import Box from './Box';

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
  public engine: Engine;
  public world: World;

  // Game Objects
  private ball: GameObject;
  private paddle: Paddle;
  // private box: Box;
  // private ground: Box;

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
    this.engine = Engine.create();
    this.world = this.engine.world;

    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    // this.box = new Box(this, {
    //   size: {
    //     x: 100,
    //     y: 100
    //   },
    //   position: {
    //     x: 245,
    //     y: 200
    //   },
    //   boxOptions: {
    //     // angle: Math.toRad(10)
    //   }
    // });
    // this.ground = new Box(this, {
    //   size: {
    //     x: this.width,
    //     y: 25
    //   },
    //   position: {
    //     x: 0,
    //     y: this.height - 25
    //   },
    //   boxOptions: {
    //     isStatic: true,
    //   }
    // })

    new Input(this.paddle);
    console.log("ENGINE: ", this.engine);
    Engine.run(this.engine);

    // add the game objects to the array
    this.gameObjects = [
      this.ball,
      this.paddle,
      // this.box,
      // this.ground,
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
