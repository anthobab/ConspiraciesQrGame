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
let firstStart = true;
// const test = new Deck(
//   new Duchess(),
//   new Assassin(),
//   new Pirate(),
//   new Witch(),
//   new Spy()
// );

//

choicesSection.classList.add("hidden");
gameSection.classList.add("hidden");
logSection.classList.add("hidden");

startBtn.addEventListener("click", startGame);

// action Start Button
//
function startGame() {
  if (!firstStart) {
    //reinit game
  } else {
    startBtn.innerText = "Restart the Game";
    firstStart = false;
    choicesSection.classList.remove("hidden");
    gameSection.classList.remove("hidden");
    logSection.classList.remove("hidden");
  }

  // choose characters for this game session
  let game = new Game(
    new Duchess(),
    new Assassin(),
    new Pirate(),
    new Witch(),
    new Spy()
  );

  let activePlayer = game.activePlayer;
  let opponentPlayer = game.opponentPlayer;

  // console.log(game.deck.cardsList);
  // console.log(game.player);
  // console.log(game.computer);
  // console.log(game);

  //
  // radio button for the action in section choices :

  // const choicesList = choicesSection.querySelector(".choices-list");
  //<input type="radio" id="choice1" class="choices-list" name="choice" value="to define">
  //<label for="choice1">first label</label>

  game.choices.forEach((choice, index) => {
    // let index = game.choices.indexOf(choice);
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
    labelElement.classList.add("choice-label", "choice-labelhover");
    labelElement.textContent = choice.text;

    divElement.append(inputElement);
    divElement.append(labelElement);
    console.log(divElement);
    nextButton.parentElement.before(divElement);
  });

  // radio button for the counter in section choices :

  game.counterChoices.forEach((counterChoice) => {
    let index = game.counterChoices.indexOf(counterChoice);
    const divElement = document.createElement("div");
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "radio");
    inputElement.setAttribute("class", "choices-list");
    inputElement.setAttribute("name", "counterChoice");
    inputElement.setAttribute("id", "counterChoice" + index);
    inputElement.setAttribute("value", index);
    if (!index) {
      inputElement.setAttribute("checked", true);
    }

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", inputElement.getAttribute("id"));
    labelElement.classList.add("choice-label", "choice-labelhover");
    labelElement.textContent = counterChoice.text;

    divElement.append(inputElement);
    divElement.append(labelElement);
    nextButton.parentElement.before(divElement);
  });

  document.querySelectorAll('[name="counterChoice"]').forEach((element) => {
    element.parentElement.classList.add("hidden");
    // element.parentElement.style.display = "none";
  });

  // update active Radio Btn
  updateRadioBtn(game);

  // source image on "html"

  updateImg(game);
  updateTreasure(game);

  //
  // NEXT BUTTON : Event Listener next action
  //

  nextButton.addEventListener("click", (event) => {
    let indexChosenValue;
    //select the good value
    let listName = "";
    switch (game.actionType) {
      //actionType = 'counter' 'action' 'bluff' 'info'
      case "action":
        listName = "choice";
        indexChosenValue = Number(
          document
            .querySelector(".choices-list[name='" + listName + "']:checked")
            .getAttribute("value")
        );
        break;
      case "counter":
        listName = "counterChoice";
        indexChosenValue = Number(
          document
            .querySelector(".choices-list[name='" + listName + "']:checked")
            .getAttribute("value")
        );
        break;
      case "bluff":
        listName = "believeLiar";
        indexChosenValue = Number(
          document
            .querySelector(".choices-list[name='" + listName + "']:checked")
            .getAttribute("value")
        );
        break;

      default:
        break;
    }

    game.next(indexChosenValue, activePlayer, opponentPlayer, 0, game.deck);

    //mise à jour des morts et des cartes
    //si perso mort, choisir lequel
    while (opponentPlayer.cardToKill > 0) {
      killACard(opponentPlayer, activePlayer, game);

      opponentPlayer.cardToKill -= 1;
    }
    activePlayer = game.activePlayer;
    if (game.winner) {
      endGame(game.winner === "player");
      console.log();
    }
    // if (activePlayer.computer){
    //   // if a computer
    // }
    // else{
    // }

    updateGame(game);
  });
}

// FUNCTIONS
function updateGame(game) {
  // update active Radio Btn
  updateRadioBtn(game);

  // source image on "html"

  updateImg(game);
  //mise à jour des mouvements de pièces
  updateTreasure(game);

  //vérification du gagnant
  console.log(game.player);
  console.log(game.computer);
}

//DRY toDO
function updateRadioBtn(game) {
  //choices
  radioBtnAffectClass(game, "choices");
  // game.choices.forEach((choice) => {
  //   let index = game.choices.indexOf(choice);

  //   const currentRadioBtn = document.getElementById("choice" + index);
  //   // cheked property
  //   if (!index) {
  //     currentRadioBtn.checked = true;
  //   } else {
  //     currentRadioBtn.checked = false;
  //   }
  //   if (
  //     game.choices[index].condition(
  //       game.activePlayer,
  //       game.opponentPlayer,
  //       game.log,
  //       false,
  //       game.actionType
  //     )
  //   ) {
  //     currentRadioBtn.disabled = false;
  //     currentRadioBtn.parentElement
  //       .querySelector("label")
  //       .classList.replace("disabled", "choice-labelhover");
  //   } else {
  //     currentRadioBtn.disabled = true;
  //     currentRadioBtn.parentElement
  //       .querySelector("label")
  //       .classList.replace("choice-labelhover", "disabled");
  //   }
  // });
  //counterChoices
  radioBtnAffectClass(game, "counterChoices");
  // game.counterChoices.forEach((choice) => {
  //   let index = game.counterChoices.indexOf(choice);

  //   const currentRadioBtn = document.getElementById("counterChoice" + index);
  //   // cheked property
  //   if (!index) {
  //     currentRadioBtn.checked = true;
  //   } else {
  //     currentRadioBtn.checked = false;
  //   }
  //   if (
  //     game.counterChoices[index].condition(
  //       game.activePlayer,
  //       game.opponentPlayer,
  //       game.log,
  //       false,
  //       game.actionType
  //     )
  //   ) {
  //     currentRadioBtn.disabled = false;
  //     currentRadioBtn.parentElement
  //       .querySelector("label")
  //       .classList.replace("disabled", "choice-labelhover");
  //   } else {
  //     currentRadioBtn.disabled = true;
  //     currentRadioBtn.parentElement
  //       .querySelector("label")
  //       .classList.replace("choice-labelhover", "disabled");
  //   }
  // });
}

