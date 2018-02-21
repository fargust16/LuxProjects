import 'jsdom-global/register';
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import sinon from 'sinon';

import CustomProvider from '../../CustomProvider.jsx';

import AddBook from '../AddBook.jsx';

describe('A AddBook suite', function () {
    it('should render without throwing an error', () => {
        const wrapper = mount(<CustomProvider>
            <AddBook/>
        </CustomProvider>);

        expect(wrapper.find('.add-book').length).toBe(1);
    });
});