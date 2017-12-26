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
    let sumMark = calcRating(nextProps.rating),
      parseMark = (Math.round((sumMark * 10) / 5) * 5) / 10;

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
  let contentTemp = [];
  for (let i = 0; i < (maxMark * 2); i++) {
    let j = maxMark * 2 - i;
    contentTemp[i] = {
      "input": <input key={ j + maxMark * 2 }
                 type="radio"
                 id={ 'star' + (j / 2) }
                 name="rating"
                 value={ j / 2 }
                 checked={ currMark === j / 2 }
                 onChange={ onChange } />,
      "label": <label key={ j }
                 className={ j % 2 === 0 ? 'full' : 'half' }
                 htmlFor={ 'star' + (j / 2) }
                 title={ (j / 2) + ' stars' }></label>
    }
  }

  let content = [];
  let j = (contentTemp.length * 2) - 1;
  for (let i = contentTemp.length - 1; i >= 0; i--) {
    content[j] = contentTemp[i].label;
    j--;
    content[j] = contentTemp[i].input;
    j--;
  }
  return content;
}

const calcRating = (reviewArr) => {
  if (!reviewArr) return 0
  let mark = 0;
  reviewArr.map(elem => {
    return mark += parseInt(elem.Rating, 10);
  })
  return mark / reviewArr.length;
}