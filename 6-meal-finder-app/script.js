const searchField = document.querySelector('#jsSearchField');
const searchButton = document.querySelector('#jsSearchButton');
const randomButton = document.querySelector('#jsRandomButton');
const searchSection = document.querySelector('#jsSearchSection');
const mealElement = document.querySelector('#jsMeal');
const mainElement = document.querySelector('main');

const IMG_WIDTH = (IMG_HEIGHT = 175);
const MAX_INGREDIENTS = 20;

const MEAL_CLASSNAME = 'meal';
const MEAL_NAME_CLASSNAME = 'meal__name';
const MEAL_THUMBNAIL_CLASSNAME = 'meal__thumbnail';
const MEAL_FEATURES_CLASSNAME = 'meal__features';
const MEAL_CATEGORY_CLASSNAME = 'meal__features__category';
const MEAL_AREA_CLASSNAME = 'meal__features__area';
const MEAL_INSTRUCTIONS_CLASSNAME = 'meal__instructions';
const MEAL_INGREDIENTS_CLASSNAME = 'meal__ingredients';
const INGREDIENT_CLASSNAME = 'ingredient';
const FADEIN_CLASSNAME = 'fadeIn';
const RESULT_CLASSNAME = 'result';
const RESULTS_CLASSNAME = 'results';

const NO_RESULTS_MESSAGE = 'There are no search results. Try again!';
const ALERT_MESSAGE = 'Please enter a search term';

const INGREDIENTS_LABEL = 'Ingredients';

const RANDOM_API = 'https://www.themealdb.com/api/json/v1/1/random.php';

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
  const { strMeal, strCategory, strArea, strInstructions, strMealThumb } = meal;
  const ingredients = range(MAX_INGREDIENTS)
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

  const mealName = document.createElement('h2');
  mealName.innerText = strMeal;
  mealName.classList.add(MEAL_NAME_CLASSNAME);

  const mealThumbnail = new Image();
  mealThumbnail.src = strMealThumb;
  mealThumbnail.classList.add(MEAL_THUMBNAIL_CLASSNAME);

  const mealFeatures = document.createElement('div');
  mealFeatures.classList.add(MEAL_FEATURES_CLASSNAME);

  const mealCategory = document.createElement('div');
  mealCategory.innerText = strCategory;
  mealCategory.classList.add(MEAL_CATEGORY_CLASSNAME);

  const mealArea = document.createElement('div');
  mealArea.innerText = strArea;
  mealArea.classList.add(MEAL_AREA_CLASSNAME);

  mealFeatures.appendChild(mealCategory);
  mealFeatures.appendChild(mealArea);

  const mealInstructions = document.createElement('div');
  mealInstructions.innerText = strInstructions;
  mealInstructions.classList.add(MEAL_INSTRUCTIONS_CLASSNAME);

  const ingredientsLabel = document.createElement('h3');
  ingredientsLabel.innerText = INGREDIENTS_LABEL;

  const mealIngredients = document.createElement('div');
  mealIngredients.classList.add(MEAL_INGREDIENTS_CLASSNAME);

  ingredients.forEach((ingredient) => {
    const ingredientElement = document.createElement('div');
    ingredientElement.innerText = ingredient;
    ingredientElement.classList.add(INGREDIENT_CLASSNAME);
    mealIngredients.appendChild(ingredientElement);
  });

  mealElement.appendChild(mealName);
  mealElement.appendChild(mealThumbnail);
  mealElement.appendChild(mealFeatures);
  mealElement.appendChild(mealInstructions);
  mealElement.appendChild(ingredientsLabel);
  mealElement.appendChild(mealIngredients);

  mealElement.classList.add(MEAL_CLASSNAME);

  return mealElement;
};

const showMeal = (meal) => {
  mealElement.innerHTML = '';
  makeMealElment(meal);
};

const onClick = (event) => {
  const parentNode = event.target.parentNode;
  const meal = results.find((result) => result.idMeal === parentNode.id);
  showMeal(meal);
};

const makeResultLabel = (isEmpty, keyword) => {
  const label = document.createElement('h2');
  label.innerText = isEmpty
    ? NO_RESULTS_MESSAGE
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

    fadeInElement.classList.add(FADEIN_CLASSNAME);
    resultElement.classList.add(RESULT_CLASSNAME);

    resultElement.addEventListener('click', onClick);

    resultElement.appendChild(fadeInElement);
    resultElement.appendChild(image);
    resultsElement.appendChild(resultElement);
  });
  resultsElement.classList.add(RESULTS_CLASSNAME);
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
      alert(ALERT_MESSAGE);
      return;
    }
    results = await searchMeals(keyword);
    searchField.value = '';

    showResults(results, keyword);
  } catch (error) {
    console.log(error);
  }
};

const onShuffle = async () => {
  try {
    const res = await fetch(RANDOM_API);
    const { meals } = await res.json();
    searchSection.innerHTML = '';
    showMeal(meals[0]);
  } catch (error) {
    console.log(error);
  }
};

const init = async () => {
  searchField.addEventListener('keyup', onKeyup);
  searchButton.addEventListener('click', onSearch);
  randomButton.addEventListener('click', onShuffle);
};

init();
