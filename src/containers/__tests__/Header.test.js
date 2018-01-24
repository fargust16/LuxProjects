import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import CustomProvider from '../../CustomProvider.jsx';
import Header from '../Header.jsx';

describe('A Header suite', function() {
  beforeEach(() => {
    global.localStorage = sinon.stub();
  });

  afterEach(() => {
    delete global.localStorage;
  });

  it('should render without throwing an error', () => {
    const wrapper = mount(
      <CustomProvider>
        <Header />
      </CustomProvider>
    );

    expect(wrapper.find('.header-wrap').length).toBe(1);
  });

  it('should calls callback when click on menu-btn element', () => {
    const wrapper = mount(
      <CustomProvider>
        <Header />
      </CustomProvider>
    );
    const inst = wrapper.find('Header').instance();
    const callback = sinon.spy(inst, 'handleDisplayMenu');

    inst.forceUpdate();

    wrapper.find('.header__menu-btn').simulate('click');

    expect(callback.called).toBe(true);
  });

  it('should show open menu button when render', () => {
    const wrapper = mount(
      <CustomProvider>
        <Header />
      </CustomProvider>
    );

    expect(wrapper.find('.header__menu-btn_open').length).toBe(1);
  });

  it('should show menu-btn_close when click on menu-btn_open element', () => {
    const wrapper = mount(
      <CustomProvider>
        <Header />
      </CustomProvider>
    );

    wrapper.find('.header__menu-btn').simulate('click');
    expect(wrapper.find('.header__menu-btn_close').length).toBe(1);
  });
});