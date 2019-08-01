import Paddle from "./Paddle";

class Input {
  constructor(paddle: Paddle) {
    document.addEventListener("keydown", (evt: KeyboardEvent) => {
      switch (evt.keyCode) {
        case 37:
          paddle.moveLeft();
          break;
        case 39:
          paddle.moveRight();
          break;
      }
    });
    document.addEventListener("keyup", (evt: KeyboardEvent) => {
      switch (evt.keyCode) {
        case 37:
          if (paddle.currentSpeed < 0) paddle.stop();
          break;
        case 39:
          if (paddle.currentSpeed > 0) paddle.stop();
          break;
      }
    });
  }
}

export default Input;
