const movieSelect = document.querySelector("#jsMovie");
const countElement = document.querySelector("#count");
const totalElement = document.querySelector("#total");
const seatElements = Array.from(document.querySelectorAll("#jsSeat"));

const SELECTED_CLASS = "selected";
const SELECTED_ATTRIBUTE = "selected";
const NA_CLASS = "na";

const PRICE_KEY = "price";
const SELECTED_SEATS_KEY = "selectedSeats";

const DEFAULT_PRICE = 10;

let price = DEFAULT_PRICE;
let selectedIndexSet = new Set();
let count = 0;

const savePrice = (price) => {
  localStorage.setItem(PRICE_KEY, price);
};

const saveIndexSet = () => {
  localStorage.setItem(
    SELECTED_SEATS_KEY,
    JSON.stringify(Array.from(selectedIndexSet))
  );
};

const updateCount = () => {
  count = selectedIndexSet.size;
  countElement.innerText = count;
};

const updateTotal = () => (totalElement.innerText = count * price);

const updateIndexSet = (seatElement, selected) => {
  const seatIndex = seatElements.indexOf(seatElement);
  if (selected) {
    selectedIndexSet.delete(seatIndex);
  } else {
    selectedIndexSet.add(seatIndex);
  }
  saveIndexSet();
};

const onClick = (event) => {
  const clickedSeat = event.target;
  const selected = clickedSeat.hasAttribute(SELECTED_ATTRIBUTE);
  toggleSeat(clickedSeat, selected);
  updateIndexSet(clickedSeat, selected);
  updateCount();
  updateTotal();
};

const onMovieSelect = (event) => {
  price = parseInt(event.target.value);
  savePrice(price);
  updateTotal();
};

const loadPrice = () => {
  const savedPrice = localStorage.getItem(PRICE_KEY);
  if (!savedPrice) return;

  price = savedPrice;
  const selectedOption = movieSelect.querySelector(`option[value="${price}"]`);
  selectedOption.setAttribute(SELECTED_ATTRIBUTE, "");
};

const toggleSeat = (seatElement, selected) => {
  if (selected) {
    seatElement.removeAttribute(SELECTED_ATTRIBUTE);
    seatElement.classList.replace(SELECTED_CLASS, NA_CLASS);
  } else {
    seatElement.setAttribute(SELECTED_ATTRIBUTE, "");
    seatElement.classList.replace(NA_CLASS, SELECTED_CLASS);
  }
};

const loadSeats = () => {
  const savedIndexSet = new Set(
    JSON.parse(localStorage.getItem(SELECTED_SEATS_KEY))
  );
  if (!savedIndexSet) return;

  seatElements.forEach((seat, index) => {
    if (savedIndexSet.has(index)) {
      toggleSeat(seat);
    }
  });
  selectedIndexSet = savedIndexSet;
  updateCount();
  updateTotal();
};

const init = () => {
  loadPrice();
  loadSeats();
  movieSelect.addEventListener("change", onMovieSelect);
  seatElements.forEach((seat) => {
    seat.addEventListener("click", onClick);
  });
};

init();
