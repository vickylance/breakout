// import { Bodies, Body, IChamferableBodyDefinition, World } from "matter-js";

// import GameObject from "./GameObject";
// import Game from "./Game";
// import Sprite from "./Sprite";
// import Vector2 from "./Vector2";

// interface BoxOptions {
//   size?: Vector2;
//   position?: Vector2;
//   boxOptions?: IChamferableBodyDefinition;
// }

// class Box implements GameObject {
//   public sprite: Sprite;
//   public position: Vector2 = {
//     x: 50,
//     y: 50
//   };
//   public size: Vector2 = {
//     x: 100,
//     y: 100
//   };
//   public body: Body;
//   private game: Game;

//   constructor(game: Game, options?: BoxOptions) {
//     this.game = game;
//     if (options) {
//       if (options.size) this.size = options.size;
//       if (options.position) this.position = options.position;
//       if (!options.boxOptions) options.boxOptions = {};
//     }
//     // Create the matter js rectangle body
//     this.body = Bodies.rectangle(
//       this.position.x,
//       this.position.y,
//       this.size.x,
//       this.size.y,
//       options && options.boxOptions
//     );
//     console.log(this.body);
//     // Add the box to the game physics world
//     World.add(this.game.world, this.body);
//   }
//   update(deltaTime: number) {
//     this.position.x = this.body.position.x;
//     this.position.y = this.body.position.y;
//   }
//   draw(ctx: CanvasRenderingContext2D) {
//     ctx.save();
//     ctx.fillStyle = "#f00";
//     ctx.translate(
//       this.size.x / 2 + (this.position.x - this.size.x / 2),
//       this.size.y / 2 + (this.position.y - this.size.y / 2)
//     );
//     ctx.rotate(this.body.angle);
//     ctx.translate(
//       -(this.size.x / 2 + (this.position.x - this.size.x / 2)),
//       -(this.size.y / 2 + (this.position.y - this.size.y / 2))
//     );
//     ctx.fillRect(
//       (this.position.x - this.size.x / 2),
//       (this.position.y - this.size.y / 2),
//       this.size.x,
//       this.size.y
//     );
//     ctx.restore();
//   }
// }

// export default Box;
