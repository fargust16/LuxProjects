import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ClampLines from 'react-clamp-lines';

import './Book.scss';

class Book extends Component {

  static defaultProps = {
    reviews: []
  };

  static propTypes = {
    categoryId: PropTypes.string,
    author: PropTypes.string,
    cover: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    reviews: PropTypes.array,
    id: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
    }

    this.onResizeEnd = this.onResizeEnd.bind(this);
  }

  handleSetLinesOfText() {
    if (!this._bookInfo || !this._clampText) return;

    let linesOfText = CalcLinesOfDesc(this._bookInfo, this._clampText, 14);

    this.setState({
      descLines: linesOfText
    })
  }

  onResizeEnd() {
    const {resizeEnd} = this.state;

    clearTimeout(resizeEnd);

    this.setState({
      resizeEnd: setTimeout(::this.handleSetLinesOfText, 300)
    });
  }

  componentDidMount() {
    this.handleSetLinesOfText(this._bookInfo, this._clampText);
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResizeEnd, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeEnd, false);
  }

  render() {
    const {subClass, author, cover, title, text, reviews, id} = this.props;
    const {descLines} = this.state;

    return (
      <article className={ classNames('book', subClass ) }>
        <img src={ "/images/" + (cover ? cover : '') } className="book__cover" alt={ title } />
        <section ref={ (div) => {
                         this._bookInfo = div
                       } } className="book__info">
          <Link to={ `/books/view/${id}` } className="book__title">
            { title }
          </Link>
          <div className="book__author">
            { author }
          </div>
          { descLines
            ? <ClampLines text={ text }
                lines={ descLines }
                ellipsis="..."
                lessText="Collapse"
                buttons={ false }
                className="book__desc"
                ref={ (div) => {
                        this._clampText = div
                      } } />
            : <div className="book__desc" ref={ (div) => {
                                                this._clampText = div
                                              } }>
                { text }
              </div> }
          <div className="reviews book__reviews">
            { reviews.length } reviews
          </div>
        </section>
      </article>
    )
  }
}

export default Book;

export const CalcLinesOfDesc = (parentBlock, textBlock, marginBot) => {
  let block = textBlock.element || textBlock // for the next resize ref is equile ClampLines(), not the DOM element

  const _calcTextLineHeight = (textBlock) => {
    return parseInt(getComputedStyle(textBlock).lineHeight, 10)
  };

  let bookDescSize = parentBlock.offsetHeight + parentBlock.offsetTop - (block.offsetTop + marginBot),
      bookDescLineHeight = _calcTextLineHeight(block),
      descLines = Math.floor(bookDescSize / bookDescLineHeight);

  //console.log('parentBlock.offsetHeight: ' + parentBlock.offsetHeight + '\nparentBlock.offsetTop: ' + parentBlock.offsetTop + '\nblock.offsetTop: ' + block.offsetTop + '\nbookDescSize: ' + bookDescSize) 

  return descLines;
}