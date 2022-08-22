import React from "react";
import { createRoot } from "react-dom/client";
import { render } from "@testing-library/react";

import App from "./App";
import { act } from "react-dom/test-utils";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  act(() => {
    root.render(<App />);
  });
  act(() => {
    root.unmount();
  });
});

describe("App Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = render(<App />);
  });

  it("should render properly", () => {
    expect(wrapper.getByRole("heading").innerHTML).toEqual("Have a gify day!");
  });
});
