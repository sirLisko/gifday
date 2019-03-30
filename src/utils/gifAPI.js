const { REACT_APP_GIF_API_GET_RANDOM } = process.env;

export const getRandomGif = text =>
  fetch(`${REACT_APP_GIF_API_GET_RANDOM}${text}`)
    .then(response => response.json())
    .then(
      ({ data }) => !Array.isArray(data) && data.images.downsized_small.mp4,
    );

export default {
  getRandomGif,
};
