import React from 'react';
import { shallow } from 'enzyme';

import GifTile from './GifTile';

describe('GifTile Component', () => {
  let wrapper;
  const props = {
    gifObj: {
      gif: 'foo',
      still: 'bar',
    },
  };

  beforeEach(() => {
    wrapper = shallow(<GifTile {...props} />);
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly - dynamic', () => {
    wrapper.setProps({ dynamic: true });
    expect(wrapper).toMatchSnapshot();
  });
});
