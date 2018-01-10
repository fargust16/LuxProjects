import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Book.scss';

const Book = ({categoryId, author, cover, title, text, reviews, id}) => {

  Book.defaultProps = {
    reviews: []
  };

  Book.propTypes = {
    categoryId: PropTypes.string,
    author: PropTypes.string,
    cover: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    reviews: PropTypes.array,
    id: PropTypes.string
  };

  return (
    <article className={ classNames('book', {
                       'category__book': categoryId,
                       'switcher__book': !categoryId
                     }) }>
      <img src={ "/images/" + (cover ? cover : '') } className="book__cover" alt={ title } />
      <section className="book__info">
        <Link to={ `/books/view/${id}` } className="book__title">
          { title }
        </Link>
        <div className="book__author">
          { author }
        </div>
        <div className="book__desc">
          { text }
        </div>
        <div className="reviews book__reviews">
          { reviews.length } reviews
        </div>
      </section>
    </article>
  )
};

export default Book;