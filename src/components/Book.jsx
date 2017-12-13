import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Book.scss';

class Book extends Component {

	constructor(props) {
		super(props);

		this.state = {
			bookDescLines: 0
		}

		this.bookDescResize = this.bookDescResize.bind(this);
	}

	bookDescResize(book) {
		if(!book.desc) return;
		let columnHeight = Math.ceil((book.desc.clientWidth - book.desc.offsetTop + 49) / 17);

		this.setState({bookDescLines: columnHeight});
	}

	componentWillReceiveProps() {
		window.addEventListener("resize", this.bookDescResize.bind(this.bookDescResize, this.refs));
		window.addEventListener("load", this.bookDescResize.bind(this.bookDescResize, this.refs));
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.bookDescResize);
		window.removeEventListener("load", this.bookDescResize);
	}

	render() {
		const { subClass, author, cover, title, description, reviews } = this.props;
		const { bookDescLines } = this.state;
		return (
			<div className={subClass ? "book " + subClass : "book"}>
				<img src={"./images/" + cover} className="book__cover" alt={title}/>
				<div className="book__info">
					<Link to="/book-description" className="book__title">{title}</Link>
					<p className="book__author">{author}</p>
					<p className="book__desc" ref="desc" style={{WebkitLineClamp: bookDescLines}}>{description}</p>
					<p className="reviews book__reviews">{reviews}</p>
				</div>
			</div>
		);
	}
}

export default Book;
