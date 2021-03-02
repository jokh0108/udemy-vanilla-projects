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
let amounts;

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

const updateTotal = (amounts) => {
  const total = (amounts * rate[targetCurrency]).toFixed(2);
  targetNumber.value = total;
};

const showLoading = () => {
  exchange.innerText = 'loading...';
  // TODO: use const
};

const onBaseSelect = async (event) => {
  baseCurrency = event.target.value;
  showLoading();
  rate = await getExchangeRate(baseCurrency);
  updateExchange();
  updateTotal(amounts);
};

const onTargetSelect = (event) => {
  targetCurrency = event.target.value;
  updateExchange();
  updateTotal(amounts);
};

const swap = async () => {
  [baseSelect.value, targetSelect.value] = [
    targetSelect.value,
    baseSelect.value,
  ];
  baseCurrency = baseSelect.value;
  targetCurrency = targetSelect.value;
  showLoading();
  rate = await getExchangeRate(baseCurrency);
  updateExchange();
  updateTotal(amounts);
};

const onChange = () => {
  amounts = parseFloat(baseInput.value);
  updateTotal(amounts);
};

const init = async () => {
  baseCurrency = baseSelect.value;
  targetCurrency = targetSelect.value;
  amounts = parseFloat(baseInput.value);
  showLoading();
  rate = await getExchangeRate(baseCurrency);
  updateExchange();
  updateTotal(amounts);

  baseSelect.addEventListener('change', onBaseSelect);
  targetSelect.addEventListener('change', onTargetSelect);
  swapButton.addEventListener('click', swap);
  baseInput.addEventListener('input', onChange);
  // TODO: disable targetNumber change
};

init();
