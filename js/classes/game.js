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
        action: (activePlayer, defenderPlayers, treasure, deck) => {
          activePlayer.treasure += 1;
        },
        state: true,
      },
      {
        text: "Murder : Pay 7 coins to assassinate an opponent.",
        action: (activePlayer, defenderPlayers, treasure, deck) => {
          activePlayer.treasure -= 7;
          defenderPlayers.cardToKill = true;
        },
        state: true,
      },
    ];
    this.deck = new Deck(collector, assassin, robber, untouchable, negociator);

    // add power of the characters' list
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
    this.computer = new Computer(
      "computer",
      this.deck.cardsList.splice(0, 1)[0],
      this.deck.cardsList.splice(0, 1)[0]
    );
  }
  /* 
  init() {
		this.background = new Background(
			"./assets/space.webp",
			this.canvas,
			this.ctx
		)
		for (const src of this.pokemonsSource) {
			this.pokemons.push(new Pokemon(src, this.ctx, this.canvas))
		}
		this.player = new Player("./assets/pokeball.png", this.ctx, this.canvas)
		this.createEventListeners()
	}
  start() {
    this.animateId = requestAnimationFrame(() => this.animate());
  }
  stop() {
    console.log(this.animateId);
    cancelAnimationFrame(this.animateId);
  }
  animate() {
    this.clear();
    this.handleBackground();
    for (const pokemon of this.pokemons) {
      this.handlePokemon(pokemon);
    }
    this.player.draw();
    for (const key in this.pressedKeys) {
      if (this.pressedKeys[key]) {
        this.player.move(key);
      }
    }

    this.animateId = requestAnimationFrame(() => this.animate());
  }

  handlePokemon(pokemon) {
    pokemon.outOfBound();
    if (pokemon.collideWithPlayer(this.player)) {
      this.stop();
      this.showEndScreen();
    }
    pokemon.move();
    pokemon.draw();
  }

  handleBackground() {
    this.background.draw();
    this.background.move();
  }
  createEventListeners() {
    document.addEventListener("keydown", (event) => {
      // console.log(event.key)
      switch (event.key) {
        case "ArrowRight":
          this.pressedKeys.right = true;
          break;
        case "ArrowLeft":
          this.pressedKeys.left = true;
          break;
        case "ArrowUp":
          this.pressedKeys.up = true;
          break;
        case "ArrowDown":
          this.pressedKeys.down = true;
          break;
      }
    });
    document.addEventListener("keyup", (event) => {
      // console.log(event.key)
      switch (event.key) {
        case "ArrowRight":
          this.pressedKeys.right = false;
          break;
        case "ArrowLeft":
          this.pressedKeys.left = false;
          break;
        case "ArrowUp":
          this.pressedKeys.up = false;
          break;
        case "ArrowDown":
          this.pressedKeys.down = false;
          break;
      }
    });
  }
  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  showEndScreen() {
    const modal = document.getElementById("modal");
    modal.showModal();
  } */
}

export class Deck {
  constructor(collector, assassin, robber, untouchable, negociator) {
    this.characters = {};
    this.characters.collector = collector;
    this.characters.assassin = assassin;
    this.characters.robber = robber;
    this.characters.untouchable = untouchable;
    this.characters.negociator = negociator;
    this.cardNumber = 3;
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
