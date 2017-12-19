import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book.jsx';

import './BookSwitcher.scss';

class BookSwitcher extends Component {

  render() {
    const {categoryView, categoryName} = this.props;
    return (
      <Results categoryView={ categoryView } categoryName={ categoryName } books='5' />
      );
  }
}

class ViewBooksInHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switcher: '',
      touchStartPoint: 0,
      touchEndPoint: 0,
      currentBook: 0,
      stepSize: 0,
      visibleBook: 0,
      switchHideWidth: 1023
    }
  }

  initialSwitchVars(switcher) {
    if (!switcher) return;

    this.resetExistDots(switcher);

    let dots = document.createElement('div'),
      books = switcher.getElementsByClassName('book') || [],
      visibleBookCount = Math.floor(switcher.offsetWidth / (books[0].offsetWidth + 12)),
      dotCount = Math.ceil(books.length / visibleBookCount);

    for (let j = 0; j <= dotCount - 1; j++) {
      let dotElem = document.createElement('i');
      dotElem.className = j === 0 ? "fa fa-circle books-switcher__dot books-switcher__dot_active" : "fa fa-circle books-switcher__dot";
      dotElem.setAttribute("aria-hidden", "true");
      dots.appendChild(dotElem);
    }

    dots.className = 'books-switcher__dots';
    switcher.parentNode.appendChild(dots);

    this.setState({
      visibleBook: visibleBookCount
    });
    this.refs.dots = dots;
  }

  resetExistDots(switcher) {
    if (this.refs.dots) { // if dots already exist, remove from refs
      switcher.parentNode.removeChild(this.refs.dots);
      this.setState({
        currentBook: 0
      });
    }
  }

  onResizeSwitchVars() {
    const {switcher, dots} = this.refs;

    if (!switcher || !dots) return;

    const {switchHideWidth, currentBook, visibleBook} = this.state;

    let book = switcher.getElementsByClassName('book')[0] || '',
      visibleBookCount = Math.floor(switcher.offsetWidth / (book.offsetWidth + 12)), // 12 - margin around the book block (6-left, 6-right)
      stepSizeTemp = (book.offsetWidth + 12) * visibleBookCount,
      switcherStartTransform = -(stepSizeTemp * currentBook);

    this.setState({
      stepSize: stepSizeTemp
    });

    if (visibleBook !== visibleBookCount) { // reCreate dots, when the window can holds more books
      this.initialSwitchVars(switcher);
    }

    switcher.style = window.innerWidth > switchHideWidth ? 'transform: translate(0)' : 'transform: translate(' + switcherStartTransform + 'px, 0) translateZ(0)';
  }

  getSwitchPos(event) {
    const {switchHideWidth} = this.state;
    if (window.innerWidth > switchHideWidth) return;

    if (event.type === 'touchstart')
      this.setState({
        touchStartPoint: event.changedTouches[0].clientX
      });
    else if (event.type === 'touchend') {
      this.setState({
        touchEndPoint: event.changedTouches[0].clientX
      });
      this.endSwitchTransform(this._getTransformDirection(event.changedTouches[0].clientX));
    }
  }

  localSwitchTransform(event) {
    const {switchHideWidth} = this.state;
    if (window.innerWidth > switchHideWidth) return;

    const {touchStartPoint, currentBook, stepSize} = this.state;

    let directMove = event.changedTouches[0].clientX - touchStartPoint, // local switch coordinates, while touch is move
      switcherStartTransform = -(stepSize * currentBook), // position with which the switch is start
      theta = switcherStartTransform + directMove;

    this._confirmSwitchTransform(0, theta);
  }

  endSwitchTransform(directTransform) {
    const {currentBook, stepSize} = this.state;

    let switcherStartTransform = -(stepSize * currentBook), // position with which the switch is start
      theta = switcherStartTransform + stepSize * directTransform; // summary calc of switch size based on current transform, step size and direction

    this._confirmSwitchTransform(4, theta, true);
  }

  _getTransformDirection(touchEndPoint) {
    const {touchStartPoint} = this.state;

    return (touchStartPoint - touchEndPoint) === 0 ? 0 : (touchStartPoint - touchEndPoint) > 0 ? -1 : 1; // calc the direction based on start and end touch position
  }

  _checkTheta(theta) {
    const {switcher} = this.refs;
    const {stepSize, visibleBook} = this.state;

    let thetaT = theta,
      maxBooksOffset = stepSize * (Math.ceil(switcher.children.length / visibleBook) - 1) * -1;

    // if we reach the end or the start of switch position.
    // TODO change this mechanism on carusel
    if (theta <= (maxBooksOffset - stepSize)) {
      thetaT = stepSize * (Math.ceil(switcher.children.length / visibleBook) - 1) * -1;
    } else if (theta >= stepSize) {
      thetaT = 0;
    }

    return thetaT;
  }

  _confirmSwitchTransform(delay, theta, isMark) {
    const {switcher} = this.refs;
    const {stepSize} = this.state;

    if (!switcher) {
      console.log('switcher is not defined');
      return
    }

    let thetaR = this._checkTheta(theta);

    if (isMark) this._markDots(thetaR / -stepSize); // calc next position of active dot

    switcher.style.transform = 'translate(' + thetaR + 'px, 0) translateZ(0)';
    switcher.style.transition = 'transform .' + delay + 's ease-out';
  }

  _markDots(nextDot) {
    const {dots} = this.refs;
    const {currentBook} = this.state;

    let activeDot = dots.childNodes; // for dot mark active book

    activeDot[currentBook].className = 'fa fa-circle books-switcher__dot'; // make current dot inActive
    activeDot[nextDot].className += ' books-switcher__dot_active'; // make next dot Active
    this.setState({
      currentBook: nextDot
    }); // current = next;
  }

  componentDidMount() {
    const {switcher, books_block} = this.refs;

    this.initialSwitchVars(switcher); // from switch-book.js create dots equile count of books in category
    this.onResizeSwitchVars(); // from switch-book.js create dots equile count of books in category

    books_block.addEventListener('touchmove', (event) => this.localSwitchTransform(event), false);
    books_block.addEventListener('touchstart', (event) => this.getSwitchPos(event), false);
    books_block.addEventListener('touchend', (event) => this.getSwitchPos(event), false);
  }

  componentWillMount() {
    window && window.addEventListener("resize", () => this.onResizeSwitchVars(), false);
  }

  componentWillUnmount() {
    window && window.removeEventListener("resize", () => this.onResizeSwitchVars(), false);
  }

  render() {
    const {currentBook, visibleBook} = this.state,
      {books, categoryName} = this.props;

    let btnPrevView,
      btnNextView = true;

    if (currentBook === Math.floor(books.length / visibleBook)) {
      btnPrevView = true;
      btnNextView = false;
    } else if (currentBook === 0) {
      btnPrevView = false;
      btnNextView = true;
    } else {
      btnPrevView = true;
      btnNextView = true;
    }

    return (
      <div className="books home-page__books" ref="books_block">
        <div className="books-switcher find-switcher" ref="switcher">
          { books }
        </div>
        <div className={ btnPrevView ? "books-switcher__prev-button" : "books-switcher__prev-button books-switcher__prev-button_hide" } 
          onClick={ (directTransform) => this.endSwitchTransform(1) }></div>
        <div className={ btnNextView ? "books-switcher__next-button" : "books-switcher__next-button books-switcher__next-button_hide" } 
          onClick={ (directTransform) => this.endSwitchTransform(-1) }></div>
        <Link className="books-switcher__see-more" to={ { pathname: '/category-' + categoryName } }>
          more
        </Link>
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
    books[i] = <Book subClass={ props.categoryView ? 'category__book' : 'books-switcher__book' }
                 author='Paulo Coelho'
                 title='The Alchemist'
                 reviews={ 10 + i + ' reviews' }
                 description={ text }
                 cover='books-cover.png'
                 key={ i } />;
  }

  if (props.categoryView) {
    content = <ViewBooksInCategory books={ books } categoryName={ props.categoryName } />
  } else {
    content = <ViewBooksInHome books={ books } categoryName={ props.categoryName } />
  }


  return <div className="category__results-books">
           { content }
         </div>

}

export default BookSwitcher;
