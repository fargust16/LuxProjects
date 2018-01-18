import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import ClampLines from 'react-clamp-lines';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookActions from '../actions/BookActions';

import { CalcLinesOfDesc } from './Book.jsx';
import Rating from './Rating.jsx';
import Comments from './Comments.jsx';

import './BookDescription.scss';

class BookDescription extends Component {

  static defaultProps = {
    reviews: []
  };

  constructor(props) {
    super(props);

    this.state = {
      showMoreText: false
    }

    this.onResizeEnd = this.onResizeEnd.bind(this);
  }

  handleSetLinesOfText() {
    if (!this._bookInfo || !this._clampText) return;

    let marginBot = 45; // place for button "seeMore" and underline
    let linesOfText = CalcLinesOfDesc(this._bookInfo, this._clampText, marginBot);

    this.setState({
      descLines: linesOfText
    })
  }

  onResizeEnd() {
    const {resizeEnd} = this.state;

    clearTimeout(resizeEnd);

    this.setState({
      resizeEnd: setTimeout(::this.handleSetLinesOfText, 300)
    });
  }

  handleShowMore() {
    this.setState({
      showMoreText: true
    })
  }

  componentDidMount() {
    const {bookId} = this.props.match.params;
    this.props.bookActions.handleGetBookInfo(parseInt(bookId, 10))

    this.handleSetLinesOfText(this._bookInfo, this._clampText);
  }

  componentWillMount() {
    window && window.addEventListener('resize', this.onResizeEnd, false);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onResizeEnd, false);
  }

  render() {
    const {id, cover = '', title, author, ISBN, releaseDate, text, reviews = [], comments = []} = this.props.book;
    const {descLines, showMoreText} = this.state;

    let blockInfoClass = classNames('book-description__main-info', {
      'book-description__main-info_more': showMoreText
    })

    return (
      <article>
        <main className="book-description other-pages__block">
          <section className="book-description__info">
            <img className="book-description__book-cover" src={ "/images/" + cover } alt="book`s name" />
            <div ref={ (div) => {
                         this._bookInfo = div
                       } } className={ blockInfoClass }>
              <div className="book-description__title">
                { title }
              </div>
              <div className="book-description__author">
                { author }
              </div>
              <section className="book-description__control-info">
                <div className="book-description__ISBN">
                  <span>ISBN:</span> <span>{ ISBN }</span>
                </div>
                <div className="book-description__publish-date">
                  <span>Pablishing date:</span> <span>{ moment(new Date(releaseDate)).format('DD.MM.YYYY') }</span>
                </div>
              </section>
              <div onClick={ ::this.handleShowMore }>
                { descLines && text
                  ? <ClampLines text={ text }
                      lines={ descLines }
                      ellipsis="..."
                      moreText="see more"
                      lessText="Collapse"
                      className="book-description__text"
                      ref={ (div) => {
                              this._clampText = div
                            } } />
                  : <div ref={ (div) => {
                               this._clampText = div
                             } } className="book-description__text">
                      { text }
                    </div> }
              </div>
            </div>
          </section>
          <div className="book-description__reviews">
            <Rating rating={ reviews } />
            <span className="reviews book-description__reviews-count">{ reviews.length } reviews</span>
          </div>
          <div className="book-description__buttons">
            <Link to={ `/books/read/${id}` } className="book-description__button button btn-read">
              start reading now
            </Link>
            <Link to="#download" className="book-description__button button btn-download">
              download
            </Link>
          </div>
        </main>
        <Comments comments={ comments } />
      </article>
      );
  }
}

export default connect(
  state => ({
    book: state.books.bookById
  }),
  dispatch => ({
    bookActions: bindActionCreators(bookActions, dispatch)
  })
)(BookDescription)