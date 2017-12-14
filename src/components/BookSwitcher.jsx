import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book.jsx';

import './BookSwitcher.scss';

class BookSwitcher extends Component {

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

class ViewBooksInHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switcher: '', 
      touchStartPoint: 0,
      switchHideWidth: 1023
    }


    this.localSwitchBooks = this.localSwitchBooks.bind(this);
    this.getStartSwitchPos = this.getStartSwitchPos.bind(this);
    this.finishSwitchBooks = this.finishSwitchBooks.bind(this);

    this.createDots = this.createDots.bind(this);
    this.hideSwitchOnWidth = this.hideSwitchOnWidth.bind(this);
  }

  createDots(switcherBlock, dotsBlock) {
    if(!switcherBlock || !dotsBlock) return;

    let switcherStartTransform;
    switcherStartTransform = -parseInt(getComputedStyle(switcherBlock).width, 10);
    switcherBlock.setAttribute("data-startTransform", switcherStartTransform);

    let books = switcherBlock.getElementsByClassName('book') || [];

    for (let j = 0; j <= books.length - 1; j++) {
      let dotElem = document.createElement('i');
      dotElem.className = j === 1 ? "fa fa-circle books-switcher__dot books-switcher__dot_active" : "fa fa-circle books-switcher__dot";
      dotElem.setAttribute("aria-hidden", "true");
      dotsBlock.appendChild(dotElem);
    }
    dotsBlock.className = window.innerWidth > this.state.switchHideWidth ? "books-switcher__dots books-switcher__dots_hide" : 'books-switcher__dots';
  }

  hideSwitchOnWidth() {
    let switcherBlock = this.refs.switcher,
        dotsBlock = this.refs.dots;
    if(!switcherBlock || !dotsBlock) return;

    let startTransform = parseInt(switcherBlock.getAttribute("data-startTransform"), 10);

    dotsBlock.className = window.innerWidth > this.state.switchHideWidth ? "books-switcher__dots books-switcher__dots_hide" : 'books-switcher__dots';
    switcherBlock.style = window.innerWidth > this.state.switchHideWidth ? 'transform: translate(0); overflow-x: auto; width: 100%' : 'transform: translate(' + startTransform +'px, 0) translateZ(0)';
    switcherBlock.setAttribute('data-startTransform', window.innerWidth > 768 ? '-350' : '-272');
  }

  localSwitchBooks(event, switcherBlock) {
    if(window.innerWidth > this.state.switchHideWidth) return;

    let directMove = event.changedTouches[0].clientX - this.state.touchStartPoint; // local switch coordinates, while touch is move

    let transformProp = 'transform', // prefix for transform at the different browser
      startTransform = parseInt(switcherBlock.getAttribute("data-startTransform"), 10), // position with which the switch is start
      theta = 0;

      theta = startTransform + directMove;

      switcherBlock.style[ transformProp ] = 'translate(' + theta + 'px, 0) translateZ(0)';
      switcherBlock.style.transition = 'transform 0s ease-out';
  }

  getStartSwitchPos(event) {
    if(window.innerWidth > this.state.switchHideWidth) return;

    this.setState({touchStartPoint: event.changedTouches[0].clientX});
  }

  finishSwitchBooks(event, switcherBlock, dotsBlock){
    if(window.innerWidth > this.state.switchHideWidth) return;
    let transformProp = 'transform',
      stepSize = parseInt(getComputedStyle(switcherBlock).width, 10), // step size of switch, when touch is end
      startTransform = parseInt(switcherBlock.getAttribute("data-startTransform"), 10), // position with which the switch is start
      activeDot = dotsBlock.childNodes, // for dot mark active book
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
      if(theta <= stepSize * switcherBlock.children.length * -1) { 
        theta = 0;
      }
      else if (theta > 0) {
        theta = stepSize * (switcherBlock.children.length - 1) * -1;
      }

      let dotC = (theta - stepSize) / -stepSize; // offset begin with -272 or -350 in different client width;

      activeDot[dotC-1].className += ' books-switcher__dot_active';

      switcherBlock.setAttribute("data-startTransform", theta);

    switcherBlock.style[ transformProp ] = 'translate(' + theta + 'px, 0) translateZ(0)';
    switcherBlock.style.transition = 'transform .4s ease-out';
  }

  componentDidMount(){
    const { createDots, hideSwitchOnWidth, localSwitchBooks, getStartSwitchPos, finishSwitchBooks } = this;
    const { switcher, dots } = this.refs;

    createDots(switcher, dots); // from switch-book.js create dots equile count of books in category
    hideSwitchOnWidth(); // from switch-book.js create dots equile count of books in category

    switcher.addEventListener('touchmove', (event, switcherBlock) => localSwitchBooks(event, switcher) , false);
    switcher.addEventListener('touchstart', (event) => getStartSwitchPos(event) , false);
    switcher.addEventListener('touchend', (event, switcherBlock, dotsBlock) => finishSwitchBooks(event, switcher, dots) , false);
  }

  componentWillMount() {
    window && window.addEventListener("resize", this.hideSwitchOnWidth, false);
  }

  componentWillUnmount() {
    window && window.removeEventListener("resize", this.hideSwitchOnWidth, false);
  }

  render() {
    return (
      <div className="books home-page__books">
        <div className="books-switcher find-switcher" ref="switcher">
          { this.props.books }
        </div>
        <div className="books-switcher__dots" ref="dots"></div>
        <Link className="books-switcher__see-more" to={{pathname: '/category-' + this.props.categoryName}}>see more</Link>
      </div>
    );
  }
}

var ViewBooksInCategory = (props) => {
  return (
    <div className="books category__books">
      { props.books }
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
  

  return <div className="category__results-books">
    {content}
  </div>
  
}

export default BookSwitcher;
