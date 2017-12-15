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
      currentBook: 0,
      stepSize: 0,
      visibleBook: 0,
      switchHideWidth: 1023
    }


    this.localSwitchBooks = this.localSwitchBooks.bind(this);
    this.getStartSwitchPos = this.getStartSwitchPos.bind(this);
    this.finishSwitchBooks = this.finishSwitchBooks.bind(this);

    this.createDots = this.createDots.bind(this);
    this.hideSwitchOnWidth = this.hideSwitchOnWidth.bind(this);
  }

  createDots(switcher) {
    if(!switcher) return;
    const { switchHideWidth, currentBook } = this.state;

    if(this.refs.dots) {
      switcher.parentNode.removeChild(this.refs.dots);
      this.setState({currentBook: 0});
    }

    let dots = document.createElement('div');
    dots.className = 'books-switcher__dots';

    let books = switcher.getElementsByClassName('book') || [];

    let visibleBookCount = Math.floor(switcher.offsetWidth / (books[0].offsetWidth + 12)),
        dotCount = Math.ceil(books.length / visibleBookCount);

    this.setState({visibleBook: visibleBookCount});

    for (let j = 0; j <= dotCount - 1; j++) {
      let dotElem = document.createElement('i');
      dotElem.className = j === 0 ? "fa fa-circle books-switcher__dot books-switcher__dot_active" : "fa fa-circle books-switcher__dot";
      dotElem.setAttribute("aria-hidden", "true");
      dots.appendChild(dotElem);
    }

    dots.className = window.innerWidth > switchHideWidth ? "books-switcher__dots books-switcher__dots_hide" : 'books-switcher__dots';
    switcher.parentNode.appendChild(dots);

    this.refs.dots = dots;
  }

  hideSwitchOnWidth() {
    const { switcher, dots } = this.refs;

    if(!switcher || !dots) return;

    const { switchHideWidth, stepSize, currentBook, visibleBook } = this.state;

    let book = switcher.getElementsByClassName('book')[0] || '';

    let visibleBookCount = Math.floor(switcher.offsetWidth / (book.offsetWidth + 12));

    this.setState({stepSize: ((book.offsetWidth + 12) * visibleBookCount)});
    let switcherStartTransform = -(stepSize * currentBook);

    if(visibleBook !== visibleBookCount) {
      this.createDots(switcher);
    }

    dots.className = window.innerWidth > switchHideWidth ? "books-switcher__dots books-switcher__dots_hide" : 'books-switcher__dots';
    switcher.style = window.innerWidth > switchHideWidth ? 'transform: translate(0)' : 'transform: translate('+ switcherStartTransform +'px, 0) translateZ(0)';
  }

  localSwitchBooks(event) {
    const { switcher } = this.refs;
    const { switchHideWidth, touchStartPoint, stepSize, currentBook } = this.state;
    if(window.innerWidth > switchHideWidth) return;

    let directMove = event.changedTouches[0].clientX - touchStartPoint, // local switch coordinates, while touch is move
        switcherStartTransform = -(stepSize * currentBook), // position with which the switch is start
        theta = switcherStartTransform + directMove;

    switcher.style.transform = 'translate(' + theta + 'px, 0) translateZ(0)';
    switcher.style.transition = 'transform 0s ease-out';
  }

  getStartSwitchPos(event) {
    const { switchHideWidth } = this.state;
    if(window.innerWidth > switchHideWidth) return;

    this.setState({touchStartPoint: event.changedTouches[0].clientX});
  }

  finishSwitchBooks(event){
    const { switcher, dots } = this.refs;
    const { switchHideWidth, touchStartPoint, currentBook, stepSize, visibleBook } = this.state;
    if(window.innerWidth > switchHideWidth) return;
    let switcherStartTransform = -(stepSize * currentBook), // position with which the switch is start
      activeDot = dots.childNodes, // for dot mark active book
      touchEndPoint = event.changedTouches[0].clientX,
      theta = 0;

    let directionTr = (touchStartPoint - touchEndPoint) === 0 ? 0 : (touchStartPoint - touchEndPoint) > 0 ? -1 : 1; // calc the direction based on start and end touch position

    theta += switcherStartTransform + stepSize * directionTr; // summary calc of switch size based on current transform, step size and direction
    // if we reach the end or the start of switch position.
    // TODO change this mechanism on carusel.
    if(theta <= stepSize * Math.ceil(switcher.children.length / visibleBook) * -1) { 
      theta = 0;
    }
    else if (theta > 0) {
      theta = stepSize * (Math.ceil(switcher.children.length / visibleBook) - 1) * -1;
    }

    let dotC = Math.round(theta / -stepSize); // offset begin with -272 or -350 in different client width

    activeDot[currentBook].className = 'fa fa-circle books-switcher__dot';
    activeDot[dotC].className += ' books-switcher__dot_active';
    this.setState({currentBook: dotC});

    switcher.setAttribute("data-startTransform", theta);

    switcher.style.transform = 'translate(' + theta + 'px, 0) translateZ(0)';
    switcher.style.transition = 'transform .4s ease-out';
  }

  componentDidMount(){
    const { createDots, hideSwitchOnWidth, localSwitchBooks, getStartSwitchPos, finishSwitchBooks } = this;
    const { switcher, dots } = this.refs;

    createDots(switcher, dots); // from switch-book.js create dots equile count of books in category
    hideSwitchOnWidth(); // from switch-book.js create dots equile count of books in category

    switcher.addEventListener('touchmove', (event) => localSwitchBooks(event) , false);
    switcher.addEventListener('touchstart', (event) => getStartSwitchPos(event) , false);
    switcher.addEventListener('touchend', (event) => finishSwitchBooks(event) , false);
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
        <Link className="books-switcher__see-more" to={{pathname: '/category-' + this.props.categoryName}}>more</Link>
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
