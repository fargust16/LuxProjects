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
		return (
			<div className={this.props.subClass ? "book " + this.props.subClass : "book"}>
				<img src={"./images/" + this.props.cover} className="book__cover" alt={this.props.title}/>
				<div className="book__info">
					<Link to="/book-description" className="book__title">{this.props.title}</Link>
					<p className="book__author">{this.props.author}</p>
					<p className="book__desc" ref="desc" style={{WebkitLineClamp: this.state.bookDescLines}}>{this.props.description}</p>
					<p className="reviews book__reviews">{this.props.reviews}</p>
				</div>
			</div>
		);
	}
}

export default Book;
