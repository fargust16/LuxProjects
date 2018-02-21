import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Scroll from 'react-scroll';
import classNames from 'classnames';

import {isLoggedIn} from '../services/AuthService';
import {ON_HIDE_WIDTH} from '../constants/UI.js';

import BlockHeader from './BlockHeader.jsx';
import './Comments.scss';

const scroll = Scroll.animateScroll;

class Comments extends Component {

    static propTypes = {
        comments: PropTypes.array,
        changeCommentText: PropTypes.func,
        handleAddComment: PropTypes.func,
        showCommentButtons: PropTypes.func,
        showAuthForm: PropTypes.func,

    };

    static defaultProps = {
        comments: [],
        changeCommentText: function () {},
        handleAddComment: function () {},
        showCommentButtons: function () {},
        showAuthForm: function () {},
    };

    constructor(props) {
        super(props);
        this.resizeWindow = this.resizeWindow.bind(this);
    }

    showComments() {
        if (window.innerWidth >= ON_HIDE_WIDTH) return;

        const {commentsIsShow, commentsOffset, changeCommentsView, changeCommentsOffset} = this.props;

        changeCommentsView(!commentsIsShow);

        //float scroll to comments block;
        if (!commentsIsShow) {
            changeCommentsOffset(window.pageYOffset);
            scroll.scrollTo(this._comments_block.offsetTop - 150, {
                duration: 500,
                delay: 50,
                smooth: true
            })
        } else {
            scroll.scrollTo(commentsOffset - 1, {
                duration: 0,
                delay: 0
            })
        }
    }

    postNewComment() {
        const {newCommentText, handleAddComment, bookId, username} = this.props;

        let newComment = {
            text: newCommentText,
            user_id: username && username.id,
            author: username && username.username,
            post_date: new Date(),
            book_id: bookId
        };

        handleAddComment(newComment);
    }

    handleShowAuth(condition) {
        const {showAuthForm} = this.props;

        condition && showAuthForm();
    }

    resizeWindow() {
        const {commentsIsShow, changeCommentsView} = this.props;

        let condition = window.innerWidth >= ON_HIDE_WIDTH;

        commentsIsShow !== condition && changeCommentsView(condition);
    }

    componentWillMount() {
        window && window.addEventListener('resize', this.resizeWindow, false);
    }

    componentWillUnmount() {
        window && window.removeEventListener('resize', this.resizeWindow, false);
    }

    render() {
        const { comments, maxComments, newCommentText, buttonsIsShow,
            commentsIsShow, changeCommentText, showCommentButtons, showMoreComments } = this.props;

        let viewComments = maxComments >= (comments && comments.length) ? maxComments : maxComments + 5;

        let contentClass = classNames('comments__content', {
            'comments__content_hide': !commentsIsShow
        }, this.props.className);

        let buttonsClass = classNames('new-comment__buttons', {
            'new-comment__buttons_hide': !buttonsIsShow
        }, this.props.className);

        return (
            <section ref={(div) => {
                this._comments_block = div
            }} className="comments other-pages__comments">
                <BlockHeader optionName="comments" isShowOption={commentsIsShow}
                             handleChangeView={::this.showComments}/>
                <section className={contentClass}>
                    <div className="new-comment comments__new-comment">
                        <img className="comment__user-image" src="" alt=""/>
                        <div className="new-comment__desc">
                            <textarea className="field new-comment__text"
                                      placeholder="leave a comment"
                                      onFocus={() => showCommentButtons(true)}
                                      onClick={() => this.handleShowAuth(!isLoggedIn())}
                                      onChange={(e) => changeCommentText(e.target.value)}
                                      value={newCommentText}/>
                            <div className={buttonsClass}>
                                <button className={classNames('new-comment__button btn-clear', {
                                    'button': window.innerWidth >= ON_HIDE_WIDTH
                                })} onClick={() => showCommentButtons(false)}>
                                    Cancel
                                </button>
                                <button className={classNames('new-comment__button btn-send', {
                                    'button': window.innerWidth >= ON_HIDE_WIDTH
                                })} onClick={() => this.postNewComment()} disabled={newCommentText === ''}>
                                    Send comment
                                </button>
                            </div>
                        </div>
                    </div>
                    {comments && comments.sort((a, b) => b.id - a.id).map((comment, i) => {
                        if (i >= maxComments) return '';

                        return (
                            <InputComments {...comment} n={i} key={i}/>
                        )
                    })}
                    <div className={classNames('comments__more-btn', {
                        'comments__more-btn_hide': maxComments >= (comments && comments.length)
                    }, 'button')} onClick={() => showMoreComments(viewComments)}>
                        show more
                    </div>
                </section>
            </section>
        );
    }
}

export default Comments;


const InputComments = ({author, text, post_date, n}) => {

    InputComments.propTypes = {
        author: PropTypes.string,
        text: PropTypes.string,
        n: PropTypes.number
    };

    let postDateTemp = new Date(post_date);

    return (
        <div className="comment" key={n}>
            <img className="comment__user-image" src="" alt=""/>
            <div className="comment__desc">
                <p className="comment__author">
                    {author}<span className="comment__time">{moment(postDateTemp, "YYYYMMDD").fromNow()}</span>
                </p>
                <p className="comment__text">
                    {text}
                </p>
            </div>
        </div>
    );
};