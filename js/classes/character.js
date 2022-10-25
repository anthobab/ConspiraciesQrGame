// 5 Categories of Characters : [collectors, assassins, robbers, untouchables, negociators]
// with each 3 possible Character. First step : 1 character for each category.
// [Duchess, Assassin, Pirate, Witch, Spy]

export class Characters {
  constructor(name, category, faceImg) {
    this.name = name;
    this.category = category;
    this.faceImg = faceImg;
    this.faceVisible = false;
    this.rule = {};
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {}
}

// 1 - category collectors of Characters
export class Collectors extends Characters {
  constructor(name, faceImg) {
    super(name, "Collectors", faceImg);
  }
}

// Duchess
export class Duchess extends Collectors {
  constructor() {
    // const faceImg= new Image()
    const faceImg = new Image();
    faceImg.src = "../../assets/Kiss01.png";
    super("Duchess", faceImg);
    this.rule.en = "Duchess : Take 3 coins from the treasure";
    this.rule.fr = "Duchesse : Prend 3 pièces au trésor";
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {
    ActivePlayer.treasure += 3;
    return "treasure_player_3";
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
    const faceImg = new Image();
    faceImg.src = "../../assets/Sasha01.png";
    super("Assassin", faceImg);
    this.rule.en = "Assassin : Take 4 coins from the treasure";
    this.rule.fr = "Assassin : Prend 4 pièces au trésor";
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {
    ActivePlayer.treasure += 4;
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
    const faceImg = new Image();
    faceImg.src = "../../assets/Leo01.png";
    super("Pirate", faceImg);
    this.rule.en = "Pirate : Steals 2 coins from an opponent";
    this.rule.fr = "Pirate : Vole 2 pièces à un adversaire";
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {
    if (DefenderPlayers.treasure >= 2) {
      DefenderPlayers.treasure -= 2;
      ActivePlayer.treasure += 2;
      return "opponent_player_2";
    } else {
      return false;
    }
  }
}

// 4 - category collectors of Characters
export class Untouchables extends Characters {
  constructor(name, faceImg) {
    super(name, "Untouchables", faceImg);
  }
}

// Witch
export class Witch extends Untouchables {
  constructor() {
    const faceImg = new Image();
    faceImg.src = "../../assets/Hitsu01.png";
    super("Witch", faceImg);
    this.rule.en = "Witch : as duchess";
    this.rule.fr = "Sorcière : comme Duchesse";
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {
    ActivePlayer.treasure += 3;
  }
}

// 5 - category negociators of Characters
export class Negociators extends Characters {
  constructor(name, faceImg) {
    super(name, "Negociators", faceImg);
  }
}

// Witch
export class Spy extends Negociators {
  constructor() {
    const faceImg = new Image();
    faceImg.src = "../../assets/Uta01.png";
    super("Spy", faceImg);
    this.rule.en = "Take 3 coins from the treasure";
    this.rule.fr = "Prend 3 pièces au trésor";
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {
    ActivePlayer.treasure += 3;
  }
}
