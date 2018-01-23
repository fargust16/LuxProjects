import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import SignIn from '../SignIn.jsx';

describe('A SignIn suite', () => {
  it('Render without crash', () => {
    const wrapper = shallow(<SignIn />);

    expect(wrapper.is('form.sign-form')).toBe(true);
  });

  it('should calls callback when form is submit', () => {
    const callback = sinon.spy()
    const wrapper = shallow(<SignIn handleOnSignIn={callback} />);

    wrapper.find('form.sign-form').simulate('submit');

    expect(callback.called).toBe(true);
  });

  it('should calls callback when email changed', () => {
    const callback = sinon.spy()
    const wrapper = shallow(<SignIn handleChangeEmail={callback} />);

    wrapper.find('.sign-form__email').simulate('change');

    expect(callback.called).toBe(true);
  });

  it('should calls callback when password changed', () => {
    const callback = sinon.spy()
    const wrapper = shallow(<SignIn handleChangePswd={callback} />);

    wrapper.find('.sign-form__password').simulate('change');

    expect(callback.called).toBe(true);
  });

  it('should show tips, when have any error and fetching is over', () => {
    const fetching = false;
    const error = 'some error';
    const isTipsShow = true;
    const wrapper = shallow(<SignIn fetching={fetching} error={error} isTipsShow={isTipsShow} />);

    expect(wrapper.find('.sign-form__tips_show').length).toBe(1);
  });

  it('should not show tips, when fetching is not over', () => {
    const fetching = true;
    const error = 'some error';
    const isTipsShow = true;
    const wrapper = shallow(<SignIn fetching={fetching} error={error} isTipsShow={isTipsShow} />);

    expect(wrapper.find('.sign-form__tips_show').length).toBe(0);
  });

  it('should not show tips, when has not any error', () => {
    const fetching = false;
    const error = '';
    const isTipsShow = true;
    const wrapper = shallow(<SignIn fetching={fetching} error={error} isTipsShow={isTipsShow} />);

    expect(wrapper.find('.sign-form__tips_show').length).toBe(0);
  });

  it('should not show tips, when user enter some new data', () => {
    const fetching = false;
    const error = 'some error';
    const isTipsShow = false;
    const wrapper = shallow(<SignIn fetching={fetching} error={error} isTipsShow={isTipsShow} />);

    expect(wrapper.find('.sign-form__tips_show').length).toBe(0);
  });

  it('should show loading, when fetching is true', () => {
    const fetching = true;
    const wrapper = shallow(<SignIn fetching={fetching} />);

    expect(wrapper.find('.sign-form__loading').length).toBe(1);
  });
  
})