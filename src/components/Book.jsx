import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Book.scss';

const Book = ({categoryId, Author, Cover, Title, Text, Reviews, Id}) => {
  let content = null;

  content = !Id ?
    <article className="Book"></article>
    :
    <article className={ classNames('Book', {
                       'Category__book': categoryId,
                       'switcher__book': !categoryId
                     }) }>
      <img src={ "/images/" + (Cover ? Cover : '') } className="Book__cover" alt={ Title } />
      <section className="Book__info">
        <Link to={`/books/view/${Id}`} className="Book__title">
          { Title }
        </Link>
        <div className="Book__author">
          { Author }
        </div>
        <div className="Book__desc">
          { Text }
        </div>
        <div className="reviews Book__reviews">
          { Reviews.length } reviews
        </div>
      </section>
    </article>

  return content;
};

export default Book;