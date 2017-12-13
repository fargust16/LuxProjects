import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './style.scss';

import Header from './components/Header.jsx';

import Home from './components/Home.jsx';
import AddBook from './components/AddBook.jsx';
import Recent from './components/Recent.jsx';
import Support from './components/Support.jsx';
import Settings from './components/Settings.jsx';

import BookDescription from './components/BookDescription.jsx';
import ReadBook from './components/ReadBook.jsx';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home}/>
      <Route path="/category-:categoryName" component={Home}/>
      <Route path="/add-book" component={AddBook}/>
      <Route path="/recent" component={Recent}/>
      <Route path="/support" component={Support}/>
      <Route path="/settings" component={Settings}/>

      <Route path="/book-description" component={BookDescription}/>
      <Route path="/read-book-:bookName" component={ReadBook}/>
      </div>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();
