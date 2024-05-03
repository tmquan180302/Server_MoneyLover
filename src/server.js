require('dotenv').config()

const express = require('express');
const app = express();

const { PORT, URI_MONGODB, TOKEN_SEC_KEY } = process.env;
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ejsLayout = require('express-ejs-layouts')
const methodOverride = require('method-override');
const path = require('path');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const session = require('express-session');

const route = require('./routes');
const db = require('./config/db');
const { passport } = require('./utils/authModule');
db.connect();

app.use(session({
    secret: TOKEN_SEC_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: URI_MONGODB,
        collectionName: 'Sessions'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//meaasge
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    res.locals.error = req.flash('error');
    delete req.session.message;
    next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(morgan('tiny'));

app.use(ejsLayout)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');




route(app);

app.listen(PORT, console.log(`Server listening on ${PORT}`));