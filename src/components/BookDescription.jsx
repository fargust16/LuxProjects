import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Comments from './Comments.jsx';

import './BookDescription.scss';

class BookDescription extends Component {

	constructor(props) {
		super(props);

		this.state = {
			
		}
	}

	render() {
		return (
			<article className="other-pages">
				<main className="book-description other-pages__block">
					<section className="book-description__info">
						<img className="book-description__book-cover" src="./images/books-cover.png" alt="book`s name" />
						<div className="book-description__main-info">
							<div className="book-description__title">The alchemist</div>
							<div className="book-description__author">Paulo Coelho</div>
							<section className="book-description__control-info">
								<div className="book-description__ISBN"><span>ISBN: </span><span>978-5-65273-876-8</span></div>
								<div className="book-description__pablish-date"><span>Pablishing date: </span><span>05.03.2001</span></div>
							</section>
							<div className="book-description__text" id="fill_text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum purus sed tristique. Pellentesque a lacinia augue. Mauris gravida urna eu neque interdum, et consectetur leo varius. Donec vitae posuere lorem, ac tincidunt ipsum. Maecenas auctor pretium ex, ac imperdiet dui pharetra in. Pellentesque justo est, cursus id pellentesque in, imperdiet eu velit. Ut rhoncus condimentum velit id tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean nisl turpis, dapibus aliquam tellus quis, blandit condimentum dolor. Maecenas dignissim euismod eros, et facilisis lorem pharetra et. Ut libero felis, tincidunt malesuada luctus id, aliquam in urna.
								Nunc nibh purus, tristique vitae nibh in, bibendum pharetra quam. Nam bibendum orci sed facilisis vestibulum. Integer ac facilisis quam. Aliquam et volutpat enim. Suspendisse turpis nisi, posuere ut auctor vel, aliquet ut erat. Sed convallis elementum faucibus. Nunc vel euismod sem. Maecenas egestas semper sapien, eu bibendum metus pharetra eget. In quis nisi orci. Vivamus non luctus nunc. Sed enim turpis, varius vel mattis quis, venenatis quis odio. Vivamus luctus a neque nec lacinia. Duis tempus sem tortor, vel rutrum augue tristique eget. Nulla eget enim ornare, ultricies risus vel, molestie turpis.
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum purus sed tristique. Pellentesque a lacinia augue. Mauris gravida urna eu neque interdum, et consectetur leo varius. Donec vitae posuere lorem, ac tincidunt ipsum. Maecenas auctor pretium ex, ac imperdiet dui pharetra in. Pellentesque justo est, cursus id pellentesque in, imperdiet eu velit. Ut rhoncus condimentum velit id tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean nisl turpis, dapibus aliquam tellus quis, blandit condimentum dolor. Maecenas dignissim euismod eros, et facilisis lorem pharetra et. Ut libero felis, tincidunt malesuada luctus id, aliquam in urna.
								Nunc nibh purus, tristique vitae nibh in, bibendum pharetra quam. Nam bibendum orci sed facilisis vestibulum. Integer ac facilisis quam. Aliquam et volutpat enim. Suspendisse turpis nisi, posuere ut auctor vel, aliquet ut erat. Sed convallis elementum faucibus. Nunc vel euismod sem. Maecenas egestas semper sapien, eu bibendum metus pharetra eget. In quis nisi orci. Vivamus non luctus nunc. Sed enim turpis, varius vel mattis quis, venenatis quis odio. Vivamus luctus a neque nec lacinia. Duis tempus sem tortor, vel rutrum augue tristique eget. Nulla eget enim ornare, ultricies risus vel, molestie turpis.
							</div>
							<span className="book-description__text-more">see more</span>
						</div>				
					</section>
					<div className="book-description__reviews">
						<fieldset className="book-description__rating">
							<input type="radio" id="star5" name="rating" value="5" /><label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
							<input type="radio" id="star4half" name="rating" value="4 and a half" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
							<input type="radio" id="star4" name="rating" value="4" /><label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
							<input type="radio" id="star3half" name="rating" value="3 and a half" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
							<input type="radio" id="star3" name="rating" value="3" /><label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
							<input type="radio" id="star2half" name="rating" value="2 and a half" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
							<input type="radio" id="star2" name="rating" value="2" /><label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
							<input type="radio" id="star1half" name="rating" value="1 and a half" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
							<input type="radio" id="star1" name="rating" value="1" /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
							<input type="radio" id="starhalf" name="rating" value="half" /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
						</fieldset>
						<span className="reviews book-description__reviews-count">125 reviews</span>
					</div>
					<div className="book-description__buttons">
						<Link to="/read-book" className="book-description__button button btn-read">start reading now</Link>
						<Link to="#download" className="book-description__button button btn-download">download</Link>
					</div>
				</main>

				<Comments />

			</article>
		);
	}
}

export default BookDescription;