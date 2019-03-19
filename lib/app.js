const express = require('express');
const app = express();

const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const notFound = require('./middleware/notFound');
const dogs = require('./routes/dogs');

app.use(express.json());


app.use('/dogs', connection, dogs);


app.use(notFound);
app.use(handler);

module.exports = app;
