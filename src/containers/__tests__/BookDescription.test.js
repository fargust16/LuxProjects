import 'jsdom-global/register';
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import sinon from 'sinon';

import CustomProvider from '../../CustomProvider.jsx';
import BookDescription from '../BookDescription.jsx';

describe('A BookDescription suite', function () {
    beforeEach(() => {
        global.window = {
            addEventListener: sinon.stub()
        };
    });

    afterEach(() => {
        delete global.window;
    });

    it('should render without throwing an error', () => {
        const params = {params: 2};
        const wrapper = mount(
            <CustomProvider>
                <BookDescription match={params}/>
            </CustomProvider>
        );

        expect(wrapper.find('.book-description').length).toBe(1);
    });

    it('should calls callback when click on block with book`s text', () => {
        const params = {params: 2};
        const wrapper = mount(
            <CustomProvider>
                <BookDescription match={params}/>
            </CustomProvider>
        );
        const inst = wrapper.find('BookDescription').instance();
        const callback = sinon.spy(inst, 'handleShowMore');

        inst.forceUpdate();

        wrapper.find('.book-description__more-text').simulate('click');

        expect(callback.called).toBe(true);
    });
});