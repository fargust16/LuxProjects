import React, { Component } from 'react';
import * as Scroll from 'react-scroll';

import './Comments.scss';

var scroll = Scroll.animateScroll;

class Comments extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showComments: window.innerWidth >= 621 ? true : false,
			commentsOffset: 0
		}

		this.showComments = this.showComments.bind(this);
	}

	showComments() {
		if(window.innerWidth >= 621) return;
		this.setState({showComments: !this.state.showComments});

		if(!this.state.showComments) {
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

	componentWillMount() {
		window && window.addEventListener('resize', event => {
			this.setState({showComments: window.innerWidth >= 621 ? true : false});
		}, false);
	}

	render() {
		return (
			<section ref="comments_block" className="comments other-pages__comments">
				<div className={this.state.showComments ? "header_lines comments__header open-header" : "header comments__header close-header"} onClick={this.showComments}><span className="header__text">Comments</span></div>
				<section ref="comments_content" className={this.state.showComments ? "comments__content" : "comments__content comments__content_hide"}>
					<div className="new-comment comments__new-comment">
						<img className="comment__user-image" src="" alt=""/>
						<div className="new-comment__desc">
							<textarea className="field new-comment__text" placeholder="leave a comment"></textarea>
							<footer className="new-comment__buttons">
								<span className="new-comment__button btn-clear">Cancel</span>
								<span className="new-comment__button btn-send">Send comment</span>
							</footer>
						</div>
					</div>

					<div className="comment">
						<img className="comment__user-image" src="" alt=""/>
						<div className="comment__desc">
							<p className="comment__author">Chuck Pallaniuk <span className="comment__time">2 hours ago</span></p>
							<p className="comment__text">The best book ever! I love this author and his talent to write</p>
						</div>
					</div>

					<div className="comment">
						<img className="comment__user-image" src="" alt=""/>
						<div className="comment__desc">
							<p className="comment__author">Joanne Rowling <span className="comment__time">4 hours ago</span></p>
							<p className="comment__text">The best book ever! I love this author and his talent to write</p>
						</div>
					</div>

					<div className="comment">
						<img className="comment__user-image" src="" alt=""/>
						<div className="comment__desc">
							<p className="comment__author">Lewis Carroll <span className="comment__time">6 hours ago</span></p>
							<p className="comment__text">The best book ever! I love this author and his talent to write. It`s so ammazing to comment this post, this book. Oh I`m so lucky men.</p>
						</div>
					</div>

					<div className="comment">
						<img className="comment__user-image" src="" alt=""/>
						<div className="comment__desc">
							<p className="comment__author">Chuck Pallaniuk <span className="comment__time">12 hours ago</span></p>
							<p className="comment__text">The best book ever! I love this author and his talent to write</p>
						</div>
					</div>
				</section>
			</section>
		);
	}
}

export default Comments;