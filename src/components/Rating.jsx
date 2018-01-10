import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Rating.scss';

export default class Rating extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mark: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    let parseMark = calcRating(nextProps.rating);

    this.setState({
      mark: parseMark
    })
  }

  handleChangeRating(e) {
    this.setState({
      mark: parseFloat(e.target.value, 10)
    })
  }

  render() {
    const {mark} = this.state;

    return (
      <fieldset className="rating book-description__rating">
        <StructRatingControls maxMark="5" currMark={ mark } onChange={ (e) => this.handleChangeRating(e) } />
      </fieldset>
      );
  }
}

Rating.propTypes = {
  rating: PropTypes.array
}

const StructRatingControls = ({maxMark, onChange, currMark}) => {
  let contentTemp = [],
    marksCount = maxMark * 2, // full and half marks to maxMark value
    keyForStars = marksCount * 2; // key for stars. X2 because every star has input & label

  for (let i = 0; i < marksCount; i++) {
    let j = (marksCount - i) / 2; // star`s value: half - float, full - int

    contentTemp[i] = {
      "input": <input key={ --keyForStars }
                 type="radio"
                 id={ 'star' + j }
                 name="rating"
                 value={ j }
                 checked={ currMark === j }
                 onChange={ onChange } />,
      "label": <label key={ --keyForStars }
                 className={ j % 1 === 0 ? 'full' : 'half' }
                 htmlFor={ 'star' + j }
                 title={ j + ' stars' }></label>
    }
  }

  let content = [];

  contentTemp.forEach(star => {
    content.push(star.input);
    content.push(star.label);
  })

  return content;
};

const calcRating = (reviewArr) => {
  if (!reviewArr) return 0;

  let mark = 0;
  reviewArr.map(elem => {
    return mark += parseInt(elem.rating, 10);
  })

  let sumMark = mark / reviewArr.length,
    parseToHalf = Math.round(sumMark * 2) / 2; // calc avg of users mark to .5 or full

  //console.log('sum of Marks: ' + mark + '\ncount of Marks: ' + reviewArr.length + '\navg Mark: ' + sumMark + '\nround Mark: ' + parseToHalf);
  return parseToHalf;
};