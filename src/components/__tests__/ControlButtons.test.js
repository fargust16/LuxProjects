import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import ControlButtons from '../ControlButtons.jsx';

describe('A ControlButtons suite', () => {
  it('Render without crash', () => {
    expect(
      shallow(<ControlButtons />)
        .is('div')
    ).toBe(true);
  });

  it('should contain class when send in props', () => {
    const wrapper = shallow(<ControlButtons btnSubClass='test-class' />)

    expect(wrapper.find('div.test-class').length).toBe(1);
  });

  it('should not contain btn-next button, when does not send props', () => {
    const wrapper = shallow(<ControlButtons />)

    expect(wrapper.find('div.btn-next').length).toBe(0);
  });

  it('should not contain btn-prev button, when does not send props', () => {
    const wrapper = shallow(<ControlButtons />)

    expect(wrapper.find('div.btn-prev').length).toBe(0);
  });

  it('should not contain hide subClass in btn-next, when direct = -1 and current !== end position', () => {
    const direct = -1;
    const currentPos = 0;
    const endPos = 1;
    const wrapper = shallow(<ControlButtons btnSubClass='test-class' btnDirect={direct} currentSwitchPos={currentPos} endSwitchPos={endPos} />)

    expect(wrapper.find('div.btn-next.test-class_hide').length).toBe(0);
  });

  it('should contain hide subClass in btn-next, when direct = -1 and current === end position', () => {
    const direct = -1;
    const currentPos = 1;
    const endPos = 1;
    const wrapper = shallow(<ControlButtons btnSubClass='test-class' btnDirect={direct} currentSwitchPos={currentPos} endSwitchPos={endPos} />)

    expect(wrapper.find('div.btn-next.test-class_hide').length).toBe(1);
  });

  it('should not contain hide subClass in btn-prev, when direct = 1 and current > 0 && end > 0', () => {
    const direct = 1;
    const currentPos = 1;
    const endPos = 1;
    const wrapper = shallow(<ControlButtons btnSubClass='test-class' btnDirect={direct} currentSwitchPos={currentPos} endSwitchPos={endPos} />)

    expect(wrapper.find('div.btn-prev.test-class_hide').length).toBe(0);
  });

  it('should contain hide subClass in btn-prev, when direct = 1 and current === 0 && end > 0', () => {
    const direct = 1;
    const currentPos = 0;
    const endPos = 1;
    const wrapper = shallow(<ControlButtons btnSubClass='test-class' btnDirect={direct} currentSwitchPos={currentPos} endSwitchPos={endPos} />)

    expect(wrapper.find('div.btn-prev.test-class_hide').length).toBe(1);
  }); 

  it('should once calls callback, on click event', () => {
    const callback = sinon.spy();
    const wrapper = shallow(<ControlButtons transformFunc={callback} />);

    wrapper.find('div').first().simulate('click');
    expect(callback.called).toBe(true);
    expect(callback.calledOnce).toBe(true);
  });
})