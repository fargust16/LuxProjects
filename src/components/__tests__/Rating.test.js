import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import Rating from '../Rating.jsx';

describe('A Rating suite', () => {
  it('Render without crash', () => {
    const wrapper = shallow(<Rating />);
    
    expect(wrapper.is('fieldset.rating')).toBe(true);
  });
  
  it('should render StructRatingControls component', () => {
    const wrapper = shallow(<Rating />);

    expect(wrapper.find('StructRatingControls').length).toBe(1);
  })
})