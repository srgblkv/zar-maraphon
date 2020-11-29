import Game from './src/classes/Game.js'
import { counterClick, randomNumber } from './src/modules/utils.js';
import { addLogNote } from './src/modules/log-generator.js';

const $elLogs = document.getElementById('logs');
const $elControl = document.querySelector('.control');

const createButton = (textContent, cb) => {
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.textContent = textContent;
  $btn.addEventListener('click', cb);
  $elControl.appendChild($btn);
};

const enemyAttack = () => {
  let { hp: { current }, attacks } = enemy;
  if (current > 0) {
    setTimeout(() => {
      const attack = attacks[randomNumber(attacks.length) - 1];
      const { minDamage, maxDamage } = attack;
      const dmg = randomNumber(maxDamage, minDamage);
      character.changeHP(dmg);
      if (character.hp.current <= 0) {
        renderBtn(true, true);
      }
      addLogNote(character, enemy, dmg, $elLogs);
    }, 300);
  }
};

const renderBtn = (startGame, endGame) => {
  const $allButtons = document.querySelectorAll('button');
  $allButtons.forEach(button => {
    button.remove();
  });

  if (startGame && !endGame) {
    character.attacks.forEach(item => {
      const { name, maxCount, maxDamage, minDamage } = item;
      const $btn = document.createElement('button');
      $btn.classList.add('button');
      $btn.textContent = `${name} [${minDamage} - ${maxDamage}]`;
      $elControl.appendChild($btn);

      const btnCounter = counterClick($btn, maxCount)
      $btn.addEventListener('click', () => {
        const dmg = randomNumber(maxDamage, minDamage);
        enemy.changeHP(dmg);
        addLogNote(enemy, character, dmg, $elLogs);
        btnCounter();
        if (enemy.hp.current > 0) {
          enemyAttack();
        } else {
          game.changeEnemy(character, enemy.name);
          enemy = game.enemy;
        }
      });
    });
  } else if (startGame && endGame) {
    createButton('Restart', () => {
      renderBtn(false);
      game.resetGame();
      character = game.character;
      enemy = game.enemy;
    });
  } else {
    createButton('Start game', () => {
      renderBtn(true);
    });
  }
};

let game = new Game();

let character = game.character;
let enemy = game.enemy;

renderBtn(false);
