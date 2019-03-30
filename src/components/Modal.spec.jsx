import React from 'react';
import { shallow } from 'enzyme';

import Modal from './Modal';

describe('Modal Component', () => {
  let wrapper;
  const props = {
    isModalOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(
      <Modal {...props}>
        <div>foo</div>
      </Modal>,
    );
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should NOT render if isModalOpen is false', () => {
    wrapper.setProps({ isModalOpen: false });
    expect(wrapper).toMatchSnapshot();
  });
});
