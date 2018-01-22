import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import Footer from '../Footer.jsx';

describe('A Footer suite', () => {
  beforeEach(() => {
    global.window = {
      addEventListener: sinon.stub()
    };
  });

  afterEach(() => {
    delete global.window;
  });


  it('Render without crash', () => {
    expect(
      shallow(<Footer />)
        .is('footer.footer')
    ).toBe(true);
  });
  
})