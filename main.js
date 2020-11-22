const $btnThunderJolt = $getElById('btn-thunderjolt');
const $btnKick = $getElById('btn-kick');
const $divLogs = $getElById('logs');

const character = {
  name: 'Pikachu',
  defaultHP: 200,
  damagedHP: 200,
  healthStatus: $getElById('health-character'),
  healthBar: $getElById('progressbar-character'),
  changeHP,
  renderHP,
  renderHealthStatus,
  renderHealthBar
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damagedHP: 100,
  healthStatus: $getElById('health-enemy'),
  healthBar: $getElById('progressbar-enemy'),
  changeHP,
  renderHP,
  renderHealthStatus,
  renderHealthBar
};

function init() {
  addLogNote('<span class="bold">Start game</span>')
  character.renderHP();
  enemy.renderHP();
}

function $getElById(id) {
  return document.getElementById(id);
}

function renderHealthStatus() {
  const healthStatusText = `${this.damagedHP} / ${this.defaultHP}`
  this.healthStatus.innerText = healthStatusText;
  return healthStatusText;
}

function renderHealthBar() {
  const { defaultHP, damagedHP, healthBar } = this;
  const percentHP = damagedHP / (defaultHP / 100);


  if (percentHP > 80) {
    healthBar.style.background = 'lime';
  }
  if (percentHP > 20 && percentHP <= 80) {
    healthBar.style.background = 'yellow';
  }
  if (percentHP <= 20) {
    healthBar.style.background = 'red';
  }

  healthBar.style.width = `${percentHP}%`;
}

function renderHP() {
  this.renderHealthStatus();
  this.renderHealthBar();
}

function changeHP(count) {
  this.damagedHP -= count;
  const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
  addLogNote(log, this);

  if (this.damagedHP <= 0) {
    this.damagedHP = 0;

    $btnThunderJolt.disabled = true;
    $btnKick.disabled = true;

    addLogNote(`Бедный <span class="bold">${this.name}</span> проиграл бой!`);
  }
  this.renderHP();
}

function randomNumber(num) {
  return Math.ceil(Math.random() * num);
}

function enemyAttack() {
  if (enemy.damagedHP > 0) {
    setTimeout(() => {
      character.changeHP(randomNumber(20));
      $btnThunderJolt.disabled = false;
      $btnKick.disabled = false;
    }, 1000);
  }
}

$btnThunderJolt.addEventListener('click', () => {
  enemy.changeHP(randomNumber(20));

  $btnThunderJolt.disabled = true;
  $btnKick.disabled = true;

  enemyAttack();
});

$btnKick.addEventListener('click', () => {
  enemy.changeHP(randomNumber(10));
});

function generateLog(firstPerson, secondPerson, count) {
  const logs = [
    `<span class="bold">${firstPerson.name}</span> вспомнил что-то важное, но неожиданно <span class="bold">${secondPerson.name}</span>, не помня себя от испуга, ударил в предплечье врага.`,
    `<span class="bold">${firstPerson.name}</span> поперхнулся, и за это <span class="bold">${secondPerson.name}</span> с испугу приложил прямой удар коленом в лоб врага.`,
    `<span class="bold">${firstPerson.name}</span> забылся, но в это время наглый <span class="bold">${secondPerson.name}</span>, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `<span class="bold">${firstPerson.name}</span> пришел в себя, но неожиданно <span class="bold">${secondPerson.name}</span> случайно нанес мощнейший удар.`,
    `<span class="bold">${firstPerson.name}</span> поперхнулся, но в это время<span class="bold"> ${secondPerson.name}</span> нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `<span class="bold">${firstPerson.name}</span> удивился, а <span class="bold">${secondPerson.name}</span> пошатнувшись влепил подлый удар.`,
    `<span class="bold">${firstPerson.name}</span> высморкался, но неожиданно <span class="bold">${secondPerson.name}</span> провел дробящий удар.`,
    `<span class="bold">${firstPerson.name}</span> пошатнулся, и внезапно наглый <span class="bold">${secondPerson.name}</span> беспричинно ударил в ногу противника.`,
    `<span class="bold">${firstPerson.name}</span> расстроился, как вдруг, неожиданно <span class="bold">${secondPerson.name}</span> случайно влепил стопой в живот соперника.`,
    `<span class="bold">${firstPerson.name}</span> пытался что-то сказать, но вдруг, неожиданно <span class="bold">${secondPerson.name}</span> со скуки, разбил бровь сопернику.`
  ];

  return `${logs[randomNumber(logs.length - 1)]} <span class="bold">-${count} [${firstPerson.renderHealthStatus()}]</span>`;
}

function addLogNote(log, person) {
  const $p = document.createElement('p');
  $p.innerHTML = log;

  if (person === character) {
    $p.style = 'background: rgba(255, 0, 0, .5);';
  }
  if (person === enemy) {
    $p.style = 'background: rgba(0, 255, 0, .5);';
  }

  $divLogs.insertBefore($p, $divLogs.firstChild);
}

init();
