import { Game, Deck } from "./classes/game.js";
import {
  Characters,
  Collectors,
  Assassins,
  Robbers,
  Untouchables,
  Negociators,
  Duchess,
  Assassin,
  Pirate,
  Witch,
  Spy,
} from "./classes/character.js";
import Computer from "./classes/computer.js";
import Player from "./classes/player.js";

const startBtn = document.getElementById("start-button");

// const test = new Deck(
//   new Duchess(),
//   new Assassin(),
//   new Pirate(),
//   new Witch(),
//   new Spy()
// );

const game = new Game(
  new Duchess(),
  new Assassin(),
  new Pirate(),
  new Witch(),
  new Spy()
);

console.log();
console.log(game.deck.cardsList);
// gam.deck.cardsList[0].faceVisible = true;
// gam.deck.shuffle();

console.log(game.player);
console.log(game.computer);
