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
            <img className="book-description__book-cover" src={ "/images/" + (book.Cover ? book.Cover : '') } alt="book`s name" />
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

export default withCookies(BookDescription);


  /*
  componentWillUnmount() {
    const {book} = this.state;
    const {cookies} = this.props;

    let booksView = cookies.get('recentBooks') || [];

    booksView = booksView.concat({
      bookId: book.Id,
      viewDate: moment(new Date()).format('DD.MM.YYYY')
    });

    cookies.set('recentBooks', booksView, {
      path: '/'
    });

    console.log(cookies);
  }

  zeroCookie() {
    const {cookies} = this.props;

    cookies.remove('recentBooks', {
      path: '/'
    });

    console.log(cookies);
  }*/