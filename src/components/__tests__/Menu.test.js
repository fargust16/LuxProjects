import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import Menu from '../Menu.jsx';

describe('A Menu suite', function() {
  it('should render without throwing an error', () => {
    expect(
      shallow(<Menu />)
        .is('nav'))
      .toBe(true);
  });
});