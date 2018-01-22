import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import FadeIn from '../FadeIn.jsx';

describe('A FadeIn suite', () => {
  beforeEach(() => {
    global.window = {
      setTimeout: sinon.stub()
    };
  });

  afterEach(() => {
    delete global.window;
  });

  it('Render without crash', () => {
    expect(
      shallow(<FadeIn />)
        .is('div.transition-item')
    ).toBe(true);
  });

})