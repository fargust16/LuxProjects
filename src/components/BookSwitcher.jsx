import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import history from '../history';

import Slider from './Slider.jsx';
import Book from './Book.jsx';

import CustomLink from './CustomLink.jsx';

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
      { !blocks.length ? blocks : <Slider blocks={ blocks } /> }

      <CustomLink pathTo={`/books/categories/${categoryName}`} className="switcher__see-more" text="more" />

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