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
let activePlayer = game.activePlayer;
let opponentPlayer = game.opponentPlayer;

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

  game.next(indexAction, activePlayer, opponentPlayer, 0, game.deck);
  //mise à jour des morts et des cartes
  //si perso mort, choisir lequel
  while (opponentPlayer.cardToKill > 0) {
    killACard(opponentPlayer, activePlayer);

    opponentPlayer.cardToKill -= 1;
  }
  activePlayer = game.activePlayer;
  // if (activePlayer.computer){
  //   // if a computer
  // }
  // else{

  // }

  //vérification du gagnant
  //mise à jour des mouvements de pièces
  console.log(game.player);
  console.log(game.computer);
});

function killACard(victim, killer) {
  // TODO : animation from killer to victim

  //victim.name; //"player"
  const cardsContainer = document.getElementById(victim.name + "Deck");
  const cards = [];
  cards[0] = document.getElementById(victim.name + "Card1");
  cards[1] = document.getElementById(victim.name + "Card2");

  cards.forEach((card) => {
    let indexCard = cards.indexOf(card);
    if (victim.cards[indexCard].alive) {
      console.log("carteVictime en hover", victim.cards[indexCard]);
      cards[indexCard].querySelector("img").classList.add("card-hover");
    }
  });

  // add event listener to kill a card when its done
  cardsContainer.addEventListener("click", function selectACard(event) {
    console.log("EventListener Call");
    // console.log(event.target.querySelector("+div"));
    // console.log(event.target.parentElement);
    if (
      event.target.parentElement === cards[0] ||
      event.target.parentElement === cards[1]
    ) {
      console.log("card selected");

      // removed hover on cards
      cardsContainer
        .querySelectorAll(".card-hover")
        .forEach((element) => element.classList.remove("card-hover"));

      //kill the selected card
      let indexCard = cards.indexOf(event.target.parentElement);
      //  alive false on the selected card
      //  image red
      cards[indexCard].querySelector("img").classList.add("card-killed");
      victim.cards[indexCard].alive = false;
      // remove the listener once a card is selected
      cardsContainer.removeEventListener("click", selectACard);
    }
  });
}
