import React from "react";
import "./PlaylistList.scss";

export const PlaylistList = () => {
  return (
    <div className="PlaylistList">
      <PlaylistListItem />
      <PlaylistListItem />
      <PlaylistListItem />
      <PlaylistListAdd />
    </div>
  );
};

export const PlaylistListItem = () => {
  return (
    <div className="PlaylistListItem">
      <img src="/res/library.svg" alt="Icon" />
      <div className="info">
        <h1>Pop Music</h1>
        <h2>14 songs</h2>
      </div>
    </div>
  );
};

export const PlaylistListAdd = () => {
  return (
    <div className="PlaylistListItem">
      <img src="/res/plus.svg" alt="Icon" />
      <div className="info">
        <h1>New Playlist</h1>
      </div>
    </div>
  );
};
