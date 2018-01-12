import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { getBookText } from '../services/api';
import { withCookies, Cookies } from 'react-cookie';
import classNames from 'classnames';

import ReadMore from './ReadMore.jsx';
import { ControlButtons } from './ControlButtons.jsx';
import {ON_DOUBLE_READ_PAGE_WIDTH} from '../constants/UIConstants.js';

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
      currentPage: 0,
      currPageSize: 0,
      startReadPos: 0,
      endReadPos: 0,
      linesTemp: 0
    }

    this.calcCountOfTextCols = this.calcCountOfTextCols.bind(this);
  }

  switchTextPage(direct) {
    const {currentPage} = this.state;

    let curPageTemp = parseInt((currentPage + direct), 10);

    this.setState({
      currentPage: curPageTemp
    })

    this.calcCountOfTextCols(curPageTemp);
  }

  saveCurrPage(currentPage, startReadPos) {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    cookies.set('currentPage', currentPage, {
      path: '/books/read/' + bookId
    });

    cookies.set('startReadPos', startReadPos, {
      path: '/books/read/' + bookId
    });
  }

  calcCountOfTextColsTT(currentPage) {
    let curPage = parseInt(currentPage, 10);
    let pageSize = Math.floor(this._calcBlockOffsetHeight(this._bookCont, curPage) / 20);

    this.setState({
      currPageSize: pageSize
    })
  }

  calcCountOfTextCols(curPage) {
    const {text, endReadPos, startReadPos, currentPage} = this.state;

    let stringElemWidth = 8.6,
      stringHeigh = 20;

    let textBlockWidth = this._calcBlockOffsetWidth(this._bookCont),
      countOfElems = Math.floor(textBlockWidth / stringElemWidth);

    let textBlockHeight = this._calcBlockOffsetHeight(this._bookCont, curPage),
      countOfStr = Math.floor(textBlockHeight / stringHeigh);

    let currPageSizeTemp = countOfElems * countOfStr;

    while (text[currPageSizeTemp] !== ' ') {
      currPageSizeTemp++;

      if (currPageSizeTemp >= text.length) {
        console.log('main oops:', text);
        currPageSizeTemp = text.length;
        break;
      }
    }

    //console.log('elems: ' + countOfElems +'\ncols: '+ countOfStr + '\nSummary elems: ' + currPageSizeTemp)

    let startReadPosTemp;

    if (currentPage - parseInt(curPage, 10) === 0) {
      startReadPosTemp = startReadPos;
    } else if (currentPage - parseInt(curPage, 10) < 0) {
      startReadPosTemp = endReadPos;
    } else {
      startReadPosTemp = startReadPos - currPageSizeTemp;
    }

    let endReadPosTemp = startReadPosTemp + currPageSizeTemp;


    this.saveCurrPage(curPage, startReadPosTemp); // save to cookie pages data

    this.setState({
      currPageSize: currPageSizeTemp,
      startReadPos: startReadPosTemp,
      endReadPos: endReadPosTemp,
      linesTemp: countOfStr
    })
  }

  _calcBlockOffsetHeight(block, currentPage) {
    let header = !currentPage || currentPage === 0 ? 54 : 0
    let paddings = parseInt(getComputedStyle(block).paddingTop, 10) + parseInt(getComputedStyle(block).paddingBottom, 10),
      bOffset = block.offsetHeight - (paddings + header);

    return bOffset;
  }

  _calcBlockOffsetWidth(block) {
    let paddings = parseInt(getComputedStyle(block).paddingLeft, 10) + parseInt(getComputedStyle(block).paddingRight, 10),
      bOffset = block.offsetWidth - paddings;

    return bOffset;
  }

  componentWillMount() {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    let curPage = cookies.get('currentPage', {
        path: 'books/read/' + bookId
      }) || 0;

    let startReadPos = cookies.get('startReadPos', {
        path: 'books/read/' + bookId
      }) || 0;

    this.setState({
      currentPage: parseInt(curPage, 10),
      startReadPos: parseInt(startReadPos, 10)
    })
  }

  componentDidMount() {
    const {bookId} = this.props.match.params;

    getBookText(parseInt(bookId, 10)).then(
      book => {
        this.setState({
          book: book,
          text: book.text
        })
        this.calcCountOfTextCols(this.state.currentPage);
      }
    );
  }

  componentWillUnmount() {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    cookies.remove('currentPage', {
      path: '/books/read/' + bookId
    })

    cookies.remove('startReadPos', {
      path: '/books/read/' + bookId
    })
  }

  render() {
    const {book, text, currentPage, currPageSize, startReadPos, endReadPos, linesTemp} = this.state;

    let endOfSwitch = Math.floor(text.length / currPageSize);

    let pageClass = classNames('read-book__content', {
      'read-book__content_full-text': currentPage !== 0
    })

    let headerClass = classNames('main-header read-book__header', {
      'read-book__header_hide': currentPage !== 0
    })

    let textOnPage = text.substring(startReadPos, endReadPos);

    return (
      <main ref={ (div) => {
              this._bookCont = div;
            } } className="read-book other-pages__block">
        <section className={ headerClass }>
          <span className="main-header__text book__title">{ book.title }</span>
          <br />
          <span className="main-header__text book__author">{ book.author }</span>
        </section>
        <section className={ pageClass }>
        <BookPages pageCount={ window.innerWidth >= ON_DOUBLE_READ_PAGE_WIDTH ? 2 : 1 } text={ textOnPage } lines={linesTemp} />
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

const BookPages = ({pageCount, text, lines}) => {

  let textOnPage = Math.floor(text.length / pageCount),
    textArr = [],
    startRead = 0;

  while(text[textOnPage] !== ' ') {
    textOnPage++;

    if (textOnPage >= text.length) {
      //console.log('oops:', text);
      textOnPage = text.length;
      break;
    }
  }

  for (let i = 0; i < pageCount; i++) {
    textArr[i] = text.substr(startRead, textOnPage);
    startRead = textOnPage;
    textOnPage = text.length;
  }

  let content = null;

  content = textArr.map((el,i) => {
    return (
      <p className="read-book__page" key={i}>
        { el }
      </p>
    )
  })

  return (
    <div className="read-book__pages">
      { content }
    </div>
  )
}