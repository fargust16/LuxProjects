import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import SignUp from '../SignUp.jsx';

describe('A SignUp suite', () => {
  it('Render without crash', () => {
    const wrapper = shallow(<SignUp />);

    expect(wrapper.is('form.sign-form')).toBe(true);
  });
  
})