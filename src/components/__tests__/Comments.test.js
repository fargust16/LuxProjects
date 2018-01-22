import React from 'react';
import { shallow, mount, render } from 'enzyme';
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
      shallow(<Comments />)
        .is('section.comments.other-pages__comments')
    ).toBe(true);
  });

  it('should pass a selected value to the onChange handler', () => {
    const value = 'Hi, guys';
    const wrapper = shallow(
      <Comments />
    );

    wrapper.find('textarea').simulate('change', {
      target: {
        value
      },
    });

    expect(wrapper.state().commentText).toEqual(value);
  });

  it('should show AuthForm when click on textarea', () => {
    global.localStorage = sinon.stub();
    const wrapper = shallow(
      <Comments />
    );

    wrapper.find('textarea').simulate('click');

    expect(wrapper.find('AuthForm').length).toBe(1);
    delete global.localStorage;
  });

  it('should not show AuthForm when render', () => {
    const wrapper = shallow(
      <Comments />
    );

    expect(wrapper.find('AuthForm').length).toBe(0);
  });

  it('should show buttons when focus on textarea', () => {
    const wrapper = shallow(
      <Comments />
    );

    wrapper.find('textarea').simulate('focus');

    expect(wrapper.find('div.new-comment__buttons_hide').length).toBe(0);
  });

  it('should not show buttons when render', () => {
    const wrapper = shallow(
      <Comments />
    );

    expect(wrapper.find('div.new-comment__buttons_hide').length).toBe(1);
  });

  it('should not show buttons when click on cancel button', () => {
    const wrapper = shallow(
      <Comments />
    );

    wrapper.find('textarea').simulate('focus');
    wrapper.find('button.btn-clear').simulate('click');

    expect(wrapper.find('div.new-comment__buttons_hide').length).toBe(1);
  });

  it('should btn-send be disabled when click on textarea', () => {
    const disabled = true;
    const wrapper = shallow(
      <Comments />
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
      <Comments />
    );

    wrapper.find('textarea').simulate('change', {
      target: {
        value
      },
    });

    expect(wrapper.find('button.btn-send').filterWhere((item) => {
      return item.prop('disabled') === disabled;
    }).length).toBe(1);
  });

  it('should not contain any comments when render without props', () => {
    const wrapper = shallow(
      <Comments />
    );

    expect(wrapper.find('InputComments').length).toBe(0);
  });

  it('should contain 1 comment when post something', () => {
    const value = 'Hi, guys';
    const wrapper = shallow(
      <Comments />
    );

    wrapper.find('textarea').simulate('change', {
      target: {
        value
      },
    });

    wrapper.find('button.btn-send').simulate('click');

    expect(wrapper.find('InputComments').length).toBe(1);
  });

})