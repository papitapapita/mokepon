export default class Mokepon {
  constructor(name, type, imgSrc, attacks) {
    this.name = name;
    this.type = type;
    this.image = new Image();
    this.image.src = imgSrc;
    this.attacks = attacks;
  }
}
