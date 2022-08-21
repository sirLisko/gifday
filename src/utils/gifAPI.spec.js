import { getRandomGif } from "utils/gifAPI";

it("should fetch a new gif if form submitted", (done) => {
  const fakeResponse = {
    data: { images: { downsized_small: { mp4: "foobar" } } },
  };
  fetch.mockResponseOnce(JSON.stringify(fakeResponse));
  getRandomGif("foo").then((gif) => {
    expect(gif).toBe("foobar");
    done();
  });
});
