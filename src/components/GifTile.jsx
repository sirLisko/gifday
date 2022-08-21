import React from "react";
import PropTypes from "prop-types";

const GifTile = ({ gif }) => (
  <video key={gif} loop autoPlay muted playsInline>
    <source src={gif} type="video/mp4" />
  </video>
);

GifTile.propTypes = {
  gif: PropTypes.string.isRequired,
};

export default GifTile;
