/* globals window document fetch */

function grab(str) {
  return document.getElementById(str);
}

function confirmLogin(res) {
  if (res.login === 'OK') window.location.href = '/';
}

const makeFetch = () => ({
  method: 'POST',
  body: {
    username: grab('username').value,
    password: grab('password').value,
  },
  credentials: 'include',
});

grab('sign-in').addEventListener('click', () => {
  fetch('/signin', makeFetch())
    .then(res => res.json())
    .then(confirmLogin);
});

grab('sign-up').addEventListener('click', () => {
  fetch('/signup', makeFetch())
    .then(res => res.json())
    .then(confirmLogin);
});

