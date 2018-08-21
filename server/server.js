const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const user = require('./controllers/userController');
const map = require('./controllers/mapController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',
  user.checkLogin,
  map.render,
);

app.get('/login', user.renderLogin);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
