// 5 Categories of Characters : [collectors, assassins, robbers, untouchables, negociators]
// with each 3 possible Character. First step : 1 character for each category.

export class Characters {
  faceVisible = false;
  constructor(name, category, faceImg) {
    this.name = name;
    this.category = category;
    this.faceImg = faceImg;
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {}
}

// 1 - category collectors of Characters
export class Collectors extends Characters {
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
  }
}

// Duchess
export class Duchess extends Collectors {
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
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
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
  }
}

// Assasin
export class Assassin extends Assassins {
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
    this.rule.en = "Assassin : Take 4 coins from the treasure";
    this.rule.fr = "Assassin : Prend 4 pièces au trésor";
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {
    ActivePlayer.treasure += 4;
  }
}

// 3 - category Robbers of Characters
export class Robbers extends Characters {
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
  }
}

// Pirate
export class Pirate extends Robbers {
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
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
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
  }
}

// Witch
export class Witch extends Untouchables {
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
    this.rule.en = "Witch : as duchess";
    this.rule.fr = "Sorcière : comme Duchesse";
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {
    ActivePlayer.treasure += 3;
  }
}

// 5 - category negociators of Characters
export class Negociators extends Characters {
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
  }
}

// Witch
export class Spy extends Negociators {
  constructor(name, category, faceImg) {
    super(name, category, faceImg);
    this.rule.en = "Take 3 coins from the treasure";
    this.rule.fr = "Prend 3 pièces au trésor";
  }
  action(ActivePlayer, DefenderPlayers, treasure, deck) {
    ActivePlayer.treasure += 3;
  }
}
