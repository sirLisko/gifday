import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import GifPicker from "./GifPicker";

jest.mock("utils/gifAPI", () => ({
  getRandomGif: () => new Promise((resolve) => resolve("foobar")),
}));

describe("GifPicker Component", () => {
  const props = {
    selectedDay: "0-0",
    onGifSelected: jest.fn(),
  };

  beforeEach(() => {
    render(
      <GifPicker {...props}>
        <div>foo</div>
      </GifPicker>
    );
  });

  it("should fetch a new gif if form submitted", async () => {
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "foobar" },
    });
    act(() => {
      fireEvent.submit(screen.getByRole("button", { name: "yo!" }));
    });
    expect(await screen.findByTestId("video")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "You Got It!" }));
    expect(props.onGifSelected).toHaveBeenCalledWith({
      src: "foobar",
      text: "foobar",
    });
  });
});
