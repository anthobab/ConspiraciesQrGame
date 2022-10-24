import { Character, Collector } from "./character";
import Computer from "./computer";
import Player from "./player";

export class Game {
  constructor(collector, assassin, robber, untouchable, negociator) {
    this.computer = new Computer();
    this.player = new Player();
    this.end = false;
    this.winner = null;
    this.characterList = [
      "collector",
      "assassin",
      "robber",
      "untouchable",
      "negociator",
    ];
    this.log = "The Game begins : \n";
    this.choices = {};
    this.deck = new Deck(collector, assassin, robber, untouchable, negociator);
    this.init();
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
    this.characters.collector = collector;
    this.characters.assassin = assassin;
    this.characters.robber = robber;
    this.characters.untouchable = untouchable;
    this.characters.negociator = negociator;
    this.cardNumber = 3;
    this.init();
  }
  init() {
    // add cardNumber cards of each character :
    this.character.forEach((element) => {});
  }
}
