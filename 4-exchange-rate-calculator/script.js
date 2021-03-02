const baseSelect = document.querySelector('#jsBase');
const targetSelect = document.querySelector('#jsTarget');
const swapButton = document.querySelector('#jsSwap');
const exchange = document.querySelector('#jsExchange');
const baseInput = document.querySelector('#jsBaseInput');
const targetNumber = document.querySelector('#jsTargetNumber');

const API_KEY = 'd6c5edaf7b49fcfe8528d869';

let rate;
let baseCurrency;
let targetCurrency;
let loading = false;

const getExchangeRate = async (currency) => {
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`
    );
    const data = await res.json();
    return data.conversion_rates;
  } catch (error) {
    console.error(error);
  }
};

const updateExchange = () => {
  exchange.innerText = `1 ${baseCurrency} = ${rate[targetCurrency]} ${targetCurrency}`;
};

const showLoading = () => {
  exchange.innerText = 'loading...';
};

const onBaseSelect = async (event) => {
  baseCurrency = event.target.value;
  showLoading();
  rate = await getExchangeRate(baseCurrency);
  updateExchange();
};

const onTargetSelect = (event) => {
  targetCurrency = event.target.value;
  updateExchange();
};

const onClick = async () => {
  [baseSelect.value, targetSelect.value] = [
    targetSelect.value,
    baseSelect.value,
  ];
  baseCurrency = baseSelect.value;
  targetCurrency = targetSelect.value;
  rate = await getExchangeRate(baseCurrency);
  showLoading();
  updateExchange();
};

const onChange = (event) => {
  const amounts = parseFloat(event.target.value);
  // TODO: change targetNumber
};

const init = async () => {
  baseCurrency = baseSelect.value;
  targetCurrency = targetSelect.value;
  showLoading();
  rate = await getExchangeRate(baseCurrency);
  updateExchange();

  baseSelect.addEventListener('change', onBaseSelect);
  targetSelect.addEventListener('change', onTargetSelect);
  swapButton.addEventListener('click', onClick);
  baseInput.addEventListener('input', onChange);
};

init();
