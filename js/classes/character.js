// 5 Categories of Characters : [collectors, assassins, robbers, untouchables, negociators]
// with each 3 possible Character. First step : 1 character for each category.
// [Duchess, Assassin, Pirate, Witch, Spy]
// actionType = 'counter' 'action' 'bluff' 'info'

export class Characters {
  constructor(name, category, faceImg) {
    this.name = name;
    this.category = category;
    this.faceImg = faceImg;
    this.faceVisible = false;
    this.alive = true;
    this.rule = {};
  }
  action(activePlayer, defenderPlayers, log, deck, actionType) {}
  condition(activePlayer, defenderPlayers, log, deck, actionType) {}
}

// 1 - category Collectors of Characters
export class Collectors extends Characters {
  constructor(name, faceImg) {
    super(name, "Collectors", faceImg);
  }
}

// Duchess
export class Duchess extends Collectors {
  constructor() {
    // const faceImg= new Image()
    // const faceImg = new Image();
    // faceImg.src =
    const faceImg = "./assets/Kiss01.png";
    super("Duchess", faceImg);
    this.rule.en = "Duchess : Take 3 coins from the treasure";
    this.rule.fr = "Duchesse : Prend 3 pièces au trésor";
  }
  action(activePlayer, defenderPlayers, log, deck, actionType) {
    activePlayer.treasure += 3;
    return "treasure_player_3";
  }
  condition(activePlayer, defenderPlayers, log, deck, actionType) {
    return true;
  }
}

// 2 - category Assassins of Characters
export class Assassins extends Characters {
  constructor(name, faceImg) {
    super(name, "Assassins", faceImg);
  }
}

// Assasin
export class Assassin extends Assassins {
  constructor() {
    const faceImg = "./assets/Sasha01.png";
    super("Assassin", faceImg);
    this.rule.en = "Assassin : Pay 3 coins to assassinate an opponent";
    this.rule.fr =
      "Assassin : Payer 3 pièces au trésor pour assassiner un adversaire";
  }
  action(activePlayer, defenderPlayers, log, deck, actionType) {
    activePlayer.treasure -= 3;
    defenderPlayers.cardToKill = true;
  }
  condition(activePlayer, defenderPlayers, log, deck, actionType) {
    if (activePlayer.treasure >= 3) {
      return true;
    }
    return false;
  }
}

// 3 - category Robbers of Characters
export class Robbers extends Characters {
  constructor(name, faceImg) {
    super(name, "Robbers", faceImg);
  }
}

// Pirate
export class Pirate extends Robbers {
  constructor() {
    const faceImg = "./assets/Leo01.png";
    super("Pirate", faceImg);
    this.rule.en = "Pirate : Steals 2 coins from an opponent";
    this.rule.fr = "Pirate : Vole 2 pièces à un adversaire";
  }
  action(activePlayer, defenderPlayers, log, deck, actionType) {
    if (defenderPlayers.treasure >= 2) {
      defenderPlayers.treasure -= 2;
      activePlayer.treasure += 2;
      return "opponent_player_2";
    } else {
      return false;
    }
  }
  condition(activePlayer, defenderPlayers, log, deck, actionType) {
    return defenderPlayers.treasure >= 2;
  }
}

// 4 - category Untouchables of Characters
export class Untouchables extends Characters {
  constructor(name, faceImg) {
    super(name, "Untouchables", faceImg);
  }
}

// Witch
export class Witch extends Untouchables {
  constructor() {
    const faceImg = "./assets/Hitsu01.png";
    super("Witch", faceImg);
    this.rule.en = "Witch : to counter the Assassin "; // or to bring 5 coins after you loose a card)";
    this.rule.fr = "Sorcière : contre l'Aassin ";
  }
  action(activePlayer, defenderPlayers, log, deck, actionType) {
    // activePlayer.treasure += 3;
  }
  condition(activePlayer, defenderPlayers, log, deck, actionType) {
    if (actionType === "counter") {
      return true;
    }
    return false;
  }
  counterAction(activePlayer, defenderPlayers, log, deck, actionType) {}
  ifDeath(activePlayer, defenderPlayers, log, deck, actionType) {}
  counterCondition(activePlayer, defenderPlayers, log, deck, actionType) {
    return false;
    if (actionType === "counter") {
      //if counter action check if last invoke of activeplayer is Assassin
      // TODO check about ASSASSINS instead of Assassin
      if (
        lastStrLedBySpecialStr(log, " action : ", activePlayer.name) &&
        lastStrFollowedBySpecialStr(log, " action : ", "invoke Assassin")
      ) {
        return true;
      }
    }
    return false;
  }
}

// 5 - category negociators of Characters
export class Negociators extends Characters {
  constructor(name, faceImg) {
    super(name, "Negociators", faceImg);
  }
}

// Spy
export class Spy extends Negociators {
  constructor() {
    const faceImg = "./assets/Uta01.png";
    super("Spy", faceImg);
    this.rule.en = "Spy : Change your deck";
    this.rule.fr = "l'Espion : Changer de cartes";
  }
  action(activePlayer, defenderPlayers, log, deck, actionType) {
    // TODO depends of the number of alive cards
    console.log(activePlayer.cards);
    activePlayer.cards = activePlayer.cards.map((card) => {
      if (card.alive) {
        deck.cardsList.push(card);
        return deck.cardsList.shift();
      }
      return card;
    });
    console.log(activePlayer.cards);
  }
  condition(activePlayer, defenderPlayers, log, deck, actionType) {
    return true;
  }
}

//Functions
// lastStrLedBySpecialStr(log, " action : ", "2") &&
//   lastStrFollowedBySpecialStr(log, " action : ", "invoke Duchess");
// console.log(lastStrLedBySpecialStr(log, " action : ", "2"));

function lastStrLedBySpecialStr(log, laststr, previousStr) {
  let starttext = log.lastIndexOf(laststr);
  return log.slice(starttext - previousStr.length, starttext) === previousStr;
}
// console.log(lastStrFollowedBySpecialStr(log, " action : ", "invoke Duchess"));

function lastStrFollowedBySpecialStr(log, laststr, nextStr) {
  let starttext = log.lastIndexOf(laststr);

  return (
    log.slice(
      starttext + laststr.length,
      starttext + laststr.length + nextStr.length
    ) === nextStr
  );
}
