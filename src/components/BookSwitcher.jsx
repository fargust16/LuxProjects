import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book.jsx';

import './BookSwitcher.scss';

class BookSwitcher extends Component {

	constructor(props) {
		super(props);

		this.state = {
			touchStartPoint: 0,
			switchHideWidth: 999
	  }


		this.localSwitchBooks = this.localSwitchBooks.bind(this);
    this.getStartSwitchPos = this.getStartSwitchPos.bind(this);
    this.finishSwitchBooks = this.finishSwitchBooks.bind(this);

    this._initialSwitchState = this._initialSwitchState.bind(this);
    this._createDots = this._createDots.bind(this);
    this._hideSwitchOnWidth = this._hideSwitchOnWidth.bind(this);
	}

	_initialSwitchState(widthScale) {
		this.setState({switchHideWidth: widthScale});
	}

	_createDots(switcherBlocks) {
		if(switcherBlocks.length === 0) return;
		let switcherStartTransform = [];

		for (let i = switcherBlocks.length - 1; i >= 0; i--) {
			switcherStartTransform[i] = -parseInt(getComputedStyle(switcherBlocks[i]).width, 10);

			switcherBlocks[i].setAttribute("data-startTransform", switcherStartTransform[i]);

			let dotsBlock = switcherBlocks[i].nextElementSibling || '';
			let books = switcherBlocks[i].getElementsByClassName('book') || '';

			for (let j = 0; j <= books.length - 1; j++) {
				let dotElem = document.createElement('i');

				dotElem.className = j === 1 ? "fa fa-circle books-switcher__dot books-switcher__dot_active" : "fa fa-circle books-switcher__dot";
				dotElem.setAttribute("aria-hidden", "true");

				dotsBlock.appendChild(dotElem);
			}
			dotsBlock.style.display = window.innerWidth >= this.state.switchHideWidth ? "none" : 'block';
		}
	}

	_hideSwitchOnWidth(switcherBlocks) {
		if(switcherBlocks.length === 0) return;

		for (let i = switcherBlocks.length - 1; i >= 0; i--) {
			let dotsBlock = switcherBlocks[i].nextElementSibling;
			let startTransform = parseInt(switcherBlocks[i].getAttribute("data-startTransform"), 10);

			dotsBlock.style.display = window.innerWidth > this.state.switchHideWidth ? "none" : 'block';
			switcherBlocks[i].style = window.innerWidth > this.state.switchHideWidth ? 'transform: translate(0); overflow-x: auto; width: 100%' : 'transform: translate(' + startTransform +'px, 0) translateZ(0)';
			switcherBlocks[i].setAttribute('data-startTransform', window.innerWidth > 767 ? '-350' : '-272');
		}
	}

	localSwitchBooks(switchElem, event) {
		if(window.innerWidth > this.state.switchHideWidth) return;

		let directMove = event.changedTouches[0].clientX - this.state.touchStartPoint; // local switch coordinates, while touch is move

		let transformProp = 'transform', // prefix for transform at the different browser
			startTransform = parseInt(switchElem.getAttribute("data-startTransform"), 10), // position with which the switch is start
			theta = 0;

	    theta = startTransform + directMove;

	    switchElem.style[ transformProp ] = 'translate(' + theta + 'px, 0) translateZ(0)';
	    switchElem.style.transition = 'transform 0s ease-out';
	}

	getStartSwitchPos(event) {
		if(window.innerWidth > this.state.switchHideWidth) return;

		this.setState({touchStartPoint: event.changedTouches[0].clientX});
	}

