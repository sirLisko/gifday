import React from "react";
import { Image } from "types";

interface Props {
  gifObj: Image;
  dynamic?: boolean;
}

const GifTile = ({ gifObj, dynamic }: Props) =>
  gifObj ? (
    <div>
      {dynamic && <img src={gifObj.gif.still} alt={gifObj.text} />}
      <video
        key={gifObj.gif.gif}
        loop
        autoPlay
        muted
        playsInline
        data-testid="video"
      >
        <source src={gifObj.gif.gif} type="video/mp4" />
      </video>
    </div>
  ) : (
    <></>
  );

export default GifTile;
