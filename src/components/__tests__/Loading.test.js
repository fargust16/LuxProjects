import React from 'react';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';

import Loading from '../Loading.jsx';

describe('A Loading suite', () => {
  it('Render without crash', () => {
    expect(
      shallow(<Loading />)
        .is('div.cssload-thecube')
    ).toBe(true);
  });
})