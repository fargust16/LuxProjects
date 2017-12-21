import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Book.scss';

const Book = ({subClass, author, cover, title, description, reviews, id}) => {

  return (
    <article className={ classNames('book', subClass) }>
      <img src={ "/images/" + cover } className="book__cover" alt={ title } />
      <section className="book__info">
        <Link to={ { pathname: '/books/view/' + id } } className="book__title">
          { title }
        </Link>
        <div className="book__author">
          { author }
        </div>
        <div className="book__desc">
          { description }
        </div>
        <div className="reviews book__reviews">
          { reviews }
        </div>
      </section>
    </article>
    );
}

export default Book;