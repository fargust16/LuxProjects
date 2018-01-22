import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import Book from '../Book.jsx';

describe('A book suite', () => {
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
      shallow(<Book />)
        .is('article.book')
    ).toBe(true);
  });

  it('show subClass, when it exist in props', () => {
    expect(
      shallow(<Book subClass="test-class" />)
        .is('article.book.test-class')
    ).toBe(true);
  });
  
})