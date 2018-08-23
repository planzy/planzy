const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const trips = require('./controllers/tripsController');
const user = require('./controllers/userController');
const dest = require('./controllers/destinationsController');
const list = require('./controllers/listController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

const singleStatic = (route, filePath) =>
  app.get(route, (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', filePath));
  });

singleStatic('/login', 'client/login.html');
singleStatic('/js/login.js', 'client/js/login.js');
singleStatic('/css/login.css', 'client/css/login.css');

// User Routes
app.post('/signin', user.signIn, user.startSession);
app.post('/signup', user.addUser, user.startSession);

// Hide all other routes behind JWT validation
app.use(user.checkSession);

// Trip Routes
app.get('/trips/:id', trips.getTrips);
app.post('/trips', trips.addTrip);
app.delete('/trips', trips.deleteTrip);

// Destination routes
app.get('/dest/:id', dest.getDestinations);
app.post('/dest', dest.addDestination);
app.delete('/dest', dest.deleteDestination);

// List routes
app.get('/list/:id', list.getListItems);
app.post('/list', list.addListItem);
app.delete('/list', list.deleteListItem);

app.use(express.static(
  path.resolve(__dirname, '../', 'client'),
  { extensions: ['html'] },
));


app.listen(PORT, () => console.log(`listening on ${PORT}`));
