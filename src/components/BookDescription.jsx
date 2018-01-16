import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookActions from '../actions/BookActions';

import Rating from './Rating.jsx';
import Comments from './Comments.jsx';

import './BookDescription.scss';

class BookDescription extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillMount() {
    const {bookId} = this.props.match.params;
    this.props.bookActions.handleGetBookInfo(parseInt(bookId, 10))
  }

  render() {
    const {book} = this.props.books;

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
                  <span>ISBN:</span> <span>{ book.ISBN }</span>
                </div>
                <div className="book-description__publish-date">
                  <span>Pablishing date:</span> <span>{ moment(new Date(book.releaseDate)).format('DD.MM.YYYY') }</span>
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

function mapStateToProps(state) {
  return {
    books: state.books
  }
}

function mapDispatchToProps(dispatch) {
  return {
    bookActions: bindActionCreators(bookActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDescription)