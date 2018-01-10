import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { getBookText } from '../services/api';
import { withCookies, Cookies } from 'react-cookie';
import classNames from 'classnames';
import TextTruncate from 'react-text-truncate';

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
      textSize: 1
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
          text: book.text
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

/*  calcCountOfTextColsTT() {
    const {text} = this.state;

    let textBlockWidth = this._calcBlockOffsetWidth(this._bookText),
      countOfStrEl = Math.floor(textBlockWidth / 7.7);

    let textBlockHeight = this._calcBlockOffsetHeight(this._bookText),
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
  }*/


  calcCountOfTextCols() {
    let linesCount = Math.floor(this._calcBlockOffsetHeight(this._bookText) / 20);

    this.setState({
      textSize: linesCount
    })
  }


  _calcBlockOffsetWidth(block) {
    let paddings = parseInt(getComputedStyle(block).paddingRight, 10) + parseInt(getComputedStyle(block).paddingLeft, 10),
      bOffset = block.offsetWidth - paddings;

    return bOffset;
  }

  _calcBlockOffsetHeight(block) {
    let margins = parseInt(getComputedStyle(block).marginTop, 10) + parseInt(getComputedStyle(block).marginBottom, 10),
      bOffset = block.offsetHeight - margins;

    return bOffset;
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

    let pageClass = classNames('read-book__content', {
      'read-book__content_full-text': currentPage !== 0
    })

    //let textOnPage = text.substr(currentPage * textSize, textSize);

    let textOnPage = text;

    return (
      <main className="read-book other-pages__block">
        { currentPage === 0 ?
          <section className="main-header">
            <span className="main-header__text book__title">{ book.title }</span>
            <br />
            <span className="main-header__text book__author">{ book.author }</span>
          </section>
          : '' }
        <section ref={ (div) => {
                         this._bookText = div;
                       } } className={ pageClass }>
          <TextTruncate line={ textSize }
            truncateText="…"
            text={textOnPage}
            textTruncateChild={ <a href="#">Read on</a> } />
          <ControlButtons transformFunc={ (direct) => this.switchTextPage(1) }
            btnDirect={ -1 }
            btnSubClass="read-book__button"
            currentSwitchPos={ currentPage }
            endSwitchPos={ endOfSwitch } />
          <ControlButtons transformFunc={ (direct) => this.switchTextPage(-1) }
            btnDirect={ 1 }
            btnSubClass="read-book__button"
            currentSwitchPos={ currentPage }
            endSwitchPos={ endOfSwitch } />
        </section>
      </main>
      );
  }
}

export default withCookies(ReadBook);