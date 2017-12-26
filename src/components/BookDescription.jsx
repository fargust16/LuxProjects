import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getBookInfo } from '../services/getBook.jsx';

import Rating from './Rating.jsx';
import Comments from './Comments.jsx';

import './BookDescription.scss';

export default class BookDescription extends Component {

  constructor(props) {
    super(props);

    this.state = {
      book: {}
    }
  }

  componentDidMount() {
    const {bookId} = this.props.match.params
    getBookInfo(parseInt(bookId, 10)).then(
      book => {
        this.setState({
          book
        })
      }
    );
  }

  render() {
    const {book} = this.state;

    return (
      <article>
        <main className="book-description other-pages__block">
          <section className="book-description__info">
            <img className="book-description__book-cover" src="/images/books-cover.png" alt="book`s name" />
            <div className="book-description__main-info">
              <div className="book-description__title">
                { book.Title }
              </div>
              <div className="book-description__author">
                { book.Author }
              </div>
              <section className="book-description__control-info">
                <div className="book-description__ISBN">
                  <span>ISBN:</span><span>{ book.ISBN }</span>
                </div>
                <div className="book-description__pablish-date">
                  <span>Pablishing date:</span><span>{ moment(new Date(book.ReleaseDate)).format('DD.MM.YYYY') }</span>
                </div>
              </section>
              <div className="book-description__text" id="fill_text">
                { book.Text }
              </div>
              <span className="book-description__text-more">see more</span>
            </div>
          </section>
          <div className="book-description__reviews">
            <Rating rating={ book.Reviews } />
            <span className="reviews book-description__reviews-count">{ book.Reviews ? book.Reviews.length : 'count' } reviews</span>
          </div>
          <div className="book-description__buttons">
            <Link to={ { pathname: '/books/read/' + book.Id } } className="book-description__button button btn-read">
              start reading now
            </Link>
            <Link to="#download" className="book-description__button button btn-download">
              download
            </Link>
          </div>
        </main>
        <Comments comments={ book.Comments } />
      </article>
      );
  }
}