function updateImg(currentGame) {
  const playercard1imgDOM = document.querySelector("#playerCard1 .recto");
  // console.log("player in dom", playercard1imgDOM);
  const playercard2imgDOM = document.querySelector("#playerCard2 .recto");
  const computercard1imgDOM = document.querySelector("#computerCard1 .recto");
  const computercard2imgDOM = document.querySelector("#computerCard2 .recto");
  playercard1imgDOM.setAttribute("src", currentGame.player.cards[0].faceImg);
  playercard1imgDOM.classList.remove("hidden");
  document.querySelector("#playerCard1 .verso").classList.add("hidden");

  playercard2imgDOM.setAttribute("src", currentGame.player.cards[1].faceImg);
  playercard2imgDOM.classList.remove("hidden");
  document.querySelector("#playerCard2 .verso").classList.add("hidden");

  computercard1imgDOM.setAttribute(
    "src",
    currentGame.computer.cards[0].faceImg
  );

  computercard2imgDOM.setAttribute(
    "src",
    currentGame.computer.cards[1].faceImg
  );

  currentGame.computer.cards.forEach((computercard) => {
    let indexOfCard = currentGame.computer.cards.indexOf(computercard);
    if (computercard.alive) {
      document
        .querySelector("#computerCard" + (indexOfCard + 1) + " .verso")
        .classList.remove("hidden");
      document
        .querySelector("#computerCard" + (indexOfCard + 1) + " .recto")
        .classList.add("hidden");
    } else {
      document
        .querySelector("#computerCard" + (indexOfCard + 1) + " .recto")
        .classList.remove("hidden");
      document
        .querySelector("#computerCard" + (indexOfCard + 1) + " .verso")
        .classList.add("hidden");
    }
  });
}

function updateTreasure(currentGame) {
  const playerTreasureCounter = document.getElementById(
    "playerTreasureCounter"
  );
  const computerTreasureCounter = document.getElementById(
    "computerTreasureCounter"
  );
  playerTreasureCounter.textContent = currentGame.player.treasure;
  computerTreasureCounter.textContent = currentGame.computer.treasure;
}

function killACard(victim, killer, game) {
  // TODO : animation from killer to victim

  //victim.name; //"player"
  const cardsContainer = document.getElementById(victim.name + "Deck");
  const cards = [];
  cards[0] = document.getElementById(victim.name + "Card1"); //div(img(recto1)+img(verso1))
  cards[1] = document.getElementById(victim.name + "Card2");

  cards.forEach((card) => {
    let indexCard = cards.indexOf(card);
    if (victim.cards[indexCard].alive) {
      console.log("carteVictime en hover", victim.cards[indexCard]);
      cards[indexCard]
        .querySelectorAll("img")
        .forEach((element) => element.classList.add("card-hover"));
    }
  });

  // add event listener to kill a card when its done
  cardsContainer.addEventListener("click", function selectACard(event) {
    // console.log("EventListener Call");
    // console.log(event.target.querySelector("+div"));
    // console.log(event.target.parentElement);
    if (
      event.target.parentElement === cards[0] ||
      event.target.parentElement === cards[1]
    ) {
      // console.log("card selected");

      // removed hover on cards
      cardsContainer
        .querySelectorAll(".card-hover")
        .forEach((element) => element.classList.remove("card-hover"));

      //kill the selected card
      let indexCard = cards.indexOf(event.target.parentElement);
      //  alive false on the selected card
      //  image red
      cards[indexCard]
        .querySelectorAll("img")
        .forEach((element) => element.classList.add("card-killed"));
      victim.cards[indexCard].alive = false;

      updateGame(game);
      // remove the listener once a card is selected
      cardsContainer.removeEventListener("click", selectACard);
    }
  });
}

function radioBtnAffectClass(game, choicesString) {
  game[choicesString].forEach((choice, index) => {
    // let index = game[x].indexOf(choice);
    // console.log(choice);

    const currentRadioBtn = document.getElementById(
      choicesString.slice(0, -1) + index
    );
    // cheked property
    // console.log(x.slice(0, -1) + (index + 1));
    // console.log(currentRadioBtn, index);
    currentRadioBtn.checked = !index;

    if (
      game[choicesString][index].condition(
        game.activePlayer,
        game.opponentPlayer,
        game.log,
        false,
        game.actionType
      )
    ) {
      currentRadioBtn.disabled = false;
      currentRadioBtn.parentElement
        .querySelector("label")
        .classList.replace("disabled", "choice-labelhover");
    } else {
      currentRadioBtn.disabled = true;
      currentRadioBtn.parentElement
        .querySelector("label")
        .classList.replace("choice-labelhover", "disabled");
    }
  });
}

function endGame(win) {
  if (win) {
    console.log("Congratulation You Win ! \n Wanna play again with me ?");
  } else {
    console.log("You Loose !!!  Try Again ... : ");
  }
}
