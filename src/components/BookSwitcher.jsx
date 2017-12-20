import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Book from './Book.jsx';

import './BookSwitcher.scss';

class BookSwitcher extends Component {

  render() {
    const {categoryId, categoryName, books} = this.props;

    if (this.props.books.length === 0) {
      return (<div>
                Please Wait!
              </div>);
    } else {
      return (
        <Results categoryId={ categoryId } categoryName={ categoryName } books={ books } />
        );
    }
  }
}

class ViewBooksInHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: this.props.books,
      switcher: '',
      touchStartPoint: 0,
      touchEndPoint: 0,
      currentStep: 0,
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

    this._dotsBlock = dots;
  }

  resetExistDots(switcher) {
    if (this._dotsBlock) { // if dots already exist, remove from refs

      switcher.parentNode.removeChild(this._dotsBlock);
      this.setState({
        currentStep: 0
      });
    }
  }

  onResizeSwitchVars() {
    if (!this._switcher || !this._dotsBlock) return;

    const {switchHideWidth, currentStep, visibleBook} = this.state;

    let book = this._switcher.getElementsByClassName('book')[0] || '',
      visibleBookCount = Math.floor(this._switcher.offsetWidth / (book.offsetWidth + 12)), // 12 - margin around the book block (6-left, 6-right)
      stepSizeTemp = (book.offsetWidth + 12) * visibleBookCount,
      switcherStartTransform = -(stepSizeTemp * currentStep);

    this.setState({
      stepSize: stepSizeTemp
    });

    if (visibleBook !== visibleBookCount) { // reCreate dots, when the window can holds more books
      this.initialSwitchVars(this._switcher);
    }

    this._switcher.style = window.innerWidth > switchHideWidth ? 'transform: translate(0)' : 'transform: translate(' + switcherStartTransform + 'px, 0) translateZ(0)';
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

    const {touchStartPoint, currentStep, stepSize} = this.state;

    let directMove = event.changedTouches[0].clientX - touchStartPoint, // local switch coordinates, while touch is move
      switcherStartTransform = -(stepSize * currentStep), // position with which the switch is start
      theta = switcherStartTransform + directMove;

    this._confirmSwitchTransform(0, theta);
  }

  endSwitchTransform(directTransform) {
    const {currentStep, stepSize} = this.state;

    let switcherStartTransform = -(stepSize * currentStep), // position with which the switch is start
      theta = switcherStartTransform + stepSize * directTransform; // summary calc of switch size based on current transform, step size and direction

    this._confirmSwitchTransform(4, theta, true);
  }

  _getTransformDirection(touchEndPoint) {
    const {touchStartPoint} = this.state;

    return (touchStartPoint - touchEndPoint) === 0 ? 0 : (touchStartPoint - touchEndPoint) > 0 ? -1 : 1; // calc the direction based on start and end touch position
  }

  _checkTheta(theta) {
    const {stepSize, visibleBook} = this.state;

    let thetaT = theta,
      maxBooksOffset = stepSize * (Math.ceil(this._switcher.children.length / visibleBook) - 1) * -1;

    // if we reach the end or the start of switch position.
    // TODO change this mechanism on carusel
    if (theta <= (maxBooksOffset - stepSize)) {
      thetaT = stepSize * (Math.ceil(this._switcher.children.length / visibleBook) - 1) * -1;
    } else if (theta >= stepSize) {
      thetaT = 0;
    }

    return thetaT;
  }

  _confirmSwitchTransform(delay, theta, isMark) {
    const {stepSize} = this.state;

    if (!this._switcher) {
      console.log('switcher is not defined');
      return
    }

    let thetaR = this._checkTheta(theta);

    if (isMark) this._markDots(thetaR / -stepSize); // calc next position of active dot

    this._switcher.style.transform = 'translate(' + thetaR + 'px, 0) translateZ(0)';
    this._switcher.style.transition = 'transform .' + delay + 's ease-out';
  }

  _markDots(nextDot) {
    const {currentStep} = this.state;

    let activeDot = this._dotsBlock.childNodes; // for dot mark active book

    activeDot[currentStep].className = 'fa fa-circle books-switcher__dot'; // make current dot inActive
    activeDot[nextDot].className += ' books-switcher__dot_active'; // make next dot Active
    this.setState({
      currentStep: nextDot
    }); // current = next;
  }

  componentDidMount() {
    if (!this._switcher) return

    this.initialSwitchVars(this._switcher); // from switch-book.js create dots equile count of books in category
    this.onResizeSwitchVars(); // from switch-book.js create dots equile count of books in category

    this._bookBlock.addEventListener('touchmove', (event) => this.localSwitchTransform(event), false);
    this._bookBlock.addEventListener('touchstart', (event) => this.getSwitchPos(event), false);
    this._bookBlock.addEventListener('touchend', (event) => this.getSwitchPos(event), false);
  }

  componentWillMount() {
    window && window.addEventListener("resize", () => this.onResizeSwitchVars(), false);
  }

  componentWillUnmount() {
    window && window.removeEventListener("resize", () => this.onResizeSwitchVars(), false);
  }

  render() {
    const {currentStep, visibleBook} = this.state,
      {books, categoryId} = this.props;

    let btnPrevView,
      btnNextView = true;

    if (currentStep === Math.floor((books.length-1) / visibleBook)) {
      btnPrevView = true;
      btnNextView = false;
    } else if (currentStep === 0) {
      btnPrevView = false;
      btnNextView = true;
    } else {
      btnPrevView = true;
      btnNextView = true;
    }

    return (
      <div className="books home-page__books" ref={ (div) => {
                                                this._bookBlock = div;
                                              } }>
        <div className="books-switcher find-switcher" ref={ (div) => {
                                                              this._switcher = div;
                                                            } }>
          { books }
        </div>
        <div className={ classNames('books-switcher__prev-button', {
                           'books-switcher__prev-button_hide': !btnPrevView
                         }, this.props.className) } onClick={ (directTransform) => this.endSwitchTransform(1) }></div>
        <div className={ classNames('books-switcher__next-button', {
                           'books-switcher__next-button_hide': !btnNextView
                         }, this.props.className) } onClick={ (directTransform) => this.endSwitchTransform(-1) }></div>
        <Link className="books-switcher__see-more" to={ { pathname: '/books/categories/' + categoryId } }>
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
  let content = null,
    booksCont = [],
    booksArr = props.books;

  for (let i = booksArr.length - 1; i >= 0; i--) {
    booksCont[i] = <Book subClass={ props.categoryId ? 'category__book' : 'books-switcher__book' }
                     author={ booksArr[i].Author }
                     title={ booksArr[i].Title }
                     reviews={ booksArr[i].Reviews.length + " Reviews" }
                     description={ booksArr[i].Text }
                     cover={ booksArr[i].Cover }
                     key={ i }
                     id={ booksArr[i].Id } />;
  }

  if (props.categoryId) {
    content = <ViewBooksInCategory books={ booksCont } categoryName={ props.categoryName } />
  } else {
    content = <ViewBooksInHome books={ booksCont } categoryId={ props.categoryId } categoryName={ props.categoryName } />
  }


  return <div className="category__results-books">
           { content }
         </div>

}

export default BookSwitcher;
