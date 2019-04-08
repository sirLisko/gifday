import { getRandomGif } from 'utils/gifAPI';

it('should fetch a new gif if form submitted', done => {
  const fakeResponse = {
    data: {
      images: {
        '480w_still': { url: 'foo_still' },
        downsized_small: { mp4: 'foobar' },
      },
    },
  };
  fetch.mockResponseOnce(JSON.stringify(fakeResponse));
  getRandomGif('foo').then(gif => {
    expect(gif).toEqual({ gif: 'foobar', still: 'foo_still' });
    done();
  });
});
