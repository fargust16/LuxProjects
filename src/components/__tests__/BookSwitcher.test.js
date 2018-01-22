import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import BookSwitcher from '../BookSwitcher.jsx';

describe('A BookSwitcher suite', () => {
  it('Render without crash', () => {
    expect(
      shallow(<BookSwitcher />)
        .is('Results')
    ).toBe(true); // what`s wrong with this test!?
  }); 
})