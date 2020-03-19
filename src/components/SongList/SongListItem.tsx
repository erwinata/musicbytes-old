import React from "react";
import "./SongListItem.scss";

export const SongListItem = () => {
  return (
    <div className="SongListItem">
      <img src="/res/sample-album.png" alt="Thumbnail Image" />
      <div className="info">
        <h1>Siapkah kau tuk</h1>
        <h2>Hivi!</h2>
      </div>
      <div className="option">
        <img src="/res/like.svg" className="btnLike" alt="Like Song" />
        <img src="/res/option.svg" className="btnOption" alt="Option" />
      </div>
    </div>
  );
};
