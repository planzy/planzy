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

app.get('/', user.checkSession);

// User Routes
app.post('/signin', user.signIn, user.startSession);
app.post('/signup', user.addUser, user.startSession);

// Trip Routes
app.get('/trips/:tripId', trips.viewTrip);
app.get('/user/:id/trips', trips.getTrips);
app.post('/trips', trips.addTrip);
app.delete('/trips', trips.deleteTrip);

// Destination routes
app.get('/dest/:id', dest.getDestinations);
app.post('/dest', dest.addDestination);
app.delete('/dest', dest.deleteDestination);

//List routes
app.get('/list/:id', list.getListItems);
app.post('/list', list.addListItem);
app.delete('/list', list.deleteListItem);

app.use(express.static(
  path.resolve(__dirname, '../', 'client'),
  { extensions: ['html'] },
));


app.listen(PORT, () => console.log(`listening on ${PORT}`));
