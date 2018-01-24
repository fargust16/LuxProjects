import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import AuthForm from '../AuthForm.jsx';

describe('A AuthForm suite', function() {
  it('should render without throwing an error', () => {
    const wrapper = shallow(<AuthForm />);

    expect(wrapper.is('.auth-form')).toBe(true);
  });

  it('should calls callback when click on cancel button', () => {
  	const callback = sinon.spy();
    const wrapper = shallow(<AuthForm onClose={callback} />);

    wrapper.find('.auth-form__cancel').simulate('click');

    expect(callback.called).toBe(true);
    expect(callback.calledOnce).toBe(true);
  });

  it('should set state showSignInForm = true when click on sign-in li element', () => {
    const wrapper = shallow(<AuthForm />);

    wrapper.find('.sign-in').simulate('click');

    expect(wrapper.state().showSignInForm).toBe(true);
  });

  it('should set state showSignInForm = false when click on sign-up li element', () => {
    const wrapper = shallow(<AuthForm />);

    wrapper.find('.sign-up').simulate('click');

    expect(wrapper.state().showSignInForm).toBe(false);
  });

  it('should show Sign In content, when showSignInForm is true ', () => {
    const wrapper = shallow(<AuthForm />);

    wrapper.find('.sign-in').simulate('click');

    expect(wrapper.find('SignIn').length).toBe(1);
  });

  it('should show Sign Up content, when showSignInForm is false ', () => {
    const wrapper = shallow(<AuthForm />);

    wrapper.find('.sign-up').simulate('click');

    expect(wrapper.find('SignUp').length).toBe(1);
  });
});