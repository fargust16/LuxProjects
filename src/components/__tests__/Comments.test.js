import 'jsdom-global/register';
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import sinon from 'sinon';

import Comments from '../Comments.jsx';

describe('A comments suite', () => {
    beforeEach(() => {
        global.window = {
            addEventListener: sinon.stub()
        };
    });

    afterEach(() => {
        delete global.window;
    });


    it('render without crash', () => {
        expect(
            shallow(<Comments/>)
                .is('section.comments.other-pages__comments')
        ).toBe(true);
    });

    it('should pass a selected value to the onChange handler', () => {
        const value = 'Hi, guys';
        const wrapper = shallow(
            <Comments newCommentText={value}/>
        );

        expect(wrapper.find('.new-comment__text').filterWhere((item) => {
            return item.prop('value') === value;
        }).length).toBe(1);
    });

    it('should not show AuthForm when render', () => {
        const wrapper = shallow(
            <Comments/>
        );

        expect(wrapper.find('AuthForm').length).toBe(0);
    });

    it('should show buttons when props buttonIsShow = true', () => {
        const wrapper = shallow(
            <Comments buttonsIsShow={true}/>
        );

        expect(wrapper.find('.new-comment__buttons_hide').length).toBe(0);
    });

    it('should not show buttons when render', () => {
        const wrapper = shallow(
            <Comments/>
        );

        expect(wrapper.find('.new-comment__buttons_hide').length).toBe(1);
    });

    it('should btn-send be disabled when click on textarea and props newCommentText is empty', () => {
        const disabled = true;
        const wrapper = shallow(
            <Comments newCommentText=""/>
        );

        wrapper.find('textarea').simulate('focus');

        expect(wrapper.find('button.btn-send').filterWhere((item) => {
            return item.prop('disabled') === disabled;
        }).length).toBe(1);
    });

    it('should btn-send be enabled when textarea contain some text', () => {
        const value = 'Hi, guys';
        const disabled = false;
        const wrapper = shallow(
            <Comments newCommentText={value}/>
        );

        expect(wrapper.find('button.btn-send').filterWhere((item) => {
            return item.prop('disabled') === disabled;
        }).length).toBe(1);
    });

    it('should not contain any comments when render without props', () => {
        const wrapper = shallow(
            <Comments/>
        );

        expect(wrapper.find('InputComments').length).toBe(0);
    });

    it('should contain 1 comment when post something', () => {
        const comment = {
            id: 1,
            text: 'Hi, guys!',
            author: 'fargust16@mail.ru',
            post_date: '2018-02-11'
        };

        const wrapper = shallow(
            <Comments comments={[comment]}/>
        );

        expect(wrapper.find('InputComments').length).toBe(1);
    });

});