export default class GameCharacter {
  constructor(pet, attack, icons, result) {
    this.id = 0;
    this.pet = pet;
    this.attack = attack;
    this.score = 0;
    this.icons = icons;
    this.result = result;
    this.petPosition = {
      x: 20,
      y: 30,
      height: 80,
      width: 80,
      speed: 5
    };
    this.limits = {
      top: this.petPosition.y,
      bottom: this.petPosition.y + this.petPosition.height,
      right: this.petPosition.x + this.petPosition.width,
      left: this.petPosition.x
    };
  }

  drawPet(elements) {
    elements.canvasContext.drawImage(
      this.pet.image,
      this.petPosition.x,
      this.petPosition.y,
      this.petPosition.width,
      this.petPosition.height
    );
  }

  setLimits() {
    this.limits.top = this.petPosition.y + 20;
    this.limits.bottom =
      this.petPosition.y + this.petPosition.height - 20;
    this.limits.right =
      this.petPosition.x + this.petPosition.width - 20;
    this.limits.left = this.petPosition.x + 20;
  }
}
