import React, { Component } from 'react';
import moment from 'moment';
import * as Scroll from 'react-scroll';
import classNames from 'classnames';

import BlockHeader from './BlockHeader.jsx';
import './Comments.scss';

var scroll = Scroll.animateScroll;

export default class Comments extends Component {

  constructor(props) {
    super(props);
    let comTemp = this.props.comments;

    this.state = {
      showCom: window.innerWidth >= 768 ? true : false,
      showComBtns: false,
      commentsOffset: 0,
      comments: comTemp || [],
      commentText: '',
      maxComments: 5
    }

    this.resizeWindow = this.resizeWindow.bind(this);
  }

  handleCommentTextChange(e) {
    this.setState({
      commentText: e.target.value
    });
  }

  handleMoreComments() {
    const {comments, maxComments} = this.state;

    this.setState({
      maxComments: maxComments >= comments.length ? maxComments : maxComments + 5
    })
  }

  showComments() {
    if (window.innerWidth >= 768) return;
    const {showCom} = this.state;

    this.setState({
      showCom: !showCom
    });

    if (!showCom) {
      this.setState({
        commentsOffset: window.pageYOffset
      });
      scroll.scrollTo(this.refs._comments_block.offsetTop - 150, {
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
    const {comments, commentText} = this.state;
    if (commentText === '') return;

    let authors = ['Lewis Carroll', 'Paulo Coelho', 'Joanne Rowling', 'Chack Pallaniuk'];
    let authorTemp = authors[Math.floor(Math.random() * authors.length)];
    let postDate = new Date();

    this.setState({
      comments: [{
        Text: commentText,
        Author: authorTemp,
        PostDate: postDate
      }, ...comments],
      commentText: '',
      showComBtns: false
    });
  }

  resizeWindow() {
    this.setState({
      showCom: window.innerWidth >= 768 ? true : false
    });
  }

  showCommentsButtons(isShow) {
    this.setState({
      showComBtns: isShow,
      commentText: !isShow ? '' : this.state.commentText
    });
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
    const {comments, showCom, showComBtns, commentText, maxComments} = this.state;

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
        <BlockHeader blockName="Comments" closeVar={ showCom } handleChangeVar={ () => this.showComments() } />
        <section className={ contentClass }>
          <div className="new-comment comments__new-comment">
            <img className="comment__user-image" src="" alt="" />
            <div className="new-comment__desc">
              <textarea className="field new-comment__text"
                placeholder="leave a comment"
                onFocus={ (isShow) => this.showCommentsButtons(true) }
                onChange={ (e) => this.handleCommentTextChange(e) }
                value={ commentText }></textarea>
              <footer className={ buttonsClass }>
                <button className={ classNames('new-comment__button btn-clear', {
                                      'button': window.innerWidth >= 768
                                    }) } onClick={ (isShow) => this.showCommentsButtons(false) }>
                  Cancel
                </button>
                <button className={ classNames('new-comment__button btn-send', {
                                      'button': window.innerWidth >= 768
                                    }) } onClick={ () => this.postNewComment() } disabled={ this.state.commentText === '' }>
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
          <div className={ classNames('button comments__showMore-btn', {
                             'comments__showMore-btn_hide': maxComments >= comments.length
                           }) } onClick={ () => this.handleMoreComments() }>
            show more
          </div>
        </section>
      </section>
      );
  }
}

const InputComments = ({Author, Text, PostDate, n}) => {
  let postDateTemp = new Date(PostDate);

  return (
    <div className="comment" key={ n }>
      <img className="comment__user-image" src="" alt="" />
      <div className="comment__desc">
        <p className="comment__author">
          { Author }<span className="comment__time">{ moment(postDateTemp, "YYYYMMDD").fromNow() }</span>
        </p>
        <p className="comment__text">
          { Text }
        </p>
      </div>
    </div>
    );
}

/*var fillComments = (count) => {
  let commentsBase = [];
  let authors = ['Lewis Carroll', 'Paulo Coelho', 'Joanne Rowling', 'Chack Pallaniuk'],
    commentText = 'Some text for comment base. To see, how they view on the screen. This is so disastar. And I doesn`t know, what I write, so please don`t be shine.';

  for (let i = count; i >= 0; i--) {
    commentsBase = [...commentsBase, {
      text: commentText,
      author: authors[Math.floor(Math.random() * authors.length)],
      postDate: new Date(2017, 11, 13, i + 1)
    }];
  }

  return commentsBase;
}*/