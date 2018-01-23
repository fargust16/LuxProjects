import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import SignIn from '../SignIn.jsx';

describe('A SignIn suite', () => {
  it('Render without crash', () => {
    const wrapper = shallow(<SignIn />);

    expect(wrapper.is('form.sign-form')).toBe(true);
  });

  
  
})