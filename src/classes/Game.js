import Pokemon from '../classes/Pokemon.js';
import { randomNumber } from '../modules/utils.js';
import { pokemons } from '../data/pokemons.js';

class Game {
  constructor() {
    this.character, 
    this.enemy,
    this.startGame()
  }

  startGame = () => {
    this.character = this.initCharacter();
    this.enemy = this.initEnemy(this.character);
  };

  resetGame = () => {
    this.startGame();
  };

  initCharacter = () => {
    return new Pokemon({
      ...pokemons[randomNumber(pokemons.length) - 1],
      selectors: 'character',
    });
  };

  initEnemy = (character, enemyName) => {
    let enemy;
    // проверка что-бы персонажы не повторялись
    do {
      enemy = pokemons[randomNumber(pokemons.length) - 1];
    } while (enemy.name === character.name || enemy.name === enemyName);

    return new Pokemon({
      ...enemy,
      selectors: 'enemy'
    });
  };

  changeEnemy = () => {
    this.enemy = this.initEnemy(this.character, this.enemy.name);
  };
}

export default Game;