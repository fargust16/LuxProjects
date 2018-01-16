import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookActions from '../actions/BookActions';

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
      currentPage: 0,
      endOfSwitch: 0,
      resizeEnd: 0
    }

    this.handleOnResizeReadOffset = this.handleOnResizeReadOffset.bind(this);
    this.onResizeEnd = this.onResizeEnd.bind(this);
  }

  switchTextPage(direct) {
    const {currentPage} = this.state;
    let curPageTemp = parseInt((currentPage + direct), 10);

    this.setState({
      currentPage: curPageTemp
    })

    this.handleSuperFunctionPlsWork(curPageTemp, direct);
  }

  saveCurrPage(readOffset) {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    cookies.set('readOffset', readOffset, {
      path: '/books/read/' + bookId
    });
  }

  handleOnResizeReadOffset() {
    const {readOffset} = this.state;

    this.handleChangeBookSize();

    this._bWithText.style = 'transform: translateY(' + -readOffset + 'px)';
  }

  handleChangeBookSize() {
    this._bookCont.style.height = '100%';

    let contentSize = this._calcBlockOffsetHeight(this._bookCont),
      sizeOfStr = 20,
      rountContSize = contentSize - (contentSize % sizeOfStr);

    this._bookCont.style.height = rountContSize + 'px';

    this._defineFirstCalcReadOffset();
    this.calcEndOfSwitch();
  }


  _defineFirstCalcReadOffset() {
    const {readOffset} = this.state;

    let bOffset = this._calcBlockOffsetHeight(this._bookCont) * 2,
      rOffset = parseInt(readOffset, 10),
      curPage = Math.ceil(rOffset / bOffset);

    this.setState({
      currentPage: curPage,
      readOffset: rOffset
    })

    //console.log('bOffset: ' + bOffset + '\nrOffset: ' + rOffset + '\ncurPage: ' + curPage);
  }

  _calcBlockOffsetHeight(block) {
    let paddings = parseInt(getComputedStyle(block).paddingTop, 10) + parseInt(getComputedStyle(block).paddingBottom, 10),
      bOffset = block.offsetHeight - paddings;

    return bOffset;
  }

  _calcBlockOffsetWidth(block) {
    let gaps = 50;
    let paddings = parseInt(getComputedStyle(block).paddingLeft, 10) + parseInt(getComputedStyle(block).paddingRight, 10),
      bOffset = block.offsetWidth - (paddings + gaps);

    return bOffset;
  }

  handleSuperFunctionPlsWork(curPage, direct) {
    const {readOffset} = this.state;
    let bOffset = this._calcBlockOffsetHeight(this._bookCont) * 2,
      readOffsetT = readOffset + bOffset * direct;

    if(readOffsetT < 0) readOffsetT = 0;

    //console.log('curPage: ' + curPage + '\nreadOffset: ' + readOffsetT + '\nbOffset: ' + bOffset);

    this._bWithText.style = 'transform: translateY(' + -readOffsetT + 'px)';

    this.setState({
      readOffset: readOffsetT
    })

    this.saveCurrPage(readOffsetT); // save to cookie pages data
  }

  calcEndOfSwitch() {
    let textOffset = this._calcBlockOffsetHeight(this._bWithText),
      bOffset = this._calcBlockOffsetHeight(this._bookCont) * 2,
      endOfSwitch = Math.floor(textOffset / bOffset);

    this.setState({
      endOfSwitch: endOfSwitch
    })

    //console.log('full: ' + textOffset +'\nblock: '+ bOffset +'\nend: '+ endOfSwitch)
  }

  onResizeEnd() {
    const {resizeEnd} = this.state;

    clearTimeout(resizeEnd);

    this.setState({
      resizeEnd: setTimeout(this.handleOnResizeReadOffset, 100)
    });
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

    window && window.addEventListener('resize', this.onResizeEnd, true);
  }

  componentDidMount() {
    const {bookId} = this.props.match.params;

    this.props.bookActions.handleGetBookInfo(parseInt(bookId, 10));
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.fetching) {
      this.handleOnResizeReadOffset();
    }
  }

  componentWillUnmount() {
    const {bookId} = this.props.match.params;
    const {cookies} = this.props;

    cookies.remove('startReadPos', {
      path: '/books/read/' + bookId
    })

    cookies.remove('readOffset', {
      path: '/books/read/' + bookId
    })

    window && window.removeEventListener('resize', this.onResizeEnd, true);
  }

  render() {
    const {currentPage, endOfSwitch} = this.state;
    const {book} = this.props.books;

    let pageClass = classNames('read-book__content', {
      'read-book__content_full-text': currentPage !== 0
    })

    /*let headerClass = classNames('main-header read-book__header', {
      'read-book__header_hide': currentPage !== 0
    })*/

    return (
      <main className="read-book other-pages__block">
        <section ref={ (div) => {
                         this._bookCont = div;
                       } } className={ pageClass }>
          <div ref={ (div) => {
                       this._bWithText = div
                     } }>
            { book.text }
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

function mapStateToProps(state) {
  return {
    books: state.books
  }
}

function mapDispatchToProps(dispatch) {
  return {
    bookActions: bindActionCreators(bookActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ReadBook))