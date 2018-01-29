'use strict';
const express = require('express');
const morgan = require('morgan');
//const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const books = require('./books.json');
const recentBooks = require('./recentBooks.json');
const users = require('./users.json');

//const authUser = require('./utils/DataBaseUtils');

var pgp = require("pg-promise")( /*options*/ );
var db = pgp("postgres://Adolmatov:A75320902394a@localhost:5432/online-library");

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// to parse .json
app.use(bodyParser.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/books', (req, res) => {
  res.send(books);
});

app.get('/books/view/:id', (req, res) => {
  res.send(books[req.params.id]);
});

app.get('/books/recent/', (req, res) => {
  res.send(recentBooks);
});

app.get('/books/read/:id', (req, res) => {
  res.send(books[req.params.id]);
});

app.post('/users', (req, res) => {
  const {email, password} = req.body;

  /*authUser(email, password, (err, result) => {
    res.send(result);
  })*/

  let params = ['*', 'users', email, password];
  db.query('SELECT $1:name FROM $2:name', params)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
      console.log(error);
    });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});