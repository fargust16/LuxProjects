const express = require('express');
const morgan = require('morgan');
//const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const books = require('./books.json');

const app = express();


// Setup logger
app.use( morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms') );

// to parse .json
app.use( bodyParser.json() );

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/books', function(req, res, next) {
  res.send(books);
});

module.exports = app;