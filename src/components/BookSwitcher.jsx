import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Slider from './Slider.jsx';
import Book from './Book.jsx';

import './BookSwitcher.scss';

export default class BookSwitcher extends Component {

  render() {
    return <Results {...this.props} />
  }
}

BookSwitcher.propTypes = {
  books: PropTypes.array
}

const ViewBooksInCategory = ({books}) => {
  return (
    <div className="books category__books">
      { books }
    </div>
    );
}

const ViewBooksInHome = ({books, categoryName}) => {
  let blocks = [...books];
  return (
    <div className="books home-page__books">
      { blocks.length === 0 ? blocks : <Slider blocks={ blocks } hideWidth={ 1023 } /> }
      <Link className="switcher__see-more" to={ { pathname: '/books/categories/' + categoryName } }>
        more
      </Link>
    </div>
    );
}

const Results = ({books, categoryId, categoryName}) => {
  let content,
    booksCont;

  booksCont = books ?
    books.map(book => {
      return (
        <Book {...book} key={ book.Id } categoryId={ categoryId } />
        );
    })
    :
    <Book key={ 1 } />;

  content = categoryId ?
    <ViewBooksInCategory books={ booksCont } />
    :
    <ViewBooksInHome books={ booksCont } categoryName={ categoryName } />

  return (
    <div className="category__results-books">
      { content }
    </div>
    );
}