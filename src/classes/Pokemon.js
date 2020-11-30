class Selectors {
  constructor(name) {
    this.elImg = document.getElementById(`sprite-${name}`)
    this.elName = document.getElementById(`name-${name}`);
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, attacks, img, selectors }) {
    super(selectors);
    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.attacks = attacks;
    this.img = img;
    this.renderHP();
    this.renderName();
    this.renderImg();
  }

  renderName = () => {
    const { elName } = this;
    elName.textContent = this.name;
  }

  renderImg = () => {
    const { elImg } = this;
    elImg.src = `${this.img}`
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
    }
    this.renderHP();
    cb && cb(count);
  }

  renderHealthBar = () => {
    const { hp: { current, total }, elProgressbar } = this;
    const percentHP = current / (total / 100);

    if (percentHP > 20 && percentHP < 60) {
      elProgressbar.classList.add('low');
    }
    else if (percentHP <= 20) {
      elProgressbar.classList.add('critical');
    } else {
      elProgressbar.classList.remove('critical', 'low');
    }
    elProgressbar.style.width = `${percentHP}%`;
  }
}

export default Pokemon;
