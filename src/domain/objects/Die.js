export default class Die {
  constructor(dieType = 20) {
    if (!Number.isInteger(dieType)) {
      throw new TypeError("faceCount must be an Integer!");
    }
    this.dieType = dieType;
    this.dieValue = 0;
  }

  getDieType() {
    return this.dieType;
  }
  getDieValue() {
    return this.dieValue;
  }

  roll() {
    switch (this.dieType) {
      case 100:
        this.dieValue = Math.floor((Math.random() * this.dieType) % 10);
        break;
      default:
        this.dieValue = Math.floor(Math.random() * this.dieType);
        break;
    }
  }
}
