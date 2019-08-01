import Sprite from "./Sprite";
import Vector2 from "./Vector2";

interface GameObject {
  sprite: Sprite;
  position: Vector2;
  update(deltaTime: number);
  draw(ctx: CanvasRenderingContext2D);
}

export default GameObject;
