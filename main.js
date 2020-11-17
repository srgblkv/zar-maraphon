// #1 ----------------------------------------------------------------------------
const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

const getRow = (firstRow, secondRow, char = 'а') => {
  const countCharFirstRow = countCharInRow(char, firstRow);
  const countCharSecondRow = countCharInRow(char, secondRow);

  return countCharFirstRow > countCharSecondRow ? firstRow : secondRow;
};

// подсчет количества необходимого символа в строке
const countCharInRow = (char, str) => {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === char) {
      count++;
    }
  }

  return count;
};

console.log(getRow(firstRow, secondRow));
// -------------------------------------------------------------------------------

// #1* ---------------------------------------------------------------------------
const firstUserRow = prompt('Введите первую строку:', firstRow);
const secondUserRow = prompt('Введите вторую строку:', secondRow);
const char = prompt('Введите символ который будем считать в строках', 'а');

alert(getRow(firstUserRow, secondUserRow, char));
// -------------------------------------------------------------------------------

//#2 -----------------------------------------------------------------------------
const phoneNumber = '+71234567890';

const formattedPhone = (phone) => {
  let formattedPhoneNumber = '';

  for (let i = 0; i < phone.length; i++) {
    if (i === 2) {
      formattedPhoneNumber += ' (';
    }
    if (i === 5) {
      formattedPhoneNumber += ') ';
    }
    if (i === 8 || i === 10) {
      formattedPhoneNumber += '-';
    }
    formattedPhoneNumber += phone.charAt(i);
  }

  return formattedPhoneNumber;
};
console.log(formattedPhone(phoneNumber));
// -------------------------------------------------------------------------------

//#2* ----------------------------------------------------------------------------
// проверка номера на корректность
const validatePhoneNumber = (phone) => {
  let correctPhoneNumber = '';

  if (phone.length === 12 && phone.charAt(0) === '+' && phone.charAt(1) === '7') {
    correctPhoneNumber = phone;
  } else if (phone.length === 11) {
    if (phone.charAt(0) === '7') {
      correctPhoneNumber = `+${phone}`;
    } else if (phone.charAt(0) === '8') {
      correctPhoneNumber = '+7';
      for (let i = 1; i < phone.length; i++) {
        correctPhoneNumber += phone.charAt(i);
      }
    }
  } else if (phone.length === 10) {
    correctPhoneNumber = `+7${phone}`;
  } else {
    return alert('Введены некорректные данные');
  }

  return correctPhoneNumber;
}

const userPhoneNumber = prompt('Введите номер телефона:', '');

alert(formattedPhone(validatePhoneNumber(userPhoneNumber)));
// -------------------------------------------------------------------------------