import 'jsdom-global/register';
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import sinon from 'sinon';

import Option from '../Option.jsx';

describe('A Option suite', function () {
    beforeEach(() => {
        global.window = {
            addEventListener: sinon.stub()
        };
    });

    afterEach(() => {
        delete global.window;
    });

    it('should render without throwing an error', () => {
        expect(
            shallow(<Option/>)
                .is('section.option'))
            .toBe(true);
    });

    it('should not render buttons when props is undefined', () => {
        const wrapper = shallow(<Option/>);

        expect(wrapper.find('button.option__button').length).toBe(0);
    });

    it('should render 2 buttons when props needButtons = true', () => {
        const wrapper = shallow(<Option needButtons={true}/>);

        expect(wrapper.find('button.option__button').length).toBe(2);
    });

    it('should calls callback when click on cancel button', () => {
        const wrapper = mount(<Option onCancel={sinon.stub()} needButtons={true}/>);
        const inst = wrapper.instance();
        const callback = sinon.spy(inst, 'handleShowExternalOptions');

        inst.forceUpdate();

        wrapper.find('.button').first().simulate('click');

        expect(callback.called).toBe(true);
    });

});