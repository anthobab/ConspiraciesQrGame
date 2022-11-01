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
} from "./character.js";
import Computer from "./computer.js";
import Player from "./player.js";

export class Game {
  constructor(collector, assassin, robber, untouchable, negociator) {
    this.end = false;
    this.actionType = "action";
    this.winner = null;
    this.playerNb = 2;
    this.characterList = [
      "collector",
      "assassin",
      "robber",
      "untouchable",
      "negociator",
    ];
    this.log = "The Game begins : \n";
    this.choices = [
      {
        text: "Income : Take 1 coin from the Treasure.",
        action: (activePlayer, defenderPlayers, log, deck, actionType) => {
          activePlayer.treasure += 1;
        },
        condition: (activePlayer, defenderPlayers, log, deck, actionType) => {
          return true;
        },
        state: true,
        character: false,
      },
      {
        text: "Murder : Pay 7 coins to assassinate an opponent.",
        action: (activePlayer, defenderPlayers, log, deck, actionType) => {
          activePlayer.treasure -= 7;
          defenderPlayers.cardToKill += 1;
        },
        condition: (activePlayer, defenderPlayers, log, deck, actionType) => {
          return activePlayer.treasure >= 7;
        },
        state: true,
        character: false,
      },
    ];
    this.counterChoices = [
      {
        text: "Let it go ...",
        action: (activePlayer, defenderPlayers, log, deck, actionType) => {
          activePlayer.treasure += 1;
        },
        condition: (activePlayer, defenderPlayers, log, deck, actionType) => {
          return true;
        },
        state: true,
        character: false,
      },
    ];
    this.actionChoiceVal = 0;
    this.counterChoiceVal = 0;
    this.bluffChoiceVal = 0;
    this.bluffCounterChoiceVal = 0;
    this.deck = new Deck(collector, assassin, robber, untouchable, negociator);

    for (const char in this.deck.characters) {
      const charac = this.deck.characters[char];
      this.choices.push({
        text: "invoke the " + charac.rule.en,
        action: charac.action,
        condition: charac.condition,
        state: true,
        character: char.name,
      });
      if (undefined !== charac.counterCondition) {
        this.counterChoices.push({
          text: "invoke the " + charac.rule.en,
          action: charac.counterAction,
          condition: charac.counterCondition,
          state: true,
          character: char.name,
        });
      }
    }

    // add allowed action helper
    // add the lying helper

    this.init();
  }
  init() {
    // dealer
    this.player = new Player(
      "player",
      this.deck.cardsList.splice(0, 1)[0], // take cards from the deck
      this.deck.cardsList.splice(1, 1)[0]
    );
    this.activePlayer = this.player;
    //this.log += "it's player " + this.activePlayer.name + " turn...";
    this.computer = new Computer(
      "computer",
      this.deck.cardsList.splice(0, 1)[0],
      this.deck.cardsList.splice(0, 1)[0]
    );
    this.opponentPlayer = this.computer;
  }

