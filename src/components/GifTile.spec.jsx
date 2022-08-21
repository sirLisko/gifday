import React from "react";
import { render, screen } from "@testing-library/react";

import GifTile from "./GifTile";

jest.mock("utils/gifAPI", () => ({
  getRandomGif: () => new Promise((resolve) => resolve("foobar")),
}));

describe("GifTile Component", () => {
  it("should render properly", async () => {
    render(
      <GifTile gif="foo">
        <div>foo</div>
      </GifTile>
    );
    expect(screen.getByTestId("video").innerHTML).toEqual(
      '<source src="foo" type="video/mp4">'
    );
  });
});
