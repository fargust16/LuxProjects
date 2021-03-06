import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';

import CustomProvider from '../../CustomProvider.jsx';
import Support from '../Support.jsx';

describe('A support suite', function() {
  it('should render without throwing an error', () => {
    const wrapper = mount(
      <CustomProvider>
        <Support />
      </CustomProvider>
    );

    expect(wrapper.find('.support').length).toBe(1);
  });
});