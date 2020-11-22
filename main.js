const $btnThunderJolt = document.getElementById('btn-thunderjolt');
const $btnKick = document.getElementById('btn-kick');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damagedHP: 100,
  healthStatus: document.getElementById('health-character'),
  healthBar: document.getElementById('progressbar-character')
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damagedHP: 100,
  healthStatus: document.getElementById('health-enemy'),
  healthBar: document.getElementById('progressbar-enemy')
};

const init = () => {
  console.log('Start game');
  renderHP(character);
  renderHP(enemy);
};

const renderHealthStatus = (person) => {
  person.healthStatus.innerText = `${person.damagedHP} / ${person.defaultHP}`;
};

const renderHealthBar = (person) => {
  const { damagedHP, healthBar } = person;

  if (damagedHP > 60) {
    healthBar.style.background = 'lime';
  }
  if (damagedHP > 20 && damagedHP <= 60) {
    healthBar.style.background = 'yellow';
  }
  if (damagedHP <= 20) {
    healthBar.style.background = 'red';
  }
  healthBar.style.width = `${damagedHP}%`;
};

const renderHP = (person) => {
  renderHealthStatus(person);
  renderHealthBar(person);
};

const changeHP = (count, person) => {
  if (count > person.damagedHP) {
    person.damagedHP = 0;
    alert(`Бедный ${person.name} проиграл бой!`);
    $btnThunderJolt.disabled = true;
    $btnKick.disabled = true;
  } else {
    person.damagedHP -= count;
  }
  renderHP(person);
};

const randomNumber = (num) => {
  return Math.ceil(Math.random() * num);
}

$btnThunderJolt.addEventListener('click', () => {
  changeHP(randomNumber(20), character);
  changeHP(randomNumber(20), enemy);
});

$btnKick.addEventListener('click', () => {
  changeHP(randomNumber(10), enemy);
});

init();
