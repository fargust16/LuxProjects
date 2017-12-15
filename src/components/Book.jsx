import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Book.scss';

class Book extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { subClass, author, cover, title, description, reviews } = this.props;

    return (
      <article ref="book" className={subClass ? "book " + subClass : "book"}>
        <img src={"./images/" + cover} className="book__cover" alt={title}/>
        <section className="book__info">
          <Link to="/book-description" className="book__title">{title}</Link>
          <div className="book__author">{author}</div>
          <div className="book__desc" ref="desc">{description}</div>
          <div className="reviews book__reviews">{reviews}</div>
        </section>
      </article>
    );
  }
}

export default Book;
