import Pokemon from '../classes/Pokemon.js';
import Request from '../classes/Request.js';
import { counterClick, randomNumber } from '../modules/utils.js';
import { addLogNote, removeAllLogs } from '../modules/log-generator.js';

class Selectors {
  constructor() {
    this.$elLogs = document.getElementById('logs');
    this.$elControl = document.querySelector('.control');
  }
}

class Game extends Selectors {
  constructor() {
    super();
    this.character;
    this.enemy;
  }

  startGame = async () => {
    this.pokemons = await new Request().getPokemons();
    this.character = await this.initCharacter();
    this.enemy = await this.initEnemy(this.character);
    this.renderBtn(false);
  }

  resetGame = () => {
    this.startGame();
    removeAllLogs();
  }

  initCharacter = async () => {
    return await new Pokemon({
      ...this.pokemons[randomNumber(this.pokemons.length) - 1],
      selectors: 'character'
    });
  }

  initEnemy = async (character, enemyName) => {
    let enemy;
    do {
      enemy = this.pokemons[randomNumber(this.pokemons.length) - 1];
    } while (enemy.name === character.name || enemy.name === enemyName);
    return await new Pokemon({
      ...enemy,
      selectors: 'enemy'
    });
  }

  changeEnemy = async () => {
    this.enemy = await this.initEnemy(this.character, this.enemy.name);
  }

  createButton = (textContent, cb) => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.textContent = textContent;
    $btn.addEventListener('click', cb);
    this.$elControl.appendChild($btn);
  }

  enemyAttack = (dmg) => {
    let { hp: { current } } = this.enemy;
    if (current > 0) {
      setTimeout(() => {
        this.character.changeHP(dmg);
        if (this.character.hp.current <= 0) {
          this.renderBtn(true, true);
        }
        addLogNote(this.character, this.enemy, dmg, this.$elLogs);
      }, 500);
    }
  }

  renderBtn = async (startGame, endGame) => {
    const $allButtons = document.querySelectorAll('button');
    $allButtons.forEach(button => {
      button.remove();
    });

    if (startGame && !endGame) {
      this.character.attacks.forEach(item => {
        const { id, name, maxCount, maxDamage, minDamage } = item;
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.textContent = `${name} [${minDamage} - ${maxDamage}]`;
        this.$elControl.appendChild($btn);
        const btnCounter = counterClick($btn, maxCount)
        $btn.addEventListener('click', async () => {
          const damageSkills = await new Request().getDamageSkills(this.character.id, id, this.enemy.id);
          const dmg = damageSkills.kick.player2;
          this.enemy.changeHP(dmg);
          addLogNote(this.enemy, this.character, dmg, this.$elLogs);
          btnCounter();
          if (this.enemy.hp.current > 0) {
            this.enemyAttack(damageSkills.kick.player1);
          } else {
            this.changeEnemy(this.character, this.enemy.name);
          }
          $allButtons.forEach(btn => {
            btn.disabled = true;
          })
        });
      });
    } else if (startGame && endGame) {
      this.createButton('Restart', () => {
        this.renderBtn(false);
        this.resetGame();
      });
    } else {
      this.createButton('Start game', () => {
        this.renderBtn(true);
      });
    }
  }
}

export default Game;
