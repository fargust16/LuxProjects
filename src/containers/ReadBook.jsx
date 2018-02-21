import React, {Component} from 'react';
import classNames from 'classnames';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bookActions from '../actions/BookActions';
import * as readBookActions from '../actions/ReadBookActions';

import ControlButtons from '../components/ControlButtons.jsx';

import './ReadBook.scss';

class ReadBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
          resizeActionEnd: 0
        };

        this.handleOnResizeReadOffset = this.handleOnResizeReadOffset.bind(this);
        this.onResizeEnd = this.onResizeEnd.bind(this);
    }

    switchTextPage(direct) {
        const {currentPage} = this.props.readBook;
        const {nextBookPage} = this.props.readBookActions;
        let curPageTemp = parseInt((currentPage + direct), 10);

        nextBookPage(curPageTemp);

        this.handleChangeReadOffset(curPageTemp, direct);
    }

    handleOnResizeReadOffset() {
        const {readOffset} = this.props.readBook;

        this.handleChangeBookSize();

        this._bWithText.style.transform = 'translateY(' + -readOffset + 'px)';
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
        const {readOffset} = this.props.readBook;
        const {nextBookPage, changeReadOffset} = this.props.readBookActions;

        let bOffset = this._calcBlockOffsetHeight(this._bookCont) * 2,
            rOffset = parseInt(readOffset, 10),
            curPage = Math.ceil(rOffset / bOffset);

        nextBookPage(curPage);
        changeReadOffset(rOffset);

        //console.log('bOffset: ' + bOffset + '\nrOffset: ' + rOffset + '\ncurPage: ' + curPage);
    }

    _calcBlockOffsetHeight(block) {
        let paddings, bOffset;
        paddings = parseInt(getComputedStyle(block).paddingTop, 10) + parseInt(getComputedStyle(block).paddingBottom, 10);
        bOffset = block.offsetHeight - paddings;

        return bOffset;
    }

    _calcBlockOffsetWidth(block) {
        let paddings, bOffset;
        paddings = parseInt(getComputedStyle(block).paddingLeft, 10) + parseInt(getComputedStyle(block).paddingRight, 10);
        bOffset = block.offsetWidth - paddings;

        return bOffset;
    }

    handleChangeReadOffset(curPage, direct) {
        const {readOffset} = this.props.readBook;
        const {changeReadOffset} = this.props.readBookActions;

        let bOffset = this._calcBlockOffsetHeight(this._bookCont) * 2,
            readOffsetT = readOffset + bOffset * direct;

        if (readOffsetT < 0) readOffsetT = 0;

        //console.log('curPage: ' + curPage + '\nreadOffset: ' + readOffsetT + '\nbOffset: ' + bOffset);

        this._bWithText.style = 'transform: translateY(' + -readOffsetT + 'px)';

        changeReadOffset(readOffsetT);
    }

    calcEndOfSwitch() {
        const {changeEndOfSwitch} = this.props.readBookActions;

        let textOffset = this._calcBlockOffsetHeight(this._bWithText),
            bOffset = this._calcBlockOffsetHeight(this._bookCont) * 2,
            endOfSwitch = Math.floor(textOffset / bOffset);

        changeEndOfSwitch(endOfSwitch);

        //console.log('full: ' + textOffset +'\nblock: '+ bOffset +'\nend: '+ endOfSwitch);
    }

    onResizeEnd() {
        const {resizeActionEnd} = this.state;

        clearTimeout(resizeActionEnd);
        this.setState({resizeActionEnd: setTimeout(this.handleOnResizeReadOffset, 100)})
    }

    componentWillMount() {
        window && window.addEventListener('resize', this.onResizeEnd, false);
    }

    componentDidMount() {
        const {bookId} = this.props.match.params;
        const {readOffset, currentPage} = this.props.readBook;

        let bHeight = this._calcBlockOffsetHeight(this._bookCont),
            bWidth = this._calcBlockOffsetWidth(this._bookCont);

        let forPos = bHeight * (bWidth / 50);

        let textParams = {
            fromPos: readOffset,
            forPos
        };

        console.log(textParams);
        this.props.bookActions.handleGetBookText(bookId, textParams);

        this.handleOnResizeReadOffset();
    }

    componentWillUnmount() {
        window && window.removeEventListener('resize', this.onResizeEnd, false);
    }

    render() {
        const {currentPage, endOfSwitch} = this.props.readBook;
        const {text} = this.props.book;

        let pageClass = classNames('read-book__content', {
            'read-book__content_full-text': currentPage !== 0
        });

        /*let headerClass = classNames('main-header read-book__header', {
          'read-book__header_hide': currentPage !== 0
        })*/

        return (
            <main className="read-book other-pages__block">
                <section ref={(div) => {
                    this._bookCont = div;
                }} className={pageClass}>
                    <div ref={(div) => {
                        this._bWithText = div
                    }}>
                        {text}
                    </div>
                    <ControlButtons transformFunc={() => this.switchTextPage(1)}
                                    btnDirect={-1}
                                    btnSubClass="read-book__button"
                                    currentSwitchPos={currentPage}
                                    endSwitchPos={endOfSwitch}/>
                    <ControlButtons transformFunc={() => this.switchTextPage(-1)}
                                    btnDirect={1}
                                    btnSubClass="read-book__button"
                                    currentSwitchPos={currentPage}
                                    endSwitchPos={endOfSwitch}/>
                </section>
            </main>
        );
    }
}

export default connect(
    state => ({
        book: state.books.readBook,
        load: state.load,
        readBook: state.readBook
    }),
    dispatch => ({
        bookActions: bindActionCreators(bookActions, dispatch),
        readBookActions: bindActionCreators(readBookActions, dispatch)
    })
)(ReadBook);