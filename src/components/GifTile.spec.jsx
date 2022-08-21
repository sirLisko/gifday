import React from "react";
import { shallow } from "enzyme";

import GifTile from "./GifTile";

describe("GifTile Component", () => {
  let wrapper;
  const props = {
    gif: "foo",
  };

  beforeEach(() => {
    wrapper = shallow(<GifTile {...props} />);
  });

  it("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
