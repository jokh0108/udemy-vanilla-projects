const submit = document.querySelector("#jsSubmit");
const usernameInput = document.querySelector("#jsUsername");
const emailInput = document.querySelector("#jsEmail");
const passwordInput = document.querySelector("#jsPassword");
const confirmInput = document.querySelector("#jsConfirm");
const usernameError = document.querySelector("#jsUsernameError");
const emailError = document.querySelector("#jsEmailError");
const passwordError = document.querySelector("#jsPasswordError");
const confirmError = document.querySelector("#jsConfirmError");

const MIN_USERNAME = 3;
const MAX_USERNAME = 15;
const MIN_PASSWORD = 6;
const MAX_PASSWORD = 25;
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const LENGTH_STATUS = Object.freeze({
  TOO_SHORT: "short",
  TOO_LONG: "long",
  ENOUGH: "enough",
});

const checkLength = (string, min, max) => {
  if (string.length < min) {
    return LENGTH_STATUS.TOO_SHORT;
  }
  if (string.length >= max) {
    return LENGTH_STATUS.TOO_LONG;
  }
  return LENGTH_STATUS.ENOUGH;
};

const checkEmail = (email) => {
  const regex = new RegExp(EMAIL_REGEX);
  if (regex.test(email)) {
    return true;
  }
  return false;
};

const checkRequired = (inputValue) => {
  console.log(inputValue, Boolean(inputValue));
  return Boolean(inputValue);
};

const checkPasswordsMatch = (password1, password2) => {
  return password1 === password2;
};

const showError = (inputElement, errorElement) => {
  inputElement.classList.remove("normal");
  inputElement.classList.remove("success");
  inputElement.classList.add("error");
  errorElement.classList.replace("invisible", "visible");
};

const showSuccess = (inputElement, errorElement) => {
  inputElement.classList.remove("normal");
  inputElement.classList.remove("error");
  inputElement.classList.add("success");
  errorElement.classList.replace("visible", "invisible");
};

const onSubmit = (event) => {
  event.preventDefault();

  const usernameStatus = checkLength(
    usernameInput.value,
    MIN_USERNAME,
    MAX_USERNAME
  );
  switch (usernameStatus) {
    case LENGTH_STATUS.ENOUGH:
      showSuccess(usernameInput, usernameError);
      break;
    case LENGTH_STATUS.TOO_SHORT:
      usernameError.innerText = `Username must be at least ${MIN_USERNAME} characters`;
      showError(usernameInput, usernameError);
      break;
    default:
      usernameError.innerText = `Username must be less than ${MAX_USERNAME} characters`;
      showError(usernameInput, usernameError);
  }

  if (checkEmail(emailInput.value)) {
    showSuccess(emailInput, emailError);
  } else {
    showError(emailInput, emailError);
  }

  const passwordStatus = checkLength(
    passwordInput.value,
    MIN_PASSWORD,
    MAX_PASSWORD
  );
  switch (passwordStatus) {
    case LENGTH_STATUS.ENOUGH:
      showSuccess(passwordInput, passwordError);
      break;
    case LENGTH_STATUS.TOO_SHORT:
      passwordError.innerText = `password must be at least ${MIN_PASSWORD} characters`;
      showError(passwordInput, passwordError);
      break;
    default:
      passwordError.innerText = `password must be less than ${MAX_PASSWORD} characters`;
      showError(passwordInput, passwordError);
  }

  if (checkRequired(confirmInput.value)) {
    if (checkPasswordsMatch(passwordInput.value, confirmInput.value)) {
      showSuccess(confirmInput, confirmError);
    } else {
      confirmError.innerText = "Passwords do not match";
      showError(confirmInput, confirmError);
    }
  } else {
    confirmError.innerText = "Password2 is required";
    showError(confirmInput, confirmError);
  }
};

const init = () => {
  submit.addEventListener("click", onSubmit);
};

init();

// checkRequired() to accept array of inputs
// checkLength() to check MIN_USERNAME and max length
// checkEmail() to validate emailInput with regex
// checkPasswordsMatch() to match confirm password
