import 'jsdom-global/register';
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import sinon from 'sinon';

import FileInput from '../FileInput.jsx';

describe('A FileInput suite', () => {
    beforeEach(() => {
        global.window = {
            addEventListener: sinon.stub(),
            FileReader: sinon.stub()
        };
    });

    afterEach(() => {
        delete global.window;
    });

    it('Render without crash', () => {
        expect(
            shallow(<FileInput/>)
                .is('label.field.source')
        ).toBe(true);
    });

    it('show subClass, when it exist in props', () => {
        expect(
            shallow(<FileInput subClass="test-class"/>)
                .is('label.field.source.test-class')
        ).toBe(true);
    });

    it('should changed mark text when file is does not choosen', () => {
        const wrapper = mount(<FileInput/>);

        wrapper.find('.source__field').first().simulate('change');

        expect(wrapper.find('.source__title').text()).toBe('No file selected');
    });
})