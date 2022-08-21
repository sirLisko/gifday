import React from "react";
import { shallow } from "enzyme";

import GifPicker from "./GifPicker";

jest.mock("utils/gifAPI", () => ({
  getRandomGif: () => new Promise((resolve) => resolve("foobar")),
}));

describe("GifPicker Component", () => {
  let wrapper;
  const props = {
    selectedDay: "0-0",
    onGifSelected: jest.fn(),
  };

  beforeEach(() => {
    fetch.resetMocks();
    wrapper = shallow(
      <GifPicker {...props}>
        <div>foo</div>
      </GifPicker>
    );
  });

  it("should NOT render if no selectedDay", () => {
    wrapper.setProps({ selectedDay: null });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should fetch a new gif if form submitted", async () => {
    const fakeEvent = {
      preventDefault: jest.fn(),
      target: {
        elements: {
          what: {
            value: "foo",
          },
        },
      },
    };
    wrapper = shallow(
      <GifPicker {...props}>
        <div>foo</div>
      </GifPicker>
    );
    await wrapper.find("form").simulate("submit", fakeEvent);
    expect(wrapper.find("video").length).toBe(0);
    expect(wrapper).toMatchSnapshot();
  });
});
