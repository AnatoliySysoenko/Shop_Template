/** @format */

const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrise = 0;

const incrementCounter = (label, cn) => {
  const count = cn + 1;

  label.innerHTML = `${count}`;

  if (cartCounter === 1) {
    label.style.display = 'block';
  }
  return count;
};

const getMockData = (t) =>
  +t.parentElement.previousElementSibling.innerHTML.replace(
    /^\$(\d+)\s\D+(\d+).*$/g,
    '$1.$2'
  );

const getPrice = (t, prise) => Math.round((prise + getMockData(t)) * 100) / 100;

const disabledControls = (t, el, fn) => {
  t.disable = true;
  el.removeEventListener('click', fn);
};
const enabledControls = (t, el, fn) => {
  t.disable = true;
  el.addEventListener('click', fn);
};

const btnClickHandler = (e) => {
  const target = e.target;
  const inteval = 2000;
  let restoreHTML = null;

  if (typeof target !== 'object') console.error('target is not a object');

  if (target.matches('.item-actions__cart')) {
    cartCounter = incrementCounter(cartCounterLabel, cartCounter);

    cartPrise = getPrice(target, cartPrise);

    restoreHTML = target.innerHTML;

    target.innerHTML = `Added ${cartPrise.toFixed(2)} $`;

    disabledControls(target, contentContainer, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;

      enabledControls(target, contentContainer, btnClickHandler);
    }, inteval);
  }
};

contentContainer.addEventListener('click', btnClickHandler);
