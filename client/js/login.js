/* globals window document fetch */

function grab(str) {
  return document.getElementById(str);
}

const hide = el => el.classList.add('hidden');
const show = el => el.classList.remove('hidden');

function clearError() {
  const error = grab('error');
  hide(error);
  if (error.firstChild) error.removeChild(error.firstChild);
}

function displayError(message) {
  const error = grab('error');
  const errorMessage = document.createTextNode(message);
  error.appendChild(errorMessage);
  show(error);
  setTimeout(clearError, 2000);
}

function confirmLogin(res) {
  if (res.login === 'OK') {
    window.location.href = '/';
  } else {
    clearError();
    displayError(res.reason);
  }
}

const makeFetch = (username, password) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ username, password }),
  credentials: 'include',
});

grab('sign-in').addEventListener('click', () => {
  const username = grab('username').value;
  const password = grab('password').value;
  fetch('/signin', makeFetch(username, password))
    .then(res => res.json())
    .then(confirmLogin);
});

grab('sign-up').addEventListener('click', () => {
  const username = grab('username').value;
  const password = grab('password').value;
  fetch('/signup', makeFetch(username, password))
    .then(res => res.json())
    .then(confirmLogin);
});

