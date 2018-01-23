import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import SignUp from '../SignUp.jsx';

describe('A SignUp suite', () => {
  it('Render without crash', () => {
    const wrapper = shallow(<SignUp />);

    expect(wrapper.is('form.sign-form')).toBe(true);
  });

  it('should calls callback when form is submit', () => {
    const callback = sinon.spy()
    const wrapper = shallow(<SignUp handleOnSignUp={callback} />);

    wrapper.find('form.sign-form').simulate('submit');

    expect(callback.called).toBe(true);
  });

  it('should calls callback when email changed', () => {
    const callback = sinon.spy()
    const wrapper = shallow(<SignUp handleChangeEmail={callback} />);

    wrapper.find('.sign-form__email').simulate('change');

    expect(callback.called).toBe(true);
  });

  it('should calls callback when password changed', () => {
    const callback = sinon.spy()
    const wrapper = shallow(<SignUp handleChangePswd={callback} />);

    wrapper.find('.sign-form__password').first().simulate('change');

    expect(callback.called).toBe(true);
  });

  it('should calls callback when confirm password changed', () => {
    const callback = sinon.spy()
    const wrapper = shallow(<SignUp handleChangeRePswd={callback} />);

    wrapper.find('.sign-form__password').last().simulate('change');

    expect(callback.called).toBe(true);
  });

  it('should calls callback when password changed', () => {
    const callback = sinon.spy()
    const wrapper = shallow(<SignUp handleChangeSignType={callback} />);

    wrapper.find('.sign-form__help').simulate('click');

    expect(callback.called).toBe(true);
  });
})