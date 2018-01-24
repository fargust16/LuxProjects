import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import CustomProvider from '../../CustomProvider.jsx';
import Settings from '../Settings.jsx';

describe('A settings suite', function() {
  beforeEach(() => {
    global.localStorage = sinon.stub();
  });

  afterEach(() => {
    delete global.localStorage;
  });
  
  it('should render without throwing an error', () => {
    const wrapper = mount(
      <CustomProvider>
        <Settings />
      </CustomProvider>
    );

    expect(wrapper.find('.settings').length).toBe(1);
  });
});