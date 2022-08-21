import { getRandomGif } from "utils/gifAPI";

const unmockedFetch = global.fetch;

const fakeResponse = {
  data: { images: { downsized_small: { mp4: "foobar" } } },
};

describe("getRandomGif", () => {
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(fakeResponse),
      });
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });

  it("should fetch a new gif if form submitted", (done) => {
    getRandomGif("foo").then((gif) => {
      expect(gif).toBe("foobar");
      done();
    });
  });
});
