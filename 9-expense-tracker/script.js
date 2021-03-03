const balanceElement = document.querySelector('#jsBalance');
const incomeElement = document.querySelector('#jsIncome');
const expenseElement = document.querySelector('#jsExpense');
const textInput = document.querySelector('#jsTextInput');
const amountInput = document.querySelector('#jsAmountInput');
const addButton = document.querySelector('#jsAdd');
const historyElement = document.querySelector('#jsHistory');

const TYPE = Object.freeze({
  INCOME: 'income',
  EXPENSE: 'expense',
});

const generateRandom = () => Math.random().toString(36).substr(2, 10);

let transactions = [];

let text;
let amount;

//TODO: use contatns

const saveTransactions = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const addTransaction = (text, amount) => {
  transactions = [
    ...transactions,
    {
      id: generateRandom(),
      type: isPositive(amount) ? TYPE.INCOME : TYPE.EXPENSE,
      amount,
      text,
    },
  ];
  saveTransactions();
};

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  saveTransactions();
};

const isPositive = (value) => value >= 0;

const renderApp = () => {
  renderBalance();
  renderTotal();
  renderHistory();
};

const renderBalance = () => {
  const balance = transactions.reduce((sum, { amount }) => sum + amount, 0);
  balanceElement.innerText = `$${balance.toFixed(2)}`;
};

const renderTotal = () => {
  const income = transactions
    .filter((transaction) => transaction.type === TYPE.INCOME)
    .reduce((sum, { amount }) => sum + amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.type === TYPE.EXPENSE)
    .reduce((sum, { amount }) => sum + amount, 0);
  incomeElement.innerText = `$${income.toFixed(2)}`;
  expenseElement.innerText = `$${(-expense).toFixed(2)}`;
};

const renderHistory = () => {
  historyElement.innerHTML = '';
  transactions.forEach(({ id, type, amount, text }) => {
    const deleteButton = document.createElement('div');
    deleteButton.innerText = 'X';
    deleteButton.classList.add('history__item__delete');
    deleteButton.addEventListener('click', onDelete);

    const nameElement = document.createElement('div');
    nameElement.innerText = text;
    nameElement.classList.add('history__item__name');

    const amountElement = document.createElement('div');
    amountElement.innerText = type === TYPE.INCOME ? `+${amount}` : amount;
    amountElement.classList.add('history__item__amount');

    const historyItem = document.createElement('div');
    historyItem.appendChild(deleteButton);
    historyItem.appendChild(nameElement);
    historyItem.appendChild(amountElement);
    historyItem.classList.add('history__item');
    historyItem.classList.add(`history__item-${type}`);
    historyItem.id = id;

    historyElement.appendChild(historyItem);
  });
};

const clearInput = () => {
  textInput.value = '';
  amountInput.value = '';
  text = '';
  amonut = 0;
};

const onDelete = (event) => {
  const parentNode = event.target.parentNode;
  removeTransaction(parentNode.id);
  renderApp();
};

const onClick = (event) => {
  event.preventDefault();
  if (!textInput.value || !amountInput.value) {
    alert('Please add a text and amount');
    return;
  }
  addTransaction(text, amount);
  renderApp();
  clearInput();
};

const onTextInput = (event) => {
  text = event.target.value;
};

const onAmountInput = (event) => {
  amount = parseInt(event.target.value);
};

const init = () => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if (savedTransactions) {
    transactions = savedTransactions;
  }
  renderApp();
  textInput.addEventListener('input', onTextInput);
  amountInput.addEventListener('input', onAmountInput);
  addButton.addEventListener('click', onClick);
};

init();
