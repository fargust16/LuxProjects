import React, { Component } from 'react';
import { getBookText } from '../services/api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import classNames from 'classnames';

import { ControlButtons } from './ControlButtons.jsx';

import './ReadBook.scss';

class ReadBook extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      book: {},
      text: ' ',
      textOnPage: '',
      currentPage: 0,
      textSize: 500
    }

    this.calcCountOfTextCols = this.calcCountOfTextCols.bind(this);
  }

  componentWillMount() {
    const {bookId} = this.props.match.params;
    window && window.addEventListener('resize', this.calcCountOfTextCols, false);

    const {cookies} = this.props;

    let curPage = cookies.get('currentPage', {
        path: 'books/read/' + bookId
      }) || 0

    //console.log(curPage);

    this.setState({
      currentPage: parseInt(curPage, 10)
    })
  }

  componentDidMount() {
    const {bookId} = this.props.match.params;
    //const {cookies} = this.props;

    getBookText(parseInt(bookId, 10)).then(
      book => {
        this.setState({
          book: book,
          text: book.Text
        })
        this.calcCountOfTextCols();
      }
    );
  }

  switchTextPage(direct) {
    //const {bookId} = this.props.match.params;
    const {currentPage} = this.state;

    let curPageTemp = currentPage + direct;

    this.setState({
      currentPage: curPageTemp
    })

    this.saveCurrPage(curPageTemp);
  }

  saveCurrPage(currentPage) {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    cookies.set('currentPage', currentPage, {
      path: '/books/read/' + bookId
    });
  }

  calcCountOfTextCols() {
    const {text} = this.state;

    let textBlockWidth = parseInt(getComputedStyle(this._bookText).width, 10),
      countOfStrEl = Math.floor((textBlockWidth - 30) / 7.9);

    let textBlockHeight = parseInt(getComputedStyle(this._bookText).height, 10),
      countOfStr = Math.floor(textBlockHeight / 20);

    let textSizeTemp = countOfStrEl * countOfStr;

    while (text[textSizeTemp] !== ' ') {
      textSizeTemp--;

      if (textSizeTemp <= 0) {
        console.log(text);
        textSizeTemp = 1;
        break;
      }
    }

    //console.log('width: ' + countOfStrEl + '\nheight: ' + countOfStr + '\ntextSize: ' + textSizeTemp);

    this.setState({
      textSize: textSizeTemp
    })
  }

  componentWillUnmount() {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    cookies.remove('currentPage', {
      path: '/books/read/' + bookId
    })

    window && window.removeEventListener('resize', this.calcCountOfTextCols, false);
  }

  render() {
    const {book, text, currentPage, textSize} = this.state;

    let endOfSwitch = Math.floor(text.length / textSize);

    let pageClass = classNames('ReadBook__content', {
      'ReadBook__content_full-text': currentPage !== 0
    })

    let textOnPage = text.substr(currentPage * textSize, textSize);

    return (
      <main className="ReadBook other-pages__block">
        { currentPage === 0 ?
          <section className="main-header">
            <span className="main-header__text Book__title">{ book.Title }</span>
            <br />
            <span className="main-header__text Book__author">{ book.Author }</span>
          </section>
          : '' }
        <section ref={ (div) => {
                         this._bookText = div;
                       } } className={ pageClass }>
          <TextPage text={ textOnPage } />
          <ControlButtons transformFunc={ (direct) => this.switchTextPage(1) }
            btnDirect={ -1 }
            btnSubClass="ReadBook__button"
            currentSwitchPos={ currentPage }
            endSwitchPos={ endOfSwitch } />
          <ControlButtons transformFunc={ (direct) => this.switchTextPage(-1) }
            btnDirect={ 1 }
            btnSubClass="ReadBook__button"
            currentSwitchPos={ currentPage }
            endSwitchPos={ endOfSwitch } />
        </section>
      </main>
      );
  }
}

const TextPage = ({text}) => {
  return (
    <p>
      { text }
    </p>
  )
}

export default withCookies(ReadBook);