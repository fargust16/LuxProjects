import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import BlockHeader from '../BlockHeader.jsx';

describe('A suite', function() {
  it('should render without throwing an error', () => {
    let callback = sinon.spy();
    expect(
      shallow(<BlockHeader isShowOption={ true } handleChangeView={ callback } />)
        .is('div.block-header.category__name'))
      .toBe(true);
  });
  it('shows Unnamed block when no option is defined', () => {
    let callback = sinon.spy();
    expect(
      shallow(<BlockHeader isShowOption={ true } handleChangeView={ callback } />)
        .find('.block-header__text').first().text()
    ).toEqual('Unnamed block');
  })

  it('calls callback on click', () => {
    let callback = sinon.spy();
    let wrapper = shallow(<BlockHeader isShowOption={ true } handleChangeView={ callback } />);

    wrapper.find('.block-header').first().simulate('click');
    expect(callback.called).toBe(true);
    expect(callback.calledOnce).toBe(true);
  })
});