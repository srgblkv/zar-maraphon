import Pokemon from './src/classes/Pokemon.js';
import { counterClick, randomNumber } from './src/modules/utils.js';
import { addLogNote } from './src/modules/log-generator.js';
import { pokemons } from './src/data/pokemons.js';

const $elLogs = document.getElementById('logs');
const $elControl = document.querySelector('.control');

// функции для инициализации персонажей
const initCharacter = () => {
  return new Pokemon({
    ...pokemons[randomNumber(pokemons.length) - 1],
    selectors: 'character',
  });
};

const initEnemy = (character, enemyName) => {
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
// ----------------------------------------
// атака врага 
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
// -------------------------------------------

// рендер кнопок вместо startGame
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
          enemy = initEnemy(character, enemy.name);
        }
      });
    });
  } else if (startGame && endGame) {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.textContent = 'Restart';
    $btn.addEventListener('click', () => {
      renderBtn(false);
      // переинициализация персонажей
      character = initCharacter();
      enemy = initEnemy(character);
    })
    $elControl.appendChild($btn);
  } else {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.textContent = 'Start game';
    $btn.addEventListener('click', () => {
      renderBtn(true);
    });
    $elControl.appendChild($btn);
  }
};
// -------------------------------------------------------

// инициализация персонажей
let character = initCharacter();
let enemy = initEnemy(character);
// startGame
renderBtn(false);
