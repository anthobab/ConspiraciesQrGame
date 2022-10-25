export default class Player {
  constructor(name, character1, charcater2) {
    this.name = name;
    this.treasure = 2;
    this.cards = [character1, charcater2];
    this.cardToKill = false;
  }
}
