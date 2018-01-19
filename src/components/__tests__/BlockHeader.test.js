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
      .toBe(1);
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

/* it('should be selectable by class "foo"', function() {
    expect(shallow(<Foo />).is('.foo')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<Foo />).find('.foo').length).toBe(1);
  });

  it('should render to static HTML', function() {
    expect(render(<Foo />).text()).toEqual('Bar');
  });*/