import { randomNumber } from './utils.js';

const generateLog = (defendingPerson, attackingPerson, count) => {
  const logs = [
    `<span class="bold">${defendingPerson.name}</span> вспомнил что-то важное, но неожиданно <span class="bold">${attackingPerson.name}</span>, не помня себя от испуга, ударил в предплечье врага.`,
    `<span class="bold">${defendingPerson.name}</span> поперхнулся, и за это <span class="bold">${attackingPerson.name}</span> с испугу приложил прямой удар коленом в лоб врага.`,
    `<span class="bold">${defendingPerson.name}</span> забылся, но в это время наглый <span class="bold">${attackingPerson.name}</span>, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `<span class="bold">${defendingPerson.name}</span> пришел в себя, но неожиданно <span class="bold">${attackingPerson.name}</span> случайно нанес мощнейший удар.`,
    `<span class="bold">${defendingPerson.name}</span> поперхнулся, но в это время<span class="bold"> ${attackingPerson.name}</span> нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `<span class="bold">${defendingPerson.name}</span> удивился, а <span class="bold">${attackingPerson.name}</span> пошатнувшись влепил подлый удар.`,
    `<span class="bold">${defendingPerson.name}</span> высморкался, но неожиданно <span class="bold">${attackingPerson.name}</span> провел дробящий удар.`,
    `<span class="bold">${defendingPerson.name}</span> пошатнулся, и внезапно наглый <span class="bold">${attackingPerson.name}</span> беспричинно ударил в ногу противника.`,
    `<span class="bold">${defendingPerson.name}</span> расстроился, как вдруг, неожиданно <span class="bold">${attackingPerson.name}</span> случайно влепил стопой в живот соперника.`,
    `<span class="bold">${defendingPerson.name}</span> пытался что-то сказать, но вдруг, неожиданно <span class="bold">${attackingPerson.name}</span> со скуки, разбил бровь сопернику.`
  ];

  return `${logs[randomNumber(logs.length - 1)]} <span class="bold">-${count} [${defendingPerson.renderHealthStatus()}]</span>`;
}

export const addLogNote = (defendingPerson, attackingPerson, count, el) => {
  const $p = document.createElement('p');
  $p.innerHTML = generateLog(defendingPerson, attackingPerson, count);
  el.insertBefore($p, el.firstChild);
}