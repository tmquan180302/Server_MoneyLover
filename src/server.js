const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const route = require('./routes');
const db = require('./config/db');

db.connect();

const app = express();
const PORT = 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/resources/views');

route(app);

app.listen(PORT, console.log(`Server listening on ${PORT}`));