import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import CustomProvider from '../../CustomProvider.jsx';
import Recent from '../Recent.jsx';

describe('A Recent suite', function() {
  it('should render without throwing an error', () => {
    const wrapper = mount(
      <CustomProvider>
        <Recent />
      </CustomProvider>
    );

    expect(wrapper.find('.recent').length).toBe(1);
  });
});