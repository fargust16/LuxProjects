import React, { Component } from 'react';
import moment from 'moment';
import * as Scroll from 'react-scroll';

import './Comments.scss';

var scroll = Scroll.animateScroll;

var fillComments = (count) => {
	let commentsBase = [];
	let authors = ['Lewis Carroll', 'Paulo Coelho', 'Joanne Rowling', 'Chack Pallaniuk'],
			commentText = 'Some text for comment base. To see, how they view on the screen. This is so disastar. And I doesn`t know, what I write, so please don`t be shine.';

	for (let i = count; i >= 0; i--) {
		commentsBase = [ ...commentsBase, { text: commentText, author: authors[Math.floor(Math.random() * authors.length)], postDate: new Date(2017, 11, 13, i+1)} ];
	}

	return commentsBase;
}

class Comments extends Component {

	constructor(props) {
		super(props);
		let comTemp = fillComments(10);

		this.state = {
			showCom: window.innerWidth >= 621 ? true : false,
			showComBtns: false,
			commentsOffset: 0,
			comments: comTemp || [],
			commentText: ''
		}

		this.handleCommentTextChange = this.handleCommentTextChange.bind(this);

		this.showComments = this.showComments.bind(this);
		this.resizeWindow = this.resizeWindow.bind(this);
		this.postNewComment = this.postNewComment.bind(this);
		this.showCommentsButtons = this.showCommentsButtons.bind(this);
	}

	handleCommentTextChange(e) {
		this.setState({commentText: e.target.value});
	}

	showComments() {
		if(window.innerWidth >= 621) return;
		const { showCom } = this.state;
		this.setState({showCom: !showCom});

		if(!showCom) {
			this.setState({commentsOffset: window.pageYOffset});
			scroll.scrollTo(this.refs.comments_block.offsetTop - 45, {
			  duration: 500,
			  delay: 50,
			  smooth: true
			})
		} else {
			scroll.scrollTo(this.state.commentsOffset-1, {
			  duration: 0,
			  delay: 0
			})
		}
	}

	postNewComment() {
		const { comments, commentText } = this.state;
		if(commentText === '') return;

		let authors = ['Lewis Carroll', 'Paulo Coelho', 'Joanne Rowling', 'Chack Pallaniuk'];
		let authorTemp = authors[Math.floor(Math.random() * authors.length)];
		let postDate = new Date();

		this.setState({ 
			comments: [ { text: commentText, author: authorTemp, postDate: postDate }, ...comments ],
			commentText: '',
			showComBtns: false
		});
	}

	resizeWindow() {
		this.setState({showCom: window.innerWidth >= 621 ? true : false});
	}

	showCommentsButtons(isShow) {
		this.setState({showComBtns: isShow});
	}

	componentWillMount() {
		window && window.addEventListener('resize', this.resizeWindow, false);
	}

	componentWillUnmount() {
		window && window.removeEventListener('resize', this.resizeWindow, false);
	}

	render() {
		const { comments, showCom, showComBtns, commentText } = this.state;
		const { showCommentsButtons, postNewComment, handleCommentTextChange, showComments } = this;
		return (
			<section ref="comments_block" className="comments other-pages__comments">
				<div className={showCom ? "header_lines comments__header open-header" : "header comments__header close-header"} onClick={showComments}><span className="header__text">Comments</span></div>
				<section ref="comments_content" className={showCom ? "comments__content" : "comments__content comments__content_hide"}>
					<div className="new-comment comments__new-comment">
						<img className="comment__user-image" src="" alt=""/>
						<div className="new-comment__desc">
							<textarea className="field new-comment__text" placeholder="leave a comment" ref="comment_text" onFocus={(isShow) => showCommentsButtons(true)} onChange={(e) => handleCommentTextChange(e)} value={commentText}></textarea>
							<footer className={showComBtns ? "new-comment__buttons" : "new-comment__buttons new-comment__buttons_hide"}>
								<span className="new-comment__button btn-clear" onClick={(isShow) => showCommentsButtons(false)} >Cancel</span>
								<span className="new-comment__button btn-send" onClick={postNewComment}>Send comment</span>
							</footer>
						</div>
					</div>

					{ comments.map( (comment, i) => <InputComments author={comment.author} comment={comment.text} postDate={comment.postDate} n={i} key={i} /> ) }

				</section>
			</section>
		);
	}
}

class InputComments extends React.Component {
  render() {
    const { author, comment, postDate, n } = this.props;
    return ( 
    	<div className="comment" key={n}>
				<img className="comment__user-image" src="" alt=""/>
				<div className="comment__desc">
					<p className="comment__author">{author}<span className="comment__time">{moment(postDate, "YYYYMMDD").fromNow()}</span></p>
					<p className="comment__text">{comment}</p>
				</div>
			</div>
    );
  }
}

export default Comments;