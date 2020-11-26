export const randomNumber = (max, min = 0) => {
  const num = max - min;
  return Math.ceil(Math.random() * num) + min;
}

export const counterClick = (el, count = 6) => {
  const innerText = el.innerText;
  el.innerText = `${innerText} (${count})`;
  return () => {
    count--;
    if (count === 0) {
      el.disabled = true;
    }
    el.innerText = `${innerText} (${count})`;
    return count;
  }
}