import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebFont from 'webfontloader';

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

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif']
  }
});

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/books/categories/:categoryId" component={ Home } />
        <OtherPages>
          <Route path="/books/add-book" component={ AddBook } />
          <Route path="/books/recent" component={ Recent } />
          <Route path="/support" component={ Support } />
          <Route path="/settings" component={ Settings } />
          <Route path="/books/view/:bookId" component={ BookDescription } />
          <Route path="/books/read/:bookId" component={ ReadBook } />
        </OtherPages>
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
