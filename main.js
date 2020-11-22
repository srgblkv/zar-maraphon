const $getElById = (id) => {
  return document.getElementById(id);
};

const $btnThunderJolt = $getElById('btn-thunderjolt');
const $btnKick = $getElById('btn-kick');

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
  console.log('Start game');
  character.renderHP();
  enemy.renderHP();
};

function renderHealthStatus() {
  const healthStatusText = `${this.damagedHP} / ${this.defaultHP}`
  this.healthStatus.innerText = healthStatusText;
  return healthStatusText;
};

function renderHealthBar() {
  const { defaultHP, damagedHP, healthBar } = this;
  const percentHP = damagedHP / (defaultHP / 100); 
  console.log(percentHP);


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
};

function renderHP() {
  this.renderHealthStatus();
  this.renderHealthBar();
};

function changeHP(count) {
  this.damagedHP -= count;
  const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
  console.log(log)

  if (this.damagedHP <= 0) {
    this.damagedHP = 0;

    $btnThunderJolt.disabled = true;
    $btnKick.disabled = true;

    alert(`Бедный ${this.name} проиграл бой!`);
  }
  this.renderHP();
};

function randomNumber(num) {
  return Math.ceil(Math.random() * num);
}

function enemyAttack() {
  console.log('...ожидаем ход противника.');
  setTimeout(() => {
    character.changeHP(randomNumber(20));
    $btnThunderJolt.disabled = false;
    $btnKick.disabled = false;
  }, 1000);
};

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
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага.`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага.`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника.`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.`
  ]

  return `${logs[randomNumber(logs.length - 1)]} -${count} ${firstPerson.renderHealthStatus()}`;
};

init();