	finishSwitchBooks(switchElem, event){
		if(window.innerWidth > this.state.switchHideWidth) return;
		let transformProp = 'transform',
			stepSize = parseInt(getComputedStyle(switchElem).width, 10), // step size of switch, when touch is end
			startTransform = parseInt(switchElem.getAttribute("data-startTransform"), 10), // position with which the switch is start
			activeDot = switchElem.nextElementSibling.childNodes, // for dot mark active book
			touchEndPoint = event.changedTouches[0].clientX,
			theta = 0;

			for (let i = activeDot.length - 1; i >= 0; i--) {
				if(activeDot[i].className.search('books-switcher__dot_active') !== -1) {
					activeDot[i].className = 'fa fa-circle books-switcher__dot';
				}
			}

			let directionTr = (this.state.touchStartPoint - touchEndPoint) === 0 ? 0 : (this.state.touchStartPoint - touchEndPoint) > 0 ? -1 : 1; // calc the direction based on start and end touch position

			theta += startTransform + stepSize * directionTr; // summary calc of switch size based on current transform, step size and direction

			// if we reach the end or the start of switch position.
			// TODO change this mechanism on carusel.
			if(theta <= stepSize * switchElem.children.length * -1) { 
				theta = 0;
			}
			else if (theta > 0) {
				theta = stepSize * (switchElem.children.length - 1) * -1;
			}

			let dotC = (theta - stepSize) / -stepSize; // offset begin with -272 or -350 in different client width;

			activeDot[dotC-1].className += ' books-switcher__dot_active';

			switchElem.setAttribute("data-startTransform", theta);

		switchElem.style[ transformProp ] = 'translate(' + theta + 'px, 0) translateZ(0)';
		switchElem.style.transition = 'transform .4s ease-out';
	}

	componentDidMount() {
		let switchersArr = document.getElementsByClassName('find-switcher') || []; // every block which contain books

    this._initialSwitchState(1000); // from switch-book.js chose hideWidth;
    this._createDots(switchersArr); // from switch-book.js create dots equile count of books in category;
    this._hideSwitchOnWidth(switchersArr); // from switch-book.js create dots equile count of books in category;

    switchersArr = Array.from(switchersArr); // htmlCollection into array;
    switchersArr.map(elem => {
      elem.addEventListener('touchmove', this.localSwitchBooks.bind(this.localSwitchBooks, elem) , false);
      elem.addEventListener('touchstart', this.getStartSwitchPos.bind(this.getStartSwitchPos) , false);
      elem.addEventListener('touchend', this.finishSwitchBooks.bind(this.finishSwitchBooks, elem) , false);
      return 0;
    });    
	}

	componentWillMount() {
		let switchersArr = this.refs.switcher || []; // every block which contain books

    window.addEventListener("resize", this._hideSwitchOnWidth.bind(this._hideSwitchOnWidth, switchersArr));
	}

	componentWillUnmount() {
    window.removeEventListener("resize", this._hideSwitchOnWidth);
  }

  render() {
  	const { categoryView, categoryName } = this.props;
		return (
			<Results 
				categoryView = {categoryView}
				categoryName = {categoryName}
				books = '6'
			/>
		);
  }
}

var ViewBooksInHome = (props) => {
	return (
		<div className="books home-page__books">
			<div className="books-switcher find-switcher" refs="switcher">
				{	props.books }
			</div>
			<div className="books-switcher__dots"></div>
			<Link className="books-switcher__see-more" to={{pathname: '/category-' + props.categoryName}}>see more</Link>
		</div>
  );
}

var ViewBooksInCategory = (props) => {
	return (
		<div className="books category__books">
			{	props.books }
		</div>
  );
}

var Results = (props) => {
	let content = null;
	let books = [];
	let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum purus sed tristique. Pellentesque a lacinia augue. Mauris gravida urna eu neque interdum, et consectetur leo varius. Donec vitae posuere lorem, ac tincidunt ipsum. Maecenas auctor pretium ex, ac imperdiet dui pharetra in. Pellentesque justo est, cursus id pellentesque in, imperdiet eu velit. Ut rhoncus condimentum velit id tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean nisl turpis, dapibus aliquam tellus quis, blandit condimentum dolor. Maecenas dignissim euismod eros, et facilisis lorem pharetra et. Ut libero felis, tincidunt malesuada luctus id, aliquam in urna.";

	for (let i = props.books - 1; i >= 0; i--) {
		books[i] = <Book 
			subClass={props.categoryView ? 'category__book' : 'books-switcher__book'} 
			author='Paulo Coelho' 
			title='The Alchemist' 
			reviews={10 + i + ' reviews'}
			description={text}
			cover='books-cover.png'
			key={i}
		/>;
	}

	if(props.categoryView) {
		content = <ViewBooksInCategory books={books} categoryName={props.categoryName} />
	} else {
		content = <ViewBooksInHome books={books} categoryName={props.categoryName} />
	}
	

	return <div className="Results books">
		{content}
	</div>
	
}

export default BookSwitcher;
