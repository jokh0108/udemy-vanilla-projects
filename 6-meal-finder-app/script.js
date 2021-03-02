const searchField = document.querySelector('#jsSearchField');
const searchButton = document.querySelector('#jsSearchButton');
const randomButton = document.querySelector('#jsRandomButton');
const searchSection = document.querySelector('#jsSearchSection');
const mainElement = document.querySelector('main');

const IMG_WIDTH = (IMG_HEIGHT = 175);

let results = [];

const onKeyup = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
};

const searchMeals = async (keyword) => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`
    );
    const { meals } = await res.json();
    return meals || [];
  } catch (error) {
    console.log(error);
  }
};

const range = (n) => [...Array(n).keys()];

const isEmpty = (array) => array.length <= 0;

const makeMealElment = (meal) => {
  const mealElement = document.createElement('div');
  const { strMeal, strCategory, strArea, strInstructions, strMealThumb } = meal;
  const ingredients = range(20)
    .map((i) => {
      const {
        [`strIngredient${i + 1}`]: ingredient,
        [`strMeasure${i + 1}`]: measure,
      } = meal;
      if (!ingredient || !measure) {
        return null;
      }
      return `${ingredient} - ${measure}`.trim();
    })
    .filter((ingredient) => Boolean(ingredient));

  console.log(ingredients);

  const mealName = document.createElement('h2');
  mealName.innerText = strMeal;
  mealName.classList.add('meal__name');

  const mealThumbnail = new Image();
  mealThumbnail.src = strMealThumb;
  mealThumbnail.classList.add('meal__thumbnail');

  const mealFeatures = document.createElement('div');
  mealFeatures.classList.add('meal__features');

  const mealCategory = document.createElement('div');
  mealCategory.innerText = strCategory;
  mealCategory.classList.add('meal__features__category');

  const mealArea = document.createElement('div');
  mealArea.innerText = strArea;
  mealArea.classList.add('meal__features__area');

  mealFeatures.appendChild(mealCategory);
  mealFeatures.appendChild(mealArea);

  const mealInstructions = document.createElement('div');
  mealInstructions.innerText = strInstructions;
  mealInstructions.classList.add('meal__instructions');

  const ingredientsLabel = document.createElement('h3');
  ingredientsLabel.innerText = 'Ingredients';

  const mealIngredients = document.createElement('div');
  mealIngredients.classList.add('meal__instructions');

  ingredients.forEach((ingredient) => {
    const ingredientElement = document.createElement('div');
    ingredientElement.innerText = ingredient;
    ingredientElement.classList.add('ingredient');
    mealIngredients.appendChild(ingredientElement);
  });

  mealElement.appendChild(mealName);
  mealElement.appendChild(mealThumbnail);
  mealElement.appendChild(mealFeatures);
  mealElement.appendChild(mealInstructions);
  mealElement.appendChild(ingredientsLabel);
  mealElement.appendChild(mealIngredients);

  mealElement.classList.add('meal');

  return mealElement;
};

const showMeal = (meal) => {
  const oldMealElement = mainElement.querySelector('.meal');
  console.log(oldMealElement);
  if (oldMealElement) {
    mainElement.removeChild(oldMealElement);
  }
  const mealElement = makeMealElment(meal);
  console.log(mealElement);
  mainElement.appendChild(mealElement);
};

const onClick = (event) => {
  const parentNode = event.target.parentNode;
  const meal = results.find((result) => result.idMeal === parentNode.id);
  showMeal(meal);
};

const makeResultLabel = (isEmpty, keyword) => {
  const label = document.createElement('h2');
  label.innerText = isEmpty
    ? 'There are no search results. Try again!'
    : `Search results for '${keyword}':`;
  return label;
};

const makeResultsElement = () => {
  const resultsElement = document.createElement('div');

  results.forEach(({ idMeal, strMeal, strMealThumb }) => {
    const resultElement = document.createElement('div');
    const fadeInElement = document.createElement('div');
    const image = new Image(IMG_WIDTH, IMG_HEIGHT);

    image.src = strMealThumb;
    fadeInElement.innerText = strMeal;
    resultElement.id = idMeal;

    fadeInElement.classList.add('fadeIn');
    resultElement.classList.add('result');

    resultElement.addEventListener('click', onClick);

    resultElement.appendChild(fadeInElement);
    resultElement.appendChild(image);
    resultsElement.appendChild(resultElement);
  });
  resultsElement.classList.add('results');
  return resultsElement;
};

const showResults = (results, keyword) => {
  searchSection.innerHTML = '';
  const label = makeResultLabel(isEmpty(results), keyword);
  const resultsElement = makeResultsElement();

  searchSection.appendChild(label);
  searchSection.appendChild(resultsElement);
};

const onSearch = async () => {
  try {
    const keyword = searchField.value;
    if (!keyword) {
      alert('Please enter a search term');
      return;
    }
    results = await searchMeals(keyword);
    searchField.value = '';

    showResults(results, keyword);
  } catch (error) {
    console.log(error);
  }
};

const init = async () => {
  searchField.addEventListener('keyup', onKeyup);
  searchButton.addEventListener('click', onSearch);
  // TODO: activate random button
};

init();
