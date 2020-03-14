import React from "react";
import "./MiniPlayer.scss";

export const MiniPlayer = () => {
  return (
    <div className="MiniPlayer">
      <img src="/res/sample-album.png" alt="Thumbnail Image" />
      <div className="info">
        <h1>Siapkah kau tuk jatuh cinta</h1>
        <h2>Hivi!</h2>
      </div>
      <div className="control">
        <div className="buttonPlayContainer">
          <img src="/res/play.svg" className="buttonPlay" alt="Play" />
        </div>
        <img src="/res/next.svg" className="buttonNext" alt="Next" />
      </div>
    </div>
  );
};
