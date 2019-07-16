'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const knex = require('knex');
const UsersService = require('./users-service');
const ExercisesService = require('./exercises-service');

const app = express();
// const knexInstance = knex({
//   client: 'pg',
//   connection: process.env.DB_URL
// });

// console.log(UsersService.getAllUsers(knexInstance));

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/users', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const users = UsersService.getAllUsers(knexInstance)
    .then(users => {
      res.json(users);
    })
    .catch(next);
  console.log('******* USERS');
});

app.get('/users/:id', (req, res, next) => {
  const knexInstance = req.app.get('db');
  console.log(req.params);
  const users = UsersService.getById(knexInstance, req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(next);
  console.log('******* USERS with id');
});

app.get('/users/login/:username', (req, res, next) => {
  const knexInstance = req.app.get('db');
  console.log(req.params);
  const users = UsersService.getByUsername(knexInstance, req.params.username)
    .then(user => {
      res.json(user);
    })
    .catch(next);
  console.log('******* USERS with id');
});

app.post('/users', (req, res) => {
  const knexInstance = req.app.get('db');
  console.log(req.body);
  UsersService.insertUser(knexInstance, {
    id: 4,
    username: 'user4',
    password: 'HPatGoF'
  });
  res.send('create user');
});

app.get('/workouts', (req, res) => {
  res.send('Return workouts');
});

app.get('/exercises', (req, res, next) => {
  const knexInstance = req.app.get('db');
  ExercisesService.getAllExercises(knexInstance)
    .then(exercises => {
      res.json(exercises);
    })
    .catch(next);
  console.log('******* Exercises');
  // res.send('Return exercises');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

console.log('connection successful');

module.exports = app;