/* globals window document fetch */

function grab(str) {
  return document.getElementById(str);
}

function confirmLogin(res) {
  if (res.login === 'OK') window.location.href = '/';
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

