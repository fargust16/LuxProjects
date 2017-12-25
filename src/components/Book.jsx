import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Book.scss';

const Book = ({categoryId, Author, Cover, Title, Text, Reviews, Id}) => {
  if (!Id) {
    return <article className="book"></article>
  } else {
    return (
      <article className={ classNames('book', {
                       'category__book': categoryId,
                       'switcher__book': !categoryId
                     }) }>
        <img src={ "/images/" + (Cover ? Cover : '') } className="book__cover" alt={ Title } />
        <section className="book__info">
          <Link to={ { pathname: '/books/view/' + Id } } className="book__title">
            { Title }
          </Link>
          <div className="book__author">
            { Author }
          </div>
          <div className="book__desc">
            { Text }
          </div>
          <div className="reviews book__reviews">
            { Reviews.length } reviews
          </div>
        </section>
      </article>
      );
  }
}

export default Book;