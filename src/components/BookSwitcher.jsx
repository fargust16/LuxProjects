import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ON_SWITCHER_OFF_WIDTH } from '../constants/UIConstants.js';

import Slider from './Slider.jsx';
import Book from './Book.jsx';

import './BookSwitcher.scss';

export default class BookSwitcher extends Component {

  static defaultProps = {
    books: []
  };

  static propTypes = {
    books: PropTypes.array
  };

  render() {
    return <Results {...this.props} />
  }
}

const ViewBooksInCategory = ({books}) => {

  ViewBooksInCategory.propTypes = {
    books: PropTypes.array
  };

  return (
    <div className="books category__books">
      { books }
    </div>
    );
};

const ViewBooksInHome = ({books, categoryName}) => {

  ViewBooksInHome.propTypes = {
    books: PropTypes.array,
    categoryName: PropTypes.string
  };

  let blocks = books.length ? [...books] : books;

  return (
    <div className="books home-page__books">
      { !blocks.length ? blocks : <Slider blocks={ blocks } hideWidth={ ON_SWITCHER_OFF_WIDTH } /> }
      <Link className="switcher__see-more" to={ `/books/categories/${categoryName}` }>
        more
      </Link>
    </div>
    );
};

const Results = ({books, categoryId, categoryName}) => {

  Results.propTypes = {
    books: PropTypes.array,
    categoryId: PropTypes.string,
    categoryName: PropTypes.string
  };

  let content,
    booksCont;

  booksCont = books.map((book, i) => {
    return (
      <Book {...book} key={ i } subClass={ categoryId ? 'category__book' : 'switcher__book' } />
      );
  })

  content = categoryId ?
    <ViewBooksInCategory books={ booksCont } />
    :
    <ViewBooksInHome books={ booksCont } categoryName={ categoryName } />

  return (
    <div className="category__results-books">
      { content }
    </div>
    );
};