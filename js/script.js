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
const gameSection = document.getElementById("game");
const logSection = document.getElementById("log");
const choicesSection = document.getElementById("choices");
const nextButton = document.getElementById("nextButton");

// const test = new Deck(
//   new Duchess(),
//   new Assassin(),
//   new Pirate(),
//   new Witch(),
//   new Spy()
// );

// action Start Button
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
console.log(game);

// radio button for the action in section choices :

// const choicesList = choicesSection.querySelector(".choices-list");
//<input type="radio" id="choice1" class="choices-list" name="choice" value="to define">
//<label for="choice1">first label</label>

game.choices.forEach((choice) => {
  let index = game.choices.indexOf(choice);
  const divElement = document.createElement("div");
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "radio");
  inputElement.setAttribute("class", "choices-list");
  inputElement.setAttribute("name", "choice");
  inputElement.setAttribute("id", "choice" + index);
  inputElement.setAttribute("value", index);
  if (!index) {
    inputElement.setAttribute("checked", true);
  }

  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", inputElement.getAttribute("id"));
  labelElement.setAttribute("class", "choice-label");
  labelElement.textContent = choice.text;

  divElement.append(inputElement);
  divElement.append(labelElement);
  //   choicesSection.append(divElement);
  nextButton.parentElement.before(divElement);
});

nextButton.addEventListener("click", (event) => {
  let indexAction = Number(
    document.querySelector(".choices-list:checked").getAttribute("value")
  );

  game.next(indexAction, game.player, game.computer, 0, game.deck);
  //mise à jour des morts et des
  //
  console.log(game.player);
  console.log(game.computer);
});
