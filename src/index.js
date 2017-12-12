import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './style.scss';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import BookDescription from './components/BookDescription.jsx';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home}/>
        <Route path="/book-description" component={BookDescription}/>
        <Route path="/add-book" component={Home}/>
      </div>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();
