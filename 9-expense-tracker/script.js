const balance = document.querySelector('#jsBalance');
const income = document.querySelector('#jsIncome');
const expense = document.querySelector('#jsExpense');
const textInput = document.querySelector('#jsTextInput');
const amountInput = document.querySelector('#jsAmountInput');
const addButton = document.querySelector('#jsAdd');
const historyElement = document.querySelector('#jsHistory');

console.log(balance, income, expense, textInput, amountInput, addButton);

let history;
// let transactions = [
//   { type: INCOME, value: 1 },
//   { type: EXPENSE, value: 1 },
// ];
let text;
let amount;

const onInputText = (event) => {
  text = event.target.value;
};

const onInputAmount = (event) => {
  amount = parseInt(event.target.value);
};

const isPositive = (value) => value >= 0;

const updateHistory = (text, amount) => {
  const deleteButton = document.createElement('div');
  deleteButton.innerText = 'X';
  deleteButton.classList.add('history__item__delete');
  deleteButton.classList.add('fade-in');

  const nameElement = document.createElement('div');
  nameElement.innerText = text;
  nameElement.classList.add('history__item__name');

  const amountElement = document.createElement('div');
  amountElement.innerText = isPositive(amount) ? `+${amount}` : amount;
  amountElement.classList.add('history__item__amount');

  const historyItem = document.createElement('div');
  historyItem.appendChild(deleteButton);
  historyItem.appendChild(nameElement);
  historyItem.appendChild(amountElement);
  historyItem.classList.add('history__item');
  historyItem.classList.add(
    `history__item-${isPositive(amount) ? 'income' : 'expense'}`
  );

  historyElement.appendChild(historyItem);
};

const clearInput = () => {
  textInput.value = '';
  amountInput.value = '';
  text = '';
  amonut = 0;
};

const onClick = (event) => {
  event.preventDefault();
  console.log('click');
  console.log(
    textInput.value || amountInput.value,
    textInput.value,
    amountInput.value
  );
  if (!textInput.value || !amountInput.value) {
    alert('Please add a text and amount');
    return;
  }
  console.log(text, amount);
  updateHistory(text, amount);
  clearInput();
};

const init = () => {
  textInput.addEventListener('input', onInputText);
  amountInput.addEventListener('input', onInputAmount);
  addButton.addEventListener('click', onClick);
};

init();
