class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors }) {
    super(selectors);
    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.renderHP();
  }

  renderHP = () => {
    this.renderHealthStatus();
    this.renderHealthBar();
  }

  renderHealthStatus = () => {
    const { elHP, hp: { current, total } } = this;
    const elHPText = `${current} / ${total}`;
    elHP.innerText = elHPText;
    return elHPText;
  }

  changeHP = (count, cb) => {
    this.hp.current -= count;
    if (this.hp.current <= 0) {
      this.hp.current = 0;

      console.log(`Бедный <span class="bold">${this.name}</span> проиграл бой!`);
    }
    this.renderHP();
    cb && cb(count);
  }

  renderHealthBar = () => {
    const { hp: { current, total }, elProgressbar } = this;
    const percentHP = current / (total / 100);
    if (percentHP > 80) {
      elProgressbar.style.background = 'lime';
    }
    if (percentHP > 20 && percentHP <= 80) {
      elProgressbar.style.background = 'yellow';
    }
    if (percentHP <= 20) {
      elProgressbar.style.background = 'red';
    }
    elProgressbar.style.width = `${percentHP}%`;
  }
}

export default Pokemon;