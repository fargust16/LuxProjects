import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { CookiesProvider } from 'react-cookie';

import CustomProvider from '../../CustomProvider.jsx';
import ReadBook from '../ReadBook.jsx';

describe('A ReadBook suite', function() {
  it('should render without throwing an error', () => {
    const params = {params: 2};

    const wrapper = mount(
      <CookiesProvider>
        <CustomProvider>
          <ReadBook  match={params} />
        </CustomProvider>
      </CookiesProvider>
    );

    expect(wrapper.find('.read-book').length).toBe(1);
  });
});