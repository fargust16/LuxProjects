import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import AddBook from '../AddBook.jsx';

describe('A AddBook suite', function() {
  it('should render without throwing an error', () => {
    const wrapper = shallow(<AddBook />);

    expect(wrapper.is('.add-book')).toBe(true);
  });
});