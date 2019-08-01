import Vector2 from "./Vector2";

class Input {
  public mousePos: Vector2;

  constructor() {
    this.mousePos = new Vector2(0, 0);
    document.getElementById("game").addEventListener("mousemove", this.mouseMove);
  }

  mouseMove = (evt: MouseEvent) => {
    this.mousePos = new Vector2(evt.offsetX, evt.offsetY);
  }
}

export default Input;
