import 'jsdom-global/register';
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

  it('should has close modif in className when props if undefined', () => {
    const wrapper = shallow(<Menu />);

    expect(wrapper.find('.menu_close').length).toBe(1);
  });

  it('should has open modif in className when props isShow = true', () => {
    const wrapper = shallow(<Menu menuIsOpen={true} />);

    expect(wrapper.find('.menu_open').length).toBe(1);
  });

  it('should render sign in link, when username is undefined', () => {
    const wrapper = shallow(<Menu />);

    expect(wrapper.find('.menu__profile-link').text()).toBe('Sign In');
  });

  it('should render sign out link, when username is define', () => {
    const username = 'test name';
    const wrapper = shallow(<Menu username={username} />);

    expect(wrapper.find('.menu__profile-link').text()).toBe('Sign Out');
  });

  it('should render 2 links with hide modif in className, when username is undefined', () => {
    const wrapper = shallow(<Menu />);

    expect(wrapper.find('.menu__option_hide').length).toBe(2);
  });

  it('should render all links without hide modif in className, when username is define', () => {
    const username = 'test name';
    const wrapper = shallow(<Menu username={username} />);

    expect(wrapper.find('.menu__option_hide').length).toBe(0);
  });

  it('should calls callback on logout click', () => {
    const callback = sinon.spy();
    const username = 'test name';
    const wrapper = shallow(<Menu username={username} handleLogOut={callback} />);

    wrapper.find('.menu__profile-link').simulate('click');

    expect(callback.called).toBe(true);
    expect(callback.calledOnce).toBe(true);
  });

  it('should calls callback on login click', () => {
    const callback = sinon.spy();
    const wrapper = shallow(<Menu handleShowAuthForm={callback} />);

    wrapper.find('.menu__profile-link').simulate('click');

    expect(callback.called).toBe(true);
    expect(callback.calledOnce).toBe(true);
  });

  it('should calls callback on li option click', () => {
    const callback = sinon.spy();
    const wrapper = shallow(<Menu handleDisplayMenu={callback} />);

    wrapper.find('.menu__option').first().simulate('click');

    expect(callback.called).toBe(true);
    expect(callback.calledOnce).toBe(true);
  });

  it('should should render 1 link, when define array with only 1 link in props', () => {
    const link = { name: 'test', path: '/' };
    const wrapper = shallow(<Menu menuLinks={[link]} />);

    expect(wrapper.find('.menu__option').length).toBe(1);
  });

  it('should should render 5 link, when props is undefined', () => {
    const wrapper = shallow(<Menu />);

    expect(wrapper.find('.menu__option').length).toBe(5);
  });

});