import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import ClampLines from 'react-clamp-lines';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as bookActions from '../actions/BookActions';
import * as userActions from '../actions/UserActions';
import * as commentActions from '../actions/CommentActions';
import * as headerActions from '../actions/HeaderActions';

import {CalcLinesOfDesc} from '../components/Book.jsx';
import Rating from '../components/Rating.jsx';
import Comments from '../components/Comments.jsx';

import CustomLink from '../components/CustomLink.jsx';

import './BookDescription.scss';

class BookDescription extends Component {

    static defaultProps = {
        reviews: []
    };

    constructor(props) {
        super(props);

        this.state = {
            showMoreText: false
        };

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
        const {id} = this.props.user.username;
        const {handleAddRecentBook, handleGetBookInfo} = this.props.bookActions;

        let book_id = parseInt(bookId, 10);

        handleGetBookInfo(book_id);

        id && handleAddRecentBook({book_id: book_id, user_id: id});
    }

    componentWillReceiveProps(nextProps) {
        nextProps && nextProps.book && this.handleSetLinesOfText(this._bookInfo, this._clampText);
    }

    componentWillMount() {
        window && window.addEventListener('resize', this.onResizeEnd, false);
    }

    componentWillUnmount() {
        window && window.removeEventListener('resize', this.onResizeEnd, false);
    }

    render() {
        const {id, cover = '', title, author, isbn, release_date, description, text, reviews = [], comments = []} = this.props.book;
        const {error} = this.props.user;
        const {fetching} = this.props.load;
        const {descLines, showMoreText} = this.state;

        const {handleLogIn} = this.props.userActions;
        const {changeDisplayAuth} = this.props.headerActions;
        const {handleAddNewComment, handleAddReview} = this.props.bookActions;

        let blockInfoClass = classNames('book-description__main-info', {
            'book-description__main-info_more': showMoreText
        });

        return (
            <article>
                <main className="book-description other-pages__block">
                    <section className="book-description__info">
                        <img className="book-description__book-cover" src={`${cover}`} alt="book`s name"/>
                        <div ref={(div) => {
                            this._bookInfo = div
                        }} className={blockInfoClass}>
                            <div className="book-description__title">
                                {title}
                            </div>
                            <div className="book-description__author">
                                {author}
                            </div>
                            <section className="book-description__control-info">
                                <div className="book-description__ISBN">
                                    <span>ISBN:</span>&nbsp;<span>{isbn}</span>
                                </div>
                                <div className="book-description__publish-date">
                                    <span>Release date:</span>&nbsp;
                                    <span>{moment(new Date(release_date)).format('DD.MM.YYYY')}</span>
                                </div>
                            </section>
                            <div className="book-description__more-text" onClick={::this.handleShowMore}>
                                {descLines && description
                                    ? <ClampLines text={description}
                                                  lines={descLines}
                                                  ellipsis="..."
                                                  moreText="see more"
                                                  lessText="Collapse"
                                                  className="book-description__text"
                                                  ref={(div) => {
                                                      this._clampText = div
                                                  }}/>
                                    : <div ref={(div) => {
                                        this._clampText = div
                                    }} className="book-description__text">
                                        {description}
                                    </div>}
                            </div>
                        </div>
                    </section>
                    <div className="book-description__reviews">
                        <Rating rating={reviews} handleAddReview={handleAddReview} bookId={id}/>
                        <span className="reviews book-description__reviews-count">{reviews ? reviews.length : 0} reviews</span>
                    </div>
                    <div className="book-description__buttons">
                        <CustomLink pathTo={`/books/read/${id}`} className="book-description__button button btn-read"
                                    text="start reading now"/>
                        <a className="book-description__button button btn-download"
                           href={`data:text/plain;charset=utf-8,%EF%BB%BF${encodeURIComponent(text)}`}
                           download={`${title}.txt`}>download</a>
                    </div>
                </main>
                <Comments comments={comments}
                          bookId={id}
                          {...this.props.comments}
                          {...this.props.user}
                          error={error}
                          fetching={fetching}
                          handleLogIn={handleLogIn}
                          {...this.props.commentActions}
                          showAuthForm={changeDisplayAuth}
                          handleAddComment={handleAddNewComment}/>
            </article>
        );
    }
}

export default connect(
    state => ({
        book: state.books.bookById,
        user: state.user,
        load: state.load,
        comments: state.comments
    }),
    dispatch => ({
        bookActions: bindActionCreators(bookActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        commentActions: bindActionCreators(commentActions, dispatch),
        headerActions: bindActionCreators(headerActions, dispatch),
    })
)(BookDescription)