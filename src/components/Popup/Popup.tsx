import React from "react";
import "./Popup.scss";
import { PlaylistList } from "components/PlaylistList/PlaylistList";
import { PlaylistNaming } from "components/PlaylistNaming/PlaylistNaming";

export const Popup = () => {
  return (
    <div className="Popup">
      <BlackOverlay />
      <div className="container">
        <h1>Add to Playlist</h1>
        <div className="content">
          {/* <PlaylistList /> */}
          <PlaylistNaming />
        </div>
      </div>
    </div>
  );
};

export const BlackOverlay = () => {
  return <div className="BlackOverlay"></div>;
};
