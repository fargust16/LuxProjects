import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Book.scss';

class Book extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookDescLines: 0
    }

    this.bookDescResize = this.bookDescResize.bind(this);
  }

  bookDescResize(book) {
    if(!book.desc) return;

    let bookBlock = this.refs.book;

    let columnHeight = Math.ceil((bookBlock.clientWidth - book.desc.offsetTop + 49) / 38);

    this.setState({bookDescLines: columnHeight});
  }

  componentDidMount() {
    window.addEventListener("resize", this.bookDescResize.bind(this.bookDescResize, this.refs));
    this.bookDescResize(this.refs);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.bookDescResize);
  }

  render() {
    const { subClass, author, cover, title, description, reviews } = this.props;
    const { bookDescLines } = this.state;

    return (
      <article ref="book" className={subClass ? "book " + subClass : "book"}>
        <img src={"./images/" + cover} className="book__cover" alt={title}/>
        <section className="book__info">
          <Link to="/book-description" className="book__title">{title}</Link>
          <div className="book__author">{author}</div>
          <div className="book__desc" ref="desc" style={{WebkitLineClamp: bookDescLines}}>{description}</div>
          <div className="reviews book__reviews">{reviews}</div>
        </section>
      </article>
    );
  }
}

export default Book;
