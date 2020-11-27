import Pokemon from './src/classes/Pokemon.js';

import { randomNumber, counterClick } from './src/modules/utils.js';
import { addLogNote } from './src/modules/log-generator.js';

const $btnThunderJolt = document.getElementById('btn-thunderjolt');
const $btnKick = document.getElementById('btn-kick');
const $divLogs = document.getElementById('logs');

const character = new Pokemon({
  name: 'Pikachu',
  type: 'electric',
  hp: 500,
  selectors: 'character'
})

const enemy = new Pokemon({
  name: 'Charmander',
  type: 'fire',
  hp: 450,
  selectors: 'enemy'
})

const counterBtnThunderJolt = counterClick($btnThunderJolt);
const counterBtnKick = counterClick($btnKick, 10);

$btnThunderJolt.addEventListener('click', () => {
  const count = randomNumber(40, 20);
  enemy.changeHP(count);
  addLogNote(enemy, character, count, $divLogs);
  counterBtnThunderJolt();
  enemyAttack();
});

$btnKick.addEventListener('click', () => {
  const count = randomNumber(10);
  enemy.changeHP(count);
  addLogNote(enemy, character, count, $divLogs);
  counterBtnKick();
});

function enemyAttack() {
  if (enemy.hp.current > 0) {
    setTimeout(() => {
      const count = randomNumber(60)
      character.changeHP(count);
      addLogNote(character, enemy, count, $divLogs);
    }, 300);
  }
}
