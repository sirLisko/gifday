import React from 'react';
import { shallow } from 'enzyme';

import GifPicker from './GifPicker';

describe('GifPicker Component', () => {
  let wrapper;
  const props = {
    selectedDay: '0-0',
    onGifSelected: jest.fn(),
  };

  beforeEach(() => {
    fetch.resetMocks();
    wrapper = shallow(
      <GifPicker {...props}>
        <div>foo</div>
      </GifPicker>,
    );
  });

  it('should NOT render if no selectedDay', () => {
    wrapper.setProps({ selectedDay: null });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch a new gif if form submitted', done => {
    const fakeEvent = {
      preventDefault: jest.fn(),
      target: {
        elements: {
          what: {
            value: 'foo',
          },
        },
      },
    };
    const fakeResponse = {
      data: { images: { downsized_small: { mp4: 'foobar' } } },
    };
    wrapper = shallow(
      <GifPicker {...props}>
        <div>foo</div>
      </GifPicker>,
    );
    fetch.mockResponseOnce(JSON.stringify(fakeResponse));
    wrapper.find('form').simulate('submit', fakeEvent);
    expect(wrapper.find('video').length).toBe(0);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});
