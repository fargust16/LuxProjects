import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { getBookText } from '../services/api';
import { withCookies, Cookies } from 'react-cookie';
import classNames from 'classnames';

import ReadMore from './ReadMore.jsx';
import { ControlButtons } from './ControlButtons.jsx';
import { ON_DOUBLE_READ_PAGE_WIDTH } from '../constants/UIConstants.js';

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
      avgStringElems: 0
    }

    this.avgCountOfStringElems = this.avgCountOfStringElems.bind(this);
  }

  switchTextPage(direct) {
    const {currentPage, readOffset} = this.state;
    let curPageTemp = parseInt((currentPage + direct), 10);

    this.setState({
      currentPage: curPageTemp
    })

    this.handleSuperFunctionPlsWork(curPageTemp);
  }

  saveCurrPage(readOffset) {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    cookies.set('readOffset', readOffset, {
      path: '/books/read/' + bookId
    });
  }

  avgCountOfStringElems(curPage) {
    const {text, currentPage} = this.state;

    let curPageTemp = curPage || currentPage;

    let stringElemWidth = 10,
      stringHeigh = 20;

    let textBlockWidth = this._calcBlockOffsetWidth(this._bookCont),
      countOfElems = Math.floor(textBlockWidth / stringElemWidth);

    let textBlockHeight = this._calcBlockOffsetHeight(this._bookCont),
      countOfStr = Math.floor(textBlockHeight / stringHeigh);

    let avgStringElemsTemp = countOfElems * countOfStr;

    this.setState({
      avgStringElems: avgStringElemsTemp
    })

    //console.log(avgStringElemsTemp);
    this.handleSuperFunctionPlsWork(curPageTemp);
  }

  _calcBlockOffsetHeight(block) {
    let paddings = parseInt(getComputedStyle(block).paddingTop, 10) + parseInt(getComputedStyle(block).paddingBottom, 10),
      bOffset = block.offsetHeight - paddings;

    return bOffset;
  }

  _calcBlockOffsetWidth(block) {
    let paddings = parseInt(getComputedStyle(block).paddingLeft, 10) + parseInt(getComputedStyle(block).paddingRight, 10),
      bOffset = block.offsetWidth - paddings;

    return bOffset;
  }

  handleSuperFunctionPlsWork(curPage) {
    let bOffset = this._calcBlockOffsetHeight(this._bookCont),
      readOffset = curPage * bOffset;

    //console.log('curPage: ' + curPage + '\nreadOffset: ' + readOffset + '\nbOffset: ' + bOffset);

    this._bWithText.style = 'transform: translateY(' + -readOffset + 'px)';

    this.setState({
      readOffset: readOffset
    })

    this.saveCurrPage(readOffset); // save to cookie pages data
  }

  componentWillMount() {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    let readOffset = cookies.get('readOffset', {
        path: 'books/read/' + bookId
      }) || 0;

    this.setState({
      readOffset: parseInt(readOffset, 10)
    })

    window && window.addEventListener('resize', this.avgCountOfStringElems, true);
  }

  componentDidMount() {
    const {bookId} = this.props.match.params;

    getBookText(parseInt(bookId, 10)).then(
      book => {
        this.setState({
          book: book,
          text: book.text
        })
        this._defineFirstCalcReadOffset();
      }
    );
  }

  _defineFirstCalcReadOffset() {
    const {readOffset} = this.state;
    let bOffset = this._calcBlockOffsetHeight(this._bookCont),
      rOffset = parseInt(readOffset, 10),
      curPage = Math.floor(rOffset / bOffset);

    this.setState({
      currentPage: curPage,
      readOffset: rOffset
    })

    this.avgCountOfStringElems(curPage);
  }

  componentWillUnmount() {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    cookies.remove('currentPage', {
      path: '/books/read/' + bookId
    })

    cookies.remove('readOffset', {
      path: '/books/read/' + bookId
    })

    window && window.removeEventListener('resize', this.avgCountOfStringElems, true);
  }

  render() {
    const {book, text, currentPage, avgStringElems} = this.state;

    let endOfSwitch = Math.ceil(text.length / avgStringElems);

    let pageClass = classNames('read-book__content', {
      'read-book__content_full-text': currentPage !== 0
    })

    let headerClass = classNames('main-header read-book__header', {
      'read-book__header_hide': currentPage !== 0
    })

    //console.log(text.substr(text.length - 10));

    return (
      <main ref={ (div) => {
              this._bookCont = div;
            } } className="read-book other-pages__block">
        <section className={ pageClass }>
          <div ref={ (div) => {
                       this._bWithText = div
                     } }>
            { text }
          </div>
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