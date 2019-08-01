class SpriteSheet {
  public image: HTMLImageElement;
  private data: Array<object>;
  public name: string;

  constructor(image: string, data: Array<object>, name: string) {
    let tempImg = new Image();
    tempImg.src = image;
    this.image = tempImg;
    this.data = data;
    this.name = name;
  }

  getImage(name) {
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        const elem = this.data[key];
        if(elem["name"] === name) {
          return elem;
        }
      }
    }
  }
}

export default SpriteSheet;