  next(choice, activePlayer, defenderPlayers, log, deck, actionType) {
    // console.log(choice);

    /* switch (actionType) {
      case "action":
        listName = "choice";
        break;
      case "counter":
        listName = "counterChoice";

        break;
      case "bluff":
        listName = "believeLiar";

        break;
      case "info":
      default:
        break;
     }*/

    // DRY not needed ?
    this.update(activePlayer, defenderPlayers);
    //update allowed action state
    const nextplayer = defenderPlayers; //DRY usefull ?
    let isLiar = false;
    switch (actionType) {
      case "action":
        //case action :

        // 1rst step : update this.actionChoiceVal, check if liar is possible and GOTO bluff MODE
        // 2nd step : check if any counter is possible and GOTO counter MODE
        // 3rd step : do the action, reset the choiceValue in this game,
        // final step : if defenderPlayers.treasure>=10 : this.next(choice murder) else GOTO next turn, type action and toggle active player and defenderPlayers

        // 1rst step : update this.actionChoiceVal, check if liar is possible and GOTO bluff MODE
        this.actionChoiceVal = choice;

        let isCounterPossible = false;
        if (choice >= 2) {
          //means its a character then bluffMode Enable
          this.actionType = "bluff";
          return;
          //DRY2 counter
          //2nd step : check if any counter is possible and GOTO counter MODE or resolve action

          this.counterChoices.forEach((counterChoice, index) => {
            if (!index) {
              // exculde let it go and check if there is counter possible
              counterChoice.state = this.counterChoices.condition(
                activePlayer,
                defenderPlayers,
                log,
                deck,
                actionType
              );
              isCounterPossible ||= counterChoice.state;
            }
          });
          //if (this.counterChoices.length>1)
          if (isCounterPossible) {
            this.actionType = "counter";
          }
        } else {
          // 3rd step : do the action, reset the choiceValue in this game,

          /// DO the ACTION DRY1start
          this.log +=
            "\n" +
            this.choices[choice].action(
              activePlayer,
              defenderPlayers,
              log,
              deck,
              actionType
            );
          //reset the choiceValue in this game
          this.bluffChoiceVal = 0;
          this.counterChoiceVal = 0;
          this.bluffCounterChoiceVal = 0;

          // final step : if defenderPlayers.treasure>=10 : this.next(choice murder witch is mandatory)
          //   else GOTO next turn, type action and toggle active player and defenderPlayers

          if (defenderPlayers.treasure >= 10) {
            this.next(1, defenderPlayers, activePlayer, log, deck, "action");
            //return;
          } else {
            this.actionType = "action";
            this.activePlayer = defenderPlayers;
            this.opponentPlayer = activePlayer;
          }
          /// DO the ACTION DRY1end
        }

        break;
      case "counter":
        //case counter :
        // 1rst step check if let it go... selected, Do Action, and GOTO next turn, type action and toggle active player and defenderPlayers;
        // 2nd step : a character is selected, GOTO bluff-counter MODE before resolving the counter
        // final step : resolve counter and GOTO next turn, type action and toggle active player and defenderPlayers;

        this.counterChoiceVal = choice;
        // 1rst step check if let it go... selected, Do Action, and GOTO next turn, type action and toggle active player and defenderPlayers;
        if (!choice) {
          /// DO the ACTION DRY1start
          this.log +=
            "\n" +
            this.choices[this.actionChoiceVal].action(
              activePlayer,
              defenderPlayers,
              log,
              deck,
              "action"
            );
          //reset the choiceValue in this game
          this.bluffChoiceVal = 0;
          this.counterChoiceVal = 0;
          this.bluffCounterChoiceVal = 0;

          // final step : if defenderPlayers.treasure>=10 : this.next(choice murder witch is mandatory)
          //   else GOTO next turn, type action and toggle active player and defenderPlayers

          if (defenderPlayers.treasure >= 10) {
            this.next(1, defenderPlayers, activePlayer, log, deck, "action");
            //return;
          } else {
            this.actionType = "action";
            this.activePlayer = defenderPlayers;
            this.opponentPlayer = activePlayer;
          }
          /// DO the ACTION DRY1end
        } else {
          // 2nd step : a character is selected, GOTO bluff-counter MODE before resolving the counter
          this.actionType = "bluff-counter";
        }

        // final step : resolve counter and GOTO next turn, type action and toggle active player and defenderPlayers;
        // inside "bluff"  or "bluff-counter"

        break;
      case "bluff":
        // if bluff : resolve bluff
        // and allow counter if it could exist
        //
        isLiar = false;
        // check if a bluff is requested :
        if (choice) {
          //check if choice action match the card deck of the potential liar
          const potentialLiar = activePlayer;
          const checkRequester = defenderPlayers;
          isLiar = potentialLiar.cards
            .filter((card) => card.alive)
            .reduce(function (acc, card, index, array) {
              return (
                accumulator && this.choices[choice].character !== card.name
              );
            }, true);

          if (isLiar) {
            //kill a card to the Liar
            potentialLiar.cardToKill += 1;
            //Skip the action ! and go to next turn action
          } else {
            //not a liar, Renew the notALiarPlayer Card (that the opponent knows now) and check if counter is possible or do the action as per
            // renew the card
            potentialLiar.cards
              .filter((card) => card.alive)
              .every((card) => {
                let indexArr = potentialLiar.cards.indexOf(card);

                if (this.choices[choice].character === card.name) {
                  deck.cardsList.push(potentialLiar.cards[indexArr]);
                  potentialLiar.cards[indexArr] = deck.cardsList.shift();
                  return false;
                }
              });

            // kill a card
            checkRequester.cardToKill += 1;

            //DRY2 counter start

            this.counterChoices.forEach((counterChoice, index) => {
              if (index) {
                // exclude let it go and check if there is counter possible
                counterChoice.state = this.counterChoices.condition(
                  activePlayer,
                  defenderPlayers,
                  log,
                  deck,
                  "counter"
                );
                isCounterPossible ||= counterChoice.state;
              }
            });
            //if (this.counterChoices.length>1)
            if (isCounterPossible) {
              this.actionType = "counter";
              break; //do not do action yet
            }
            //DRY2 counter end
          }
        }
        // if is not a liar
        if (!isLiar) {
          //  here bluf not requested or is not a Liar then Do the action
          /// DO the ACTION DRY1start !!!!!!!! CUT IN 2 PART
          this.log +=
            "\n" +
            this.choices[this.actionChoiceVal].action(
              activePlayer,
              defenderPlayers,
              log,
              deck,
              "action"
            );
        }
        //reset the choiceValue in this game
        this.bluffChoiceVal = 0;
        this.counterChoiceVal = 0;
        this.bluffCounterChoiceVal = 0;

        // final step : if defenderPlayers.treasure>=10 : this.next(choice murder witch is mandatory)
        //   else GOTO next turn, type action and toggle active player and defenderPlayers

        if (defenderPlayers.treasure >= 10) {
          this.next(1, defenderPlayers, activePlayer, log, deck, "action");
          //return;
        } else {
          this.actionType = "action";
          this.activePlayer = defenderPlayers;
          this.opponentPlayer = activePlayer;
        }
        /// DO the ACTION DRY1end

        // if (actionType === "bluff") {
        // }
        break;
      case "bluff-counter":
        // some DRY3 with bluff case COUNTER in MAJ when its different
        // if bluff : resolve bluff
        // and allow counter if it could exist
        isLiar = false;
        // check if a bluff is requested :
        if (choice) {
          //check if choice COUNTER action match the card deck of the potential liar
          const potentialLiar = defenderPlayers;
          const checkRequester = activePlayer;
          isLiar = potentialLiar.cards
            .filter((card) => card.alive)
            .reduce(function (acc, card, index, array) {
              return (
                accumulator && this.choices[choice].character !== card.name
              );
            }, true);

          if (isLiar) {
            //kill a card to the Liar
            potentialLiar.cardToKill += 1;
            //Skip the COUNTER action ! and DO the ACTION then go to next turn action
          } else {
            //not a liar, checked it's already a "COUNTER" can't check if counter is possible SO do the COUNTER means do not DO action
            // renew the card of the potentiel Liar and kill a card to the request of the check
            potentialLiar.cards
              .filter((card) => card.alive)
              .every((card) => {
                let indexArr = potentialLiar.cards.indexOf(card);

                if (this.choices[choice].character === card.name) {
                  deck.cardsList.push(potentialLiar.cards[indexArr]);
                  potentialLiar.cards[indexArr] = deck.cardsList.shift();
                  return false;
                }
              });
            // kill a card
            checkRequester.cardToKill += 1;
          }
        }
        // if is a liar
        if (isLiar) {
          this.log +=
            "\n" +
            this.choices[this.actionChoiceVal].action(
              activePlayer,
              defenderPlayers,
              log,
              deck,
              "action"
            );
        } else {
          //not a liar or counterbluff not requested, then action is counter do Nothing
          // LOG UPDATE ?
        }
        //reset the choiceValue in this game
        this.bluffChoiceVal = 0;
        this.counterChoiceVal = 0;
        this.bluffCounterChoiceVal = 0;

        // final step : if defenderPlayers.treasure>=10 : this.next(choice murder witch is mandatory)
        //   else GOTO next turn, type action and toggle active player and defenderPlayers

        if (defenderPlayers.treasure >= 10) {
          this.next(1, defenderPlayers, activePlayer, log, deck, "action");
          //return;
        } else {
          this.actionType = "action";
          this.activePlayer = defenderPlayers;
          this.opponentPlayer = activePlayer;
        }
        /// DO the ACTION DRY1end

        // if (actionType === "bluff") {
        // }

        break;

      //DRY  Update conditions :
      /*this.choices.forEach((actualchoice) => {
          let index = this.choices.indexOf(choice);
          //1rst rule : murder mandatory if treasure >= 10
          if (nextplayer.treasure >= 10) {
            if (index === 1) {
              actualchoice.state = true;
            } else {
              actualchoice.state = false;
            }
          } else {
            actualchoice.state = actualchoice.condition(
              activePlayer,
              defenderPlayers,
              log,
              deck,
              actionType
            );
          }
        });*/
      default:
        console.log("default case swich in Game.next() (l446+) in game.js... ");
        break;
    }
  }

  update(activePlayer, defenderPlayers) {
    // check if a character is dead
  }
}

export class Deck {
  constructor(collector, assassin, robber, untouchable, negociator) {
    this.characters = {};
    this.characters.collector = collector;
    this.characters.assassin = assassin;
    this.characters.robber = robber;
    this.characters.untouchable = untouchable;
    this.characters.negociator = negociator;
    this.cardNumber = 2;
    this.cardsList = [];

    this.init();
  }
  init() {
    // add cardNumber cards of each character :
    for (const char in this.characters) {
      for (let i = 0; i < this.cardNumber; i++) {
        // console.log(this.characters[char]);
        this.cardsList.push(JSON.parse(JSON.stringify(this.characters[char])));
        //this.cardsList.push([this.characters[char]].slice(0)[0]);
      }
    }
    this.shuffle();
  }

  shuffle() {
    //shuffle the deck : 1 sort / second method Fisher-Yates algorithm
    // 1
    // this.shuffledArray = array.sort((a, b) => 0.5 - Math.random());
    //2
    // console.log(test.cardsList);

    for (let i = this.cardsList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.cardsList[i];
      this.cardsList[i] = this.cardsList[j];
      this.cardsList[j] = temp;
    }
  }
}
