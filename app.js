const morgan = require('morgan');

const express = require('express');
const app = express();

const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

// MIDDLE WARE///////////////////

app.use(express.json());

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('this is my middleware');
  next();
});

app.use((req, res, next) => {
  req.myTime = new Date().toISOString();
  next();
});

/// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
