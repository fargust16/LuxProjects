import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import CustomLink from '../CustomLink.jsx';

describe('A CustomLink suite', () => {
  it('Render without crash', () => {
    const wrapper = mount(<CustomLink />);

    expect(wrapper.find('div').length).toBe(1);
  });

/*  it('should calls callback when click on see more', () => {
    const wrapper = mount(<CustomLink />);
    const inst = wrapper.instance();
    const callback = sinon.spy(inst, 'handleRedirect');

    inst.forceUpdate();

    wrapper.find('div').simulate('click');

    expect(callback.called).toBe(true);
  });*/
})