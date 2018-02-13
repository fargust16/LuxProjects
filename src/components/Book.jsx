import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
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
        description: PropTypes.string,
        reviews: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {};

        this.onResizeEnd = this.onResizeEnd.bind(this);
    }

    handleSetLinesOfText(bookInfo, clampText) {
        if (!bookInfo || !clampText) return;

        let linesOfText = CalcLinesOfDesc(bookInfo, clampText, 14);

        this.setState({
            descLines: linesOfText
        });
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
        const {subClass, author, cover, title, description, reviews, id} = this.props;
        const {descLines} = this.state;

        return (
            <article className={classNames('book', subClass)}>
                <img src={`/images/${cover}`} className="book__cover" alt={title}/>
                <section ref={(div) => {
                    this._bookInfo = div
                }} className="book__info">
                    <Link to={`/books/view/${id}`} className="book__title">
                        {title}
                    </Link>
                    <div className="book__author">
                        {author}
                    </div>
                    {descLines
                        ? <ClampLines text={description}
                                      lines={descLines}
                                      ellipsis="..."
                                      lessText="Collapse"
                                      buttons={false}
                                      className="book__desc"
                                      ref={(div) => {
                                          this._clampText = div
                                      }}/>
                        : <div ref={(div) => {
                            this._clampText = div
                        }} className="book__desc">
                            {description}
                        </div>}
                    <div className="reviews book__reviews">
                        {reviews ? reviews.length : '0'} reviews
                    </div>
                </section>
            </article>
        )
    }
}

export default Book;

export const CalcLinesOfDesc = (parentBlock, textBlock, marginBot) => {
    let block = textBlock.element || textBlock; // for the next resize ref is equile ClampLines(), not the DOM element

    const _calcTextLineHeight = (textBlock) => {
        return parseInt(getComputedStyle(textBlock).lineHeight, 10)
    };

    let bookDescSize, bookDescLineHeight, descLines;
    bookDescSize = parentBlock.offsetHeight + parentBlock.offsetTop - (block.offsetTop + marginBot);
    bookDescLineHeight = _calcTextLineHeight(block);
    descLines = Math.floor(bookDescSize / bookDescLineHeight);

    return descLines;
};