'use strict';
const express = require('express');
const morgan = require('morgan');
//const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const books = require('./books.json');
const recentBooks = require('./recentBooks.json');
const users = require('./users.json');

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

  let user = users.find(el => el.username === email && el.password === password);
  
  setTimeout(() => res.send(user), 2000);
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});