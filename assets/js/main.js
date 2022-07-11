/** @format */

const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrise = 0;

const incrementCounter = (label, cn) => {
  const counter = cn + 1;

  cartCounterLabel.innerHTML = `${counter}`;
  if (cartCounter === 1) {
    cartCounterLabel.style.display = 'block';
  }
  return counter;
};

const getMockData = (target) =>
  +target.parentElement.previousElementSibling.innerHTML.replace(
    /^\$(\d+)\s\D+(\d+).*$/g,
    '$1.$2'
  );

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const disableControls = (t, el, fn) => {
  t.disabled = true;
  el.removeEventListener('click', fn);
};
const enableControls = (t, el, fn) => {
  t.disabled = false;
  el.addEventListener('click', fn);
};

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;
  let restoreHtml = target.innerHTML;

  if (typeof target !== 'object') {
    return;
  }

  const mock = getMockData(target);

  if (target.matches('.item-actions__cart')) {
    cartCounter = incrementCounter(cartCounterLabel, cartCounter);
  }

  cartPrise = getPrice(target, cartPrise);

  disableControls(target, contentContainer, btnClickHandler);

  restoreHtml = target.innerHTML;

  target.innerHTML = `Added ${cartPrise.toFixed(2)}$`;

  setTimeout(() => {
    target.innerHTML = restoreHtml;
    enableControls(target, contentContainer, btnClickHandler);
  }, interval);
};

contentContainer.addEventListener('click', btnClickHandler);
