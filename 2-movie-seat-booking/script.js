const movieSelect = document.querySelector("#jsMovie");
const seatElements = document.querySelectorAll("#jsSeat");
const countElement = document.querySelector("#count");
const totalElement = document.querySelector("#total");

const DEFAULT_PRICE = 10;

const SELECTED_CLASS = "selected";
const SELECTED_ATTRIBUTE = "selected";
const NA_CLASS = "na";

let count = 0;
let price = DEFAULT_PRICE;

const onMovieSelect = (event) => {
  price = parseInt(event.target.value);
  updateTotal();
};

const isSelected = (seatElement) =>
  seatElement.hasAttribute(SELECTED_ATTRIBUTE);

const toggleSelect = (seatElement) => {
  if (isSelected(seatElement)) {
    seatElement.removeAttribute(SELECTED_ATTRIBUTE);
    seatElement.classList.replace(SELECTED_CLASS, NA_CLASS);
  } else {
    seatElement.setAttribute(SELECTED_ATTRIBUTE, "");
    seatElement.classList.replace(NA_CLASS, SELECTED_CLASS);
  }
};

const updateCount = (selected) => {
  count = selected ? count + 1 : count - 1;
  countElement.innerText = count;
};

const updateTotal = () => {
  totalElement.innerText = count * price;
};

const onClick = (event) => {
  const selectedSeat = event.target;
  toggleSelect(selectedSeat);
  const selected = isSelected(selectedSeat);
  updateCount(selected);
  updateTotal();
};

const init = () => {
  movieSelect.addEventListener("change", onMovieSelect);
  seatElements.forEach((seat) => {
    seat.addEventListener("click", onClick);
  });
};

init();
