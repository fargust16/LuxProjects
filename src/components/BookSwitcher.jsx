import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Slider from './Slider.jsx';
import Book from './Book.jsx';

import './BookSwitcher.scss';

class BookSwitcher extends Component {

  render() {
    const {categoryId, categoryName, books} = this.props;

    if (this.props.books.length === 0) {
      return (
        <div>
          Please Wait!
        </div>
        );
    } else {
      return (
        <div ref={ (div) => {
             this._bookBlock = div;
           } } className="books home-page__books">
          <Results categoryId={ categoryId } categoryName={ categoryName } books={ books } />
          <Link className="switcher__see-more" to={ { pathname: '/books/categories/' + categoryName } }>
            more
          </Link>
        </div>
        );
    }
  }
}

const ViewBooksInCategory = (props) => {
  return (
    <div className="books category__books">
      { props.books }
    </div>
    );
}

const Results = (props) => {
  let content = null,
    booksCont = [],
    booksArr = props.books;

  for (let i = booksArr.length - 1; i >= 0; i--) {
    booksCont[i] = (
      <Book subClass={ props.categoryId ? 'category__book' : 'switcher__book' }
        author={ booksArr[i].Author }
        title={ booksArr[i].Title }
        reviews={ booksArr[i].Reviews.length + " Reviews" }
        description={ booksArr[i].Text }
        cover={ booksArr[i].Cover }
        key={ i }
        id={ booksArr[i].Id } />
    );
  }

  if (props.categoryId) {
    content = <ViewBooksInCategory books={ booksCont } categoryId={ props.categoryId } categoryName={ props.categoryName } />
  } else {
    content = <Slider blocks={ booksCont } hideWidth={ 1023 } />
  }

  return (
    <div className="category__results-books">
      { content }
    </div>
    );
}

export default BookSwitcher;
