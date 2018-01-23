import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import history from '../history';

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

  handleOnLinkClick(path) {
    if(path.indexOf('undefined') + 1) return;
    history.push(path);
  }

  render() {
    return <Results {...this.props} handleOnLinkClick={::this.handleOnLinkClick} />
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

const ViewBooksInHome = ({books, categoryName, handleOnLinkClick}) => {

  ViewBooksInHome.propTypes = {
    books: PropTypes.array,
    categoryName: PropTypes.string
  };

  let blocks = books.length ? [...books] : books;

  return (
    <div className="books home-page__books">
      { !blocks.length ? blocks : <Slider blocks={ blocks } /> }
      <div onClick={(path) => handleOnLinkClick(`/books/categories/${categoryName}`)} className="switcher__see-more">
        more
      </div>
    </div>
    );
};

const Results = ({books, categoryId, categoryName, handleOnLinkClick}) => {

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
    <ViewBooksInHome books={ booksCont } handleOnLinkClick={handleOnLinkClick} categoryName={ categoryName } />

  return (
    <div className="category__results-books">
      { content }
    </div>
    );
};