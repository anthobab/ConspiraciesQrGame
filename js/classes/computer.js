import Player from "./player.js";

let paramBluff = 33 / 100;

export default class Computer extends Player {
  constructor(name, character1, charcater2) {
    super(name, character1, charcater2);
    this.isComputer = true;
  }
}
