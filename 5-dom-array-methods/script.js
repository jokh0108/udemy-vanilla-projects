const rowsElement = document.querySelector('#jsRows');
const addButton = document.querySelector('#jsAdd');
const doubleButton = document.querySelector('#jsDouble');
const filterButton = document.querySelector('#jsFilter');
const sortButton = document.querySelector('#jsSort');
const sumButton = document.querySelector('#jsSum');

let people;

const addUser = async (count) => {
  const res = await fetch(`https://randomuser.me/api/?results=${count}`);
  const { results } = await res.json();
  return results.map(({ name: { first, last } }) => {
    return {
      name: `${first} ${last}`,
      wealth: Math.floor(10000 + Math.random() * 800000),
    };
  });
};

const createRow = (name, wealth) => {
  const rowElement = document.createElement('div');
  const nameElement = document.createElement('div');
  const moneyElement = document.createElement('div');

  nameElement.innerText = name;
  nameElement.classList.add('name');
  moneyElement.innerText = `$${wealth.toLocaleString()}.00`;
  moneyElement.classList.add('money');

  rowElement.appendChild(nameElement);
  rowElement.appendChild(moneyElement);
  rowElement.classList.add('row');
  return rowElement;
};

const createTotal = (total) => {
  const rowElement = document.createElement('div');
  const labelElement = document.createElement('label');
  const totalElement = document.createElement('div');

  labelElement.innerText = 'Total Wealth:';
  totalElement.innerText = `$${total.toLocaleString()}.00`;
  totalElement.classList.add('total');

  rowElement.appendChild(labelElement);
  rowElement.appendChild(totalElement);
  rowElement.classList.add('row');
  rowElement.classList.add('rows__total');
  return rowElement;
};

const showPeople = () => {
  rowsElement.innerHTML = '';
  people.forEach(({ name, wealth }) => {
    const row = createRow(name, wealth);
    rowsElement.appendChild(row);
  });
};

const addOneUser = async () => {
  const newUsers = await addUser(1);
  people = [...people, ...newUsers];
  showPeople();
};

const doubleWealth = () => {
  people = people.map(({ name, wealth }) => ({
    name,
    wealth: wealth * 2,
  }));
  showPeople();
};

const filterUser = () => {
  people = people.filter(({ wealth }) => wealth >= 1000000);
  showPeople();
};

const richestOrder = (a, b) => b.wealth - a.wealth;

const sortUser = () => {
  people = [...people].sort(richestOrder);
  showPeople();
};

const sumWealth = () => {
  if (rowsElement.querySelector('.rows__total')) {
    return;
  }
  const total = people.reduce((sum, { wealth }) => {
    return sum + wealth;
  }, 0);
  const totalElement = createTotal(total);
  rowsElement.appendChild(totalElement);
};

const init = async () => {
  people = await addUser(3);
  showPeople();
  addButton.addEventListener('click', addOneUser);
  doubleButton.addEventListener('click', doubleWealth);
  filterButton.addEventListener('click', filterUser);
  sortButton.addEventListener('click', sortUser);
  sumButton.addEventListener('click', sumWealth);
};

init();
