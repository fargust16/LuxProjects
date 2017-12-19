import React, { Component } from 'react';

//import Book from './Book.jsx';
import BookSwitcher from './BookSwitcher.jsx';

import './Books.scss';

export default class Books extends Component {

  render() {
    const {categoryId, categoryView} = this.props;
    return (
      <div className="books home-page__books">
        <BookSwitcher categoryId={ categoryId || 0 } categoryView={ categoryView } />
      </div>
      );
  }
}
