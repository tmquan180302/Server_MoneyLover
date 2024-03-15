const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const route = require('./routes');
const db = require('./config/db');

db.connect();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(morgan('tiny'));

app.set('views', '/src/views');
app.set('view engine', 'ejs');
app.set('layout', '/src/views/layouts');


route(app);

app.listen(PORT, console.log(`Server listening on ${PORT}`));