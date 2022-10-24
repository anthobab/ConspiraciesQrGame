export default class Player {
  constructor(name, character1, charcater2) {
    this.name = name;
    this.treasure = 2;
    this.cards = {
      card1: { name: character1, alive: true },
      card2: { name: charcater2, alive: true },
    };
  }
}
