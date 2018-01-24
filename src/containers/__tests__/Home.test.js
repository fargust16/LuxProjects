import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import CustomProvider from '../../CustomProvider.jsx';
import Home from '../Home.jsx';

describe('A Home suite', function() {
  beforeEach(() => {
    global.localStorage = sinon.stub();
  });

  afterEach(() => {
    delete global.localStorage;
  });

  it('should render without throwing an error', () => {
    const params = {params: ''};
    const wrapper = mount(
      <CustomProvider>
        <Home  match={params} />
      </CustomProvider>
    );

    expect(wrapper.find('.home').length).toBe(1);
  });
});