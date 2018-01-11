import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

export default class BookPage extends Component {

  static propTypes = {
    bookText: PropTypes.string,
    currentPage: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      textSize: 0
    }

    this.calcCountOfTextCols = this.calcCountOfTextCols.bind(this);
  }

  calcCountOfTextCols() {
    let bookTextParent = this._bookView.scope.parentNode;
    let linesCount = Math.floor(this._calcBlockOffsetHeight(bookTextParent) / 20);

    console.log('blockHeight:', linesCount);

    this.setState({
      textSize: linesCount
    })
  }

  _calcBlockOffsetHeight(block) {
    let margins = parseInt(getComputedStyle(block).marginTop, 10) + parseInt(getComputedStyle(block).marginBottom, 10),
      bOffset = block.offsetHeight - margins;

    return bOffset;
  }

  componentWillReceiveProps(nextProps) {
    this.calcCountOfTextCols()
    console.log('currentPage:', nextProps.currentPage);
  }

  componentDidMount() {
    
  }

  componentWillMount() {
    window && window.addEventListener('resize', this.calcCountOfTextCols, false);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.calcCountOfTextCols, false);
  }

  render() {
    const {bookText, currentPage} = this.props;
    const {textSize} = this.state;

    return (
      <TextTruncate line={ textSize }
        truncateText="…"
        text={ bookText } />
    )
  }
}