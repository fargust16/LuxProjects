import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import Category from '../Category.jsx';

describe('A Category suite', () => {

  it('Render without crash', () => {
    expect(
      shallow(<Category />)
        .is('section.category.main__category')
    ).toBe(true);
  });

})