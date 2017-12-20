import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Book.scss';

export default class Book extends Component {

  render() {
    const {subClass, author, cover, title, description, reviews, id} = this.props;

    return (
      <article ref="book" className={ subClass ? "book " + subClass : "book" }>
        <img src={ "/images/" + cover } className="book__cover" alt={ title } />
        <section className="book__info">
          <Link to={{pathname: '/books/view/' + id }} className="book__title">
            { title }
          </Link>
          <div className="book__author">
            { author }
          </div>
          <div className="book__desc" ref="desc">
            { description }
          </div>
          <div className="reviews book__reviews">
            { reviews }
          </div>
        </section>
      </article>
      );
  }
}
