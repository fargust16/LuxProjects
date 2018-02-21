import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import BookSwitcher from '../BookSwitcher.jsx';

describe('A BookSwitcher suite', () => {
  it('Render without crash', () => {
    const wrapper = mount(<BookSwitcher />);

    expect(wrapper.find('div.category__results-books').length).toBe(1);
  });

  it('should view home page when props is undefined', () => {
    const wrapper = mount(<BookSwitcher />);

    expect(wrapper.find('div.home-page__books').length).toBe(1);
  });

  it('should not view category page when props is undefined', () => {
    const wrapper = mount(<BookSwitcher />);

    expect(wrapper.find('div.category__books').length).toBe(0);
  });

  it('should view category page when props categoryId contain some value typeoff string', () => {
    const someVal = 'first';
    const wrapper = mount(<BookSwitcher openCategoryId={someVal} />);

    expect(wrapper.find('div.category__books').length).toBe(1);
  });
})