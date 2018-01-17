import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Scroll from 'react-scroll';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/UserActions';

import AuthForm from './AuthForm.jsx';

import { isLoggedIn } from '../services/AuthService';

import { ON_HIDE_WIDTH } from '../constants/UIConstants.js';

import BlockHeader from './BlockHeader.jsx';
import './Comments.scss';

var scroll = Scroll.animateScroll;

class Comments extends Component {

  static propTypes = {
    comments: PropTypes.array
  };

  static defaultProps = {
    comments: []
  };

  constructor(props) {
    super(props);
    let comTemp = this.props.comments;

    this.state = {
      showCom: window.innerWidth >= ON_HIDE_WIDTH ? true : false,
      showComBtns: false,
      commentsOffset: 0,
      comments: comTemp,
      commenttext: '',
      maxComments: 5,
      isAuth: false
    }

    this.resizeWindow = this.resizeWindow.bind(this);
  }

  handleCommenttextChange(e) {
    this.setState({
      commenttext: e.target.value
    });
  }

  handleMoreComments() {
    const {comments, maxComments} = this.state;

    this.setState({
      maxComments: maxComments >= comments.length ? maxComments : maxComments + 5
    })
  }

  showComments() {
    if (window.innerWidth >= ON_HIDE_WIDTH) return;
    const {showCom} = this.state;

    this.setState({
      showCom: !showCom
    });

    if (!showCom) {
      this.setState({
        commentsOffset: window.pageYOffset
      });
      scroll.scrollTo(this._comments_block.offsetTop - 150, {
        duration: 500,
        delay: 50,
        smooth: true
      })
    } else {
      scroll.scrollTo(this.state.commentsOffset - 1, {
        duration: 0,
        delay: 0
      })
    }
  }

  postNewComment() {
    const {comments, commenttext} = this.state;
    if (commenttext === '') return;

    let authors = ['Lewis Carroll', 'Paulo Coelho', 'Joanne Rowling', 'Chack Pallaniuk'];
    let authorTemp = authors[Math.floor(Math.random() * authors.length)];
    let postDate = new Date();

    this.setState({
      comments: [{
        text: commenttext,
        author: authorTemp,
        postDate: postDate
      }, ...comments],
      commenttext: '',
      showComBtns: false
    });
  }

  resizeWindow() {
    this.setState({
      showCom: window.innerWidth >= ON_HIDE_WIDTH ? true : false
    });
  }

  showCommentsButtons(e, isShow) {
    if (!isLoggedIn()) {
      e.target.blur();
      return
    }

    this.setState({
      showComBtns: isShow,
      commenttext: !isShow ? '' : this.state.commenttext
    });
  }

  handleShowAuthForm(isShowForm) {
    this.setState({
      isAuth: isShowForm
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      comments: nextProps.comments
    })
  }

  componentWillMount() {
    window && window.addEventListener('resize', this.resizeWindow, false);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.resizeWindow, false);
  }

  render() {
    const {comments, showCom, showComBtns, commenttext, maxComments, isAuth} = this.state;
    const {handleLogIn} = this.props.userActions;
    const {error, fetching} = this.props.user;

    let contentClass = classNames('comments__content', {
      'comments__content_hide': !showCom
    }, this.props.className);

    let buttonsClass = classNames('new-comment__buttons', {
      'new-comment__buttons_hide': !showComBtns
    }, this.props.className);

    return (
      <section ref={ (div) => {
                 this._comments_block = div
               } } className="comments other-pages__comments">
        <BlockHeader optionName="comments" isShowOption={ showCom } handleChangeView={ ::this.showComments } />
        <section className={ contentClass }>
          <div className="new-comment comments__new-comment">
            <img className="comment__user-image" src="" alt="" />
            <div className="new-comment__desc">
              <textarea className="field new-comment__text"
                placeholder="leave a comment"
                onFocus={ (e, isShow) => this.showCommentsButtons(e, true) }
                onClick={ (isShowForm) => this.handleShowAuthForm(!isLoggedIn()) }
                onChange={ (e) => this.handleCommenttextChange(e) }
                value={ commenttext }></textarea>
              <footer className={ buttonsClass }>
                <button className={ classNames('new-comment__button btn-clear', {
                                      'button': window.innerWidth >= ON_HIDE_WIDTH
                                    }) } onClick={ (isShow) => this.showCommentsButtons(false) }>
                  Cancel
                </button>
                <button className={ classNames('new-comment__button btn-send', {
                                      'button': window.innerWidth >= ON_HIDE_WIDTH
                                    }) } onClick={ () => this.postNewComment() } disabled={ this.state.commenttext === '' }>
                  Send comment
                </button>
              </footer>
            </div>
          </div>
          { comments.map((comment, i) => {
              if (i >= maxComments) return '';
            
              return (
                <InputComments {...comment} n={ i } key={ i } />
              )
            }) }
          <div className={ classNames('comments__more-btn', {
                             'comments__more-btn_hide': maxComments >= comments.length
                           }, 'button') } onClick={ () => this.handleMoreComments() }>
            show more
          </div>
        </section>
        { isAuth ? <AuthForm onSignIn={ handleLogIn } error={ error } fetching={fetching} onClose={ (isShowForm) => this.handleShowAuthForm(false) } /> : '' }
      </section>
      );
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(Comments)


const InputComments = ({author, text, postDate, n}) => {

  InputComments.propTypes = {
    author: PropTypes.string,
    text: PropTypes.string,
    n: PropTypes.number
  }

  let postDateTemp = new Date(postDate);

  return (
    <div className="comment" key={ n }>
      <img className="comment__user-image" src="" alt="" />
      <div className="comment__desc">
        <p className="comment__author">
          { author }<span className="comment__time">{ moment(postDateTemp, "YYYYMMDD").fromNow() }</span>
        </p>
        <p className="comment__text">
          { text }
        </p>
      </div>
    </div>
    );
};