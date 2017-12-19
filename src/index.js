import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style.scss';

import App from './App.js';
import Home from './containers/Home.jsx';

import OtherPages from './containers/OtherPages.jsx';
import AddBook from './containers/AddBook.jsx';
import Recent from './containers/Recent.jsx';
import Support from './containers/Support.jsx';
import Settings from './containers/Settings.jsx';

import BookDescription from './components/BookDescription.jsx';
import ReadBook from './components/ReadBook.jsx';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/category-:categoryName" component={ Home } />
        <OtherPages>
          <Route path="/add-book" component={ AddBook } />
          <Route path="/recent" component={ Recent } />
          <Route path="/support" component={ Support } />
          <Route path="/settings" component={ Settings } />
          <Route path="/book-description" component={ BookDescription } />
          <Route path="/read-book-:bookName" component={ ReadBook } />
        </OtherPages>
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
