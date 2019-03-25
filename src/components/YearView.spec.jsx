import React from 'react';
import { shallow } from 'enzyme';
import mockdate from 'mockdate';

import YearView from './YearView';

describe('YearView Component', () => {
  let wrapper;
  const props = {
    dailyGifs: {},
    onSelectedDay: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<YearView {...props} />);
    props.onSelectedDay.mockReset();
  });

  it('should render properly', () => {
    wrapper = shallow(<YearView {...props} />);
    expect(wrapper.find('StyledMonth').length).toBe(12);
    expect(wrapper.find('StyledDay').first()).toMatchSnapshot();
  });

  it('should render the correct number of days if leap year', () => {
    jest.resetModules();
    mockdate.set('1/1/2019');
    let YearView = require('./YearView').default;
    wrapper = shallow(<YearView {...props} />);
    expect(wrapper.find('StyledDay').length).toBe(365);
  });

  it('should render the correct number of days if leap year', () => {
    jest.resetModules();
    mockdate.set('1/1/2000');
    let YearView = require('./YearView').default;
    wrapper = shallow(<YearView {...props} />);
    expect(wrapper.find('StyledDay').length).toBe(366);
  });

  it('should render properly with GIF', () => {
    wrapper.setProps({
      dailyGifs: {
        '0-0': {
          text: 'foo',
          src: 'bar',
        },
      },
    });
    expect(wrapper.find('StyledDay').first()).toMatchSnapshot();
  });

  it('should select the correct day', () => {
    wrapper.setProps({
      dailyGifs: {
        '0-0': {
          text: 'foo',
          src: 'bar',
        },
      },
    });
    wrapper
      .find('StyledDay')
      .first()
      .simulate('click');
    expect(props.onSelectedDay).toHaveBeenCalled();
    expect(props.onSelectedDay).toHaveBeenCalledWith('0-0');
  });
});
