import React from 'react';
import PropTypes from 'prop-types';

const GifTile = ({ gifObj, dynamic }) => (
  <div>
    {dynamic && <img src={gifObj.still} alt={gifObj.text} />}
    <video key={gifObj.gif} loop autoPlay muted playsInline>
      <source src={gifObj.gif} type="video/mp4" />
    </video>
  </div>
);

GifTile.propTypes = {
  gifObj: PropTypes.shape({
    gif: PropTypes.string.isRequired,
  }).isRequired,
  dynamic: PropTypes.bool,
};

export default GifTile;
