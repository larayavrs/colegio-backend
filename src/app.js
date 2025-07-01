const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

/* setting up the app */
const app = express();

/* middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(require('./middlewares/json'));
app.use(require('./middlewares/morgan'));
app.use(require('./middlewares/cors'));
app.use(require('./middlewares/cookie_parser'));

/* routes */
app.use('/api/v1', require('./routes'));

/* handlers */
app.use(require('./handlers/not-found'));
app.use(require('./handlers/error'));

/* static files */
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/* exporting the app */
module.exports = app;
