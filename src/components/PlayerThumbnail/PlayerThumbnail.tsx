import React from "react";
import "./PlayerThumbnail.scss";

export const PlayerThumbnail = () => {
  var thumbnailImageBackground = {
    backgroundImage: "url(/res/sample-album.png)"
  };

  return (
    <div className="PlayerThumbnail">
      <div className="image" style={thumbnailImageBackground}></div>
    </div>
  );
};
