import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import moment from 'moment';

import { getBookInfo } from '../services/api';

import Rating from './Rating.jsx';
import Comments from './Comments.jsx';

import './BookDescription.scss';

class BookDescription extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      book: {}
    }
  }

  componentWillMount() {
    const {bookId} = this.props.match.params;


    getBookInfo(parseInt(bookId, 10)).then(
      book => {
        this.setState({
          book: book
        });
      }
    );
  }

  render() {
    const {book} = this.state;

    return (
      <article>
        <main className="book-description other-pages__block">
          <section className="book-description__info">
            <img className="book-description__book-cover" src={ "/images/" + (book.cover ? book.cover : '') } alt="book`s name" />
            <div className="book-description__main-info">
              <div className="book-description__title">
                { book.title }
              </div>
              <div className="book-description__author">
                { book.author }
              </div>
              <section className="book-description__control-info">
                <div className="book-description__ISBN">
                  <span>ISBN:</span>&nbsp;<span>{ book.ISBN }</span>
                </div>
                <div className="book-description__publish-date">
                  <span>Pablishing date:</span>&nbsp;<span>{ moment(new Date(book.releaseDate)).format('DD.MM.YYYY') }</span>
                </div>
              </section>
              <div className="book-description__text" id="fill_text">
                { book.text }
              </div>
              <span className="book-description__text-more">see more</span>
            </div>
          </section>
          <div className="book-description__reviews">
            <Rating rating={ book.reviews } />
            <span className="reviews book-description__reviews-count">{ book.reviews ? book.reviews.length : 'count' } reviews</span>
          </div>
          <div className="book-description__buttons">
            <Link to={ `/books/read/${book.id}` } className="book-description__button button btn-read">
              start reading now
            </Link>
            <Link to="#download" className="book-description__button button btn-download">
              download
            </Link>
          </div>
        </main>
        <Comments comments={ book.comments } />
      </article>
      );
  }
}

export default withCookies(BookDescription);