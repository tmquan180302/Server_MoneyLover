const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny'));



app.listen(PORT, console.log(`Server listening on ${PORT}`